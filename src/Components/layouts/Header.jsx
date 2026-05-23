export default function Header({ onReset }) {
  return (
    <div style={{
      background: "#1E293B", padding: "20px 32px", display: "flex", 
      alignItems: "center", justifyContent: "space-between", borderBottom: "3px solid #F59E0B"
    }}>
      <div>
        <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "22px", fontWeight: "400", color: "#F8F9FA", margin: 0, letterSpacing: "-0.3px" }}>
          Smart Timetable Conflict Resolver
        </h1>
        <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "2px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
          Milestone 1 · Validation & Visualization
        </p>
      </div>
      <button onClick={onReset} style={{ background: "transparent", border: "1px solid #334155", color: "#94A3B8", borderRadius: "6px", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}>
        ↺ Reset Data
      </button>
    </div>
  );
}