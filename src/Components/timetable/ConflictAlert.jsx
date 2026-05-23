import { useState, useMemo } from "react";
import { CONFLICT_META, subjectName, subjectCode, facultyName, roomName, suggestSlot } from "../../utils/conflictDetector";

function ConflictCard({ conflict, schedule, onFix }) {
  const meta = CONFLICT_META[conflict.type];
  const entries = conflict.ids.map(id => schedule.find(e => e.id === id)).filter(Boolean);
  const suggestion = entries[0] ? suggestSlot(entries[0], schedule) : null;

  return (
    <div style={{ margin: "8px 12px", borderRadius: "10px", border: `1px solid ${meta.accent}30`, overflow: "hidden", background: "#FFFFFF", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      <div style={{ background: meta.bg, padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px", borderBottom: `1px solid ${meta.accent}20` }}>
        <span style={{ fontSize: "15px" }}>{meta.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: meta.color, letterSpacing: "0.3px" }}>{conflict.label}</div>
          <div style={{ fontSize: "10px", color: meta.color, opacity: 0.75, marginTop: "1px" }}>{conflict.detail}</div>
        </div>
      </div>
      <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: "6px" }}>
        {entries.map((e, i) => (
          <div key={e.id} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 8px", background: "#F8F9FA", borderRadius: "6px", border: "1px solid #E2E0DA" }}>
            <span style={{ width: "18px", height: "18px", background: meta.accent, color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: "700", flexShrink: 0 }}>{i + 1}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "11px", fontWeight: "600", color: "#1E293B" }}>{subjectName(e.subjectId)}</div>
              <div style={{ fontSize: "10px", color: "#64748B", marginTop: "1px" }}>{facultyName(e.facultyId)} · {roomName(e.roomId)}</div>
            </div>
          </div>
        ))}
        {suggestion && (
          <div style={{ marginTop: "4px", padding: "8px 10px", background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
            <div>
              <div style={{ fontSize: "9px", fontWeight: "700", color: "#166534", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "2px" }}>✦ Suggested Slot</div>
              <div style={{ fontSize: "11px", color: "#15803D", fontWeight: "600" }}>{suggestion.day} · {suggestion.slot}</div>
            </div>
            <button onClick={() => onFix(entries[0], suggestion)} style={{ background: "#16A34A", color: "#fff", border: "none", borderRadius: "6px", padding: "5px 12px", fontSize: "11px", fontWeight: "600", cursor: "pointer", flexShrink: 0 }}>Apply Fix</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ConflictAlert({ conflicts, schedule, onFix }) {
  return (
    <div style={{ background: "#FFFFFF", borderRight: "1px solid #E2E0DA", overflowY: "auto", padding: "0" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #E2E0DA", position: "sticky", top: 0, background: "#FFFFFF", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "#64748B", margin: 0 }}>Conflicts</p>
          <span style={{ background: conflicts.length === 0 ? "#DCFCE7" : "#FEE2E2", color: conflicts.length === 0 ? "#166534" : "#991B1B", fontSize: "11px", fontWeight: "700", padding: "2px 8px", borderRadius: "20px" }}>
            {conflicts.length === 0 ? "✓ All Clear" : `${conflicts.length} found`}
          </span>
        </div>
      </div>
      {conflicts.length === 0 && (
        <div style={{ padding: "40px 20px", textAlign: "center" }}>
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>✓</div>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#166534" }}>No conflicts detected</div>
          <div style={{ fontSize: "11px", color: "#94A3B8", marginTop: "4px" }}>All entries are valid</div>
        </div>
      )}
      <div style={{ paddingBottom: "16px" }}>
        {conflicts.map((c, i) => <ConflictCard key={i} conflict={c} schedule={schedule} onFix={onFix} />)}
      </div>
    </div>
  );
}