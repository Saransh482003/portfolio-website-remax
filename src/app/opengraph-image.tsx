import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Saransh Saini — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#F4F0E6",
          color: "#1B1917",
          fontFamily: "Georgia, serif",
          border: "16px solid #EBE5D7",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#845026",
          }}
        >
          AI Engineering &amp; Applied Research
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 68, fontWeight: 600, lineHeight: 1.1 }}>
            Saransh Saini
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#3F3B36",
              maxWidth: "920px",
              lineHeight: 1.4,
            }}
          >
            Retrieval architectures, knowledge graphs, computer vision pipelines,
            and production MLOps systems.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#6E675F",
            borderTop: "1px solid #DDD5C3",
            paddingTop: "24px",
          }}
        >
          <span>saranshsaini.in</span>
          <span>PyTorch · Qdrant · Neo4j · FastAPI · GKE</span>
        </div>
      </div>
    ),
    size
  );
}
