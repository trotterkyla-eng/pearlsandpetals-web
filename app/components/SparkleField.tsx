export default function SparkleField() {
  // lightweight sparkles using CSS gradients (no canvas)
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        background:
          "radial-gradient(2px 2px at 15% 22%, rgba(255,255,255,0.75), rgba(255,255,255,0) 60%)," +
          "radial-gradient(2px 2px at 78% 30%, rgba(255,255,255,0.70), rgba(255,255,255,0) 60%)," +
          "radial-gradient(1.5px 1.5px at 62% 68%, rgba(255,255,255,0.60), rgba(255,255,255,0) 60%)," +
          "radial-gradient(2px 2px at 30% 75%, rgba(255,255,255,0.65), rgba(255,255,255,0) 60%)," +
          "radial-gradient(1.5px 1.5px at 88% 82%, rgba(255,255,255,0.55), rgba(255,255,255,0) 60%)",
        animation: "sparkleDrift 8s ease-in-out infinite",
      }}
    />
  );
}
