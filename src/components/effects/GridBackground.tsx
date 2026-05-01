export default function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,15,0.8) 100%)",
        }}
      />
    </div>
  );
}
