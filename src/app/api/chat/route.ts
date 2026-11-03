import { NextRequest } from "next/server";
import { buildPortfolioSystemPrompt } from "@/lib/assistant-prompt";
import { SITE_CONFIG } from "@/lib/site-config";

export const runtime = "edge";

interface IncomingMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          "Missing OPENROUTER_API_KEY in server environment (.env.local).",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { messages?: IncomingMessage[]; currentPath?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON payload." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const rawMessages = Array.isArray(body.messages) ? body.messages : [];
  const sanitized = rawMessages
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-10)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, 2000),
    }));

  if (sanitized.length === 0) {
    return new Response(JSON.stringify({ error: "No user message provided." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const model = process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash";
  const currentPath =
    typeof body.currentPath === "string" ? body.currentPath.slice(0, 80) : "/";

  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": SITE_CONFIG.url,
      "X-Title": "Saransh Saini Portfolio",
    },
    body: JSON.stringify({
      model,
      stream: true,
      temperature: 0.35,
      max_tokens: 700,
      messages: [
        { role: "system", content: buildPortfolioSystemPrompt(currentPath) },
        ...sanitized,
      ],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => "Upstream error");
    return new Response(
      JSON.stringify({
        error: `OpenRouter returned ${upstream.status}: ${errText.slice(0, 200)}`,
      }),
      { status: upstream.status || 502, headers: { "Content-Type": "application/json" } }
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (payload === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const parsed = JSON.parse(payload);
              const delta = parsed?.choices?.[0]?.delta?.content;
              if (typeof delta === "string" && delta.length > 0) {
                controller.enqueue(encoder.encode(delta));
              }
            } catch {
              // Ignore keep-alive comments or partial JSON lines
            }
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
