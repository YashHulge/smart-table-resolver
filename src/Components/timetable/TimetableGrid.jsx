import { useMemo } from "react";
import { DAYS, SLOTS } from "../../data/mockData";
import { CONFLICT_META, subjectCode, facultyName, roomName } from "../../utils/conflictDetector";

function ConflictBadge({ type }) {
  const m = CONFLICT_META[type];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", background: m.bg, color: m.color, fontSize: "9px", fontWeight: "700", letterSpacing: "0.6px", textTransform: "uppercase", padding: "2px 6px", borderRadius: "4px", border: `1px solid ${m.accent}30` }}>
      {type === "faculty" ? "FACULTY" : type === "room" ? "ROOM" : "TYPE"}
    </span>
  );
}

function TimetableCell({ entries, conflicts, onSelect, selected }) {
  const tdBase = { borderBottom: "1px solid #E2E0DA", borderRight: "1px solid #E2E0DA", padding: "8px", verticalAlign: "top", minWidth: "120px", width: "18%" };
  if (!entries.length) return <td style={{ ...tdBase, background: "#FAFAF9" }}><div style={{ height: "64px" }} /></td>;

  return (
    <td style={{ ...tdBase, padding: "6px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {entries.map(entry => {
          const entryConflicts = conflicts.filter(c => c.ids.includes(entry.id));
          const hasConflict = entryConflicts.length > 0;
          const isSelected = selected === entry.id;
          const meta = hasConflict ? CONFLICT_META[entryConflicts[0].type] : null;

          return (
            <div key={entry.id} onClick={() => onSelect(isSelected ? null : entry.id)} style={{ background: hasConflict ? meta.bg : "#F0FDF4", border: `1.5px solid ${hasConflict ? meta.accent : "#22C55E"}`, borderLeft: `4px solid ${hasConflict ? meta.accent : "#16A34A"}`, borderRadius: "6px", padding: "6px 8px", cursor: "pointer", transition: "all 0.15s", outline: isSelected ? `2px solid ${hasConflict ? meta.accent : "#16A34A"}` : "none" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: hasConflict ? meta.color : "#166534", fontFamily: "'DM Serif Display', Georgia, serif", marginBottom: "1px", lineHeight: 1.2 }}>{subjectCode(entry.subjectId)}</div>
              <div style={{ fontSize: "10px", color: "#475569", lineHeight: 1.3, marginBottom: "3px" }}>{facultyName(entry.facultyId).split(" ").slice(-1)[0]} <span style={{ color: "#94A3B8", marginLeft: "4px" }}>{roomName(entry.roomId)}</span></div>
              {hasConflict && <ConflictBadge type={entryConflicts[0].type} />}
            </div>
          );
        })}
      </div>
    </td>
  );
}

export default function TimetableGrid({ schedule, conflicts, onSelect, selected }) {
  const matrix = useMemo(() => {
    const m = {};
    for (const day of DAYS) { m[day] = {}; for (const slot of SLOTS) m[day][slot] = []; }
    for (const e of schedule) { if (m[e.day] && m[e.day][e.slot]) m[e.day][e.slot].push(e); }
    return m;
  }, [schedule]);

  const thDay = { background: "#1E293B", color: "#F8F9FA", fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "13px", fontWeight: "400", padding: "14px 12px", textAlign: "center", letterSpacing: "0.3px", borderRight: "1px solid #2D3D52" };
  const thSlot = { background: "#F8F7F5", color: "#64748B", fontSize: "11px", fontWeight: "600", letterSpacing: "0.5px", padding: "12px 10px", textAlign: "right", borderBottom: "1px solid #E2E0DA", borderRight: "1px solid #E2E0DA", whiteSpace: "nowrap", minWidth: "96px" };

  return (
    <div style={{ background: "#FFFFFF", borderRadius: "12px", border: "1px solid #E2E0DA", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", minWidth: "680px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...thDay, background: "#111827", fontSize: "10px", letterSpacing: "1px", color: "#6B7280" }}>TIME</th>
            {DAYS.map(d => <th key={d} style={thDay}>{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {SLOTS.map((slot, si) => (
            <tr key={slot} style={{ background: si % 2 === 0 ? "#FFFFFF" : "#FAFAF9" }}>
              <td style={thSlot}>{slot}</td>
              {DAYS.map(day => <TimetableCell key={day} entries={matrix[day][slot]} conflicts={conflicts} onSelect={onSelect} selected={selected} />)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}