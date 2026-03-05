import React from "react";

export default function OrnateCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={wrapStyle}>
      <div style={frameStyle} />
      <div style={innerStyle}>{children}</div>
    </div>
  );
}

const wrapStyle: React.CSSProperties = {
  position: "relative",
  borderRadius: 28,
  padding: 22,
  background: "rgba(255,255,255,0.35)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 30px 90px rgba(70, 30, 50, 0.14)",
  overflow: "hidden",
};

const frameStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: 28,
  border: "1px solid rgba(185, 135, 155, 0.30)",
  boxShadow: "inset 0 0 0 10px rgba(255,255,255,0.18)",
  pointerEvents: "none",

  /* “ornate-ish” corners via gradients (placeholder until you add real frame art) */
  background:
    "radial-gradient(120px 120px at 0% 0%, rgba(255,255,255,0.20), rgba(255,255,255,0) 70%)," +
    "radial-gradient(120px 120px at 100% 0%, rgba(255,255,255,0.20), rgba(255,255,255,0) 70%)," +
    "radial-gradient(120px 120px at 0% 100%, rgba(255,255,255,0.18), rgba(255,255,255,0) 70%)," +
    "radial-gradient(120px 120px at 100% 100%, rgba(255,255,255,0.18), rgba(255,255,255,0) 70%)",
};

const innerStyle: React.CSSProperties = {
  position: "relative",
  borderRadius: 22,
  padding: 30,
  background:
    "linear-gradient(180deg, rgba(255, 251, 253, 0.60), rgba(255, 240, 248, 0.35))",
  boxShadow: "inset 0 0 0 1px rgba(200, 150, 170, 0.16)",
};
