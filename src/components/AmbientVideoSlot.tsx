"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionMode } from "@/lib/portfolio-data";

interface AmbientVideoSlotProps {
  videoSlug: string;
  motionMode: MotionMode;
  playing?: boolean;
  className?: string;
}

/**
 * Plays `/videos/{videoSlug}.webm` (or `.mp4` fallback) as a silent 3-5s ambient background loop.
 * Gracefully renders a restrained architectural canvas backdrop until the video file is added to `public/videos/`.
 */
export default function AmbientVideoSlot({
  videoSlug,
  motionMode,
  playing = true,
  className = "",
}: AmbientVideoSlotProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    setVideoReady(false);
  }, [videoSlug]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [playing, videoSlug]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || videoReady) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pts = Array.from({ length: 16 }, (_, i) => ({
      x: 0.14 + ((i * 73) % 72) / 100,
      y: 0.16 + ((i * 47) % 66) / 100,
      vx: (i % 2 === 0 ? 1 : -1) * 0.00014,
      vy: (i % 3 === 0 ? 1 : -1) * 0.00011,
    }));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = Math.max(280, Math.floor(rect.width));
      canvas.height = Math.max(160, Math.floor(rect.height));
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let t = 0;
    const draw = () => {
      if (playing) t += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      if (motionMode === "graph" || motionMode === "tree") {
        pts.forEach((p) => {
          if (playing) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0.1 || p.x > 0.9) p.vx *= -1;
            if (p.y < 0.12 || p.y > 0.84) p.vy *= -1;
          }
        });
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = (pts[i].x - pts[j].x) * w;
            const dy = (pts[i].y - pts[j].y) * h;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 120) {
              ctx.strokeStyle = `rgba(221, 213, 195, ${((1 - d / 120) * 0.2).toFixed(3)})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(pts[i].x * w, pts[i].y * h);
              ctx.lineTo(pts[j].x * w, pts[j].y * h);
              ctx.stroke();
            }
          }
        }
        pts.forEach((p) => {
          ctx.fillStyle = "rgba(235, 229, 215, 0.55)";
          ctx.beginPath();
          ctx.arc(p.x * w, p.y * h, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (motionMode === "scan") {
        const scanY = h * (0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.4)));
        ctx.strokeStyle = "rgba(221, 213, 195, 0.28)";
        ctx.lineWidth = 1;
        ctx.strokeRect(w * 0.28, h * 0.22, w * 0.44, h * 0.5);
        ctx.beginPath();
        ctx.moveTo(w * 0.28, scanY);
        ctx.lineTo(w * 0.72, scanY);
        ctx.strokeStyle = "rgba(197, 185, 163, 0.48)";
        ctx.stroke();
      } else {
        for (let k = 0; k < 4; k++) {
          ctx.strokeStyle = "rgba(221, 213, 195, 0.17)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let x = 0; x <= w; x += 20) {
            const y = h * (0.3 + k * 0.11) + Math.sin(x * 0.012 + t * 1.3 + k) * 9;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [motionMode, playing, videoReady]);

  return (
    <div className={`relative video-stage-frame overflow-hidden ${className}`}>
      <video
        key={videoSlug}
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setVideoReady(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          videoReady ? "opacity-85" : "opacity-0 pointer-events-none"
        }`}
      >
        <source src={`/videos/${videoSlug}.webm`} type="video/webm" />
        <source src={`/videos/${videoSlug}.mp4`} type="video/mp4" />
      </video>

      {!videoReady && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      )}
      <div className="absolute inset-0 stage-overlay pointer-events-none" />
    </div>
  );
}
