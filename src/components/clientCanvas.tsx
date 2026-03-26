"use client";

import dynamic from "next/dynamic";

const CanvasBackground = dynamic(
  () => import("@/components/canvasBackground"),
  { ssr: false }
);

export function ClientCanvas() {
  return <CanvasBackground />;
}
