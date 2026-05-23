import { useState, useMemo, useEffect } from "react";
import ScheduleInputForm from "./Components/forms/ScheduleInputForm";
import ConflictAlert from "./Components/timetable/ConflictAlert";
import TimetableGrid from "./Components/timetable/TimetableGrid";
import { INITIAL_SCHEDULE } from "./data/mockData";
import { detectConflicts, autoResolveAll, subjectName, subjectCode, facultyName, roomName } from "./utils/conflictDetector";

function StatsBar({ schedule, conflicts }) {
  const pills = [
    { label: "Scheduled", value: schedule.length, color: "#1E293B" },
    { label: "Faculty Clashes", value: conflicts.filter(c=>c.type==="faculty").length, color: "#DC2626" },
    { label: "Room Clashes",    value: conflicts.filter(c=>c.type==="room").length,    color: "#D97706" },
    { label: "Type Mismatches", value: conflicts.filter(c=>c.type==="mismatch").length, color: "#2563EB"},
  ];
  return (
    <div className="no-print" style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
      {pills.map(p => (
        <div key={p.label} style={{ background: "#FFFFFF", border: "1px solid #E2E0DA", borderRadius: "8px", padding: "8px 16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
          <span style={{ fontSize: "22px", fontWeight: "700", color: p.color, fontFamily: "'DM Serif Display', Georgia, serif" }}>{p.value}</span>
          <span style={{ fontSize: "11px", color: "#64748B", fontWeight: "500", lineHeight: 1.3 }}>{p.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem("smart_timetable_data");
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
  });
  
  const [selected, setSelected] = useState(null);
  const conflicts = useMemo(() => detectConflicts(schedule), [schedule]);

  useEffect(() => {
    localStorage.setItem("smart_timetable_data", JSON.stringify(schedule));
  }, [schedule]);

  function handleAdd(newSlot) { setSchedule(prev => [...prev, newSlot]); }
  function handleFix(entry, suggestion) { setSchedule(prev => prev.map(e => e.id === entry.id ? { ...e, day: suggestion.day, slot: suggestion.slot } : e)); }
  function handleReset() { setSchedule(INITIAL_SCHEDULE); setSelected(null); }

  function handleAutoResolve() {
    const optimized = autoResolveAll(schedule);
    setSchedule(optimized);
    setSelected(null);
  }

  function handleExportCSV() {
    const headers = ["ID", "Subject", "Faculty", "Room", "Day", "Time Slot"];
    const rows = schedule.map(slot => [
      slot.id,
      `${subjectCode(slot.subjectId)} - ${subjectName(slot.subjectId)}`,
      facultyName(slot.facultyId),
      roomName(slot.roomId),
      slot.day,
      slot.slot
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "smart_timetable_optimized.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#F0EDE8", minHeight: "100vh", color: "#1E293B", padding: "0" }}>
      
      <style>{`
        /* PDF Print Styles */
        @media print {
          .no-print { display: none !important; }
          .app-body-grid { display: block !important; height: auto !important; }
          .app-body-grid > div:nth-child(1), .app-body-grid > div:nth-child(2) { display: none !important; }
          .app-body-grid > div:nth-child(3) { padding: 0 !important; background: white !important; overflow: visible !important; }
          body { background: white !important; margin: 0; padding: 0; }
          ::-webkit-scrollbar { display: none; }
        }

        /* Mobile/Tablet Responsiveness */
        @media (max-width: 1024px) {
          .app-body-grid {
            display: flex !important;
            flex-direction: column !important;
            height: auto !important;
          }
          .app-body-grid > div {
            border-right: none !important;
            border-bottom: 2px solid #E2E0DA !important;
            min-height: auto !important;
          }
          /* Ensure header layout stacks nicely on very small screens */
          .app-header {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1rem;
          }
          .app-header-actions {
            width: 100%;
            justify-content: flex-start;
            flex-wrap: wrap;
          }
        }
      `}</style>

      {/* Header */}
      <div className="no-print app-header" style={{ background: "#1E293B", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "3px solid #F59E0B" }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "22px", fontWeight: "400", color: "#F8F9FA", margin: 0, letterSpacing: "-0.3px" }}>
            Smart Timetable Conflict Resolver
          </h1>
          <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "2px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
            Milestone 3 · Autonomous Resolution & Export
          </p>
        </div>
        <div className="app-header-actions" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          
          <button onClick={handleExportCSV} style={{ background: "#2563EB", border: "none", color: "#FFF", borderRadius: "6px", padding: "6px 14px", fontSize: "12px", fontWeight: "600", cursor: "pointer", letterSpacing: "0.5px" }}>
            📥 CSV
          </button>
          <button onClick={() => window.print()} style={{ background: "#475569", border: "none", color: "#FFF", borderRadius: "6px", padding: "6px 14px", fontSize: "12px", fontWeight: "600", cursor: "pointer", letterSpacing: "0.5px" }}>
            🖨️ PDF
          </button>
          
          <div style={{ width: "1px", height: "24px", background: "#334155", margin: "0 4px" }}></div>

          {conflicts.length > 0 && (
            <button onClick={handleAutoResolve} style={{ background: "#16A34A", border: "none", color: "#FFF", borderRadius: "6px", padding: "6px 14px", fontSize: "12px", fontWeight: "600", cursor: "pointer", letterSpacing: "0.5px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
              ✨ Auto-Resolve All
            </button>
          )}
          <button onClick={handleReset} style={{ background: "transparent", border: "1px solid #334155", color: "#94A3B8", borderRadius: "6px", padding: "6px 14px", fontSize: "12px", cursor: "pointer" }}>
            ↺ Reset
          </button>
        </div>
      </div>

      {/* Main App Body */}
      <div className="app-body-grid" style={{ display: "grid", gridTemplateColumns: "260px 300px 1fr", gap: "0", height: "calc(100vh - 75px)" }}>
        <div style={{ height: "100%", overflowY: "auto" }}>
          <ScheduleInputForm onAdd={handleAdd} />
        </div>
        
        <div style={{ height: "100%", overflowY: "auto", borderRight: "1px solid #E2E0DA", background: "#FFFFFF" }}>
          <ConflictAlert conflicts={conflicts} schedule={schedule} onFix={handleFix} />
        </div>
        
        <div style={{ overflowX: "auto", overflowY: "auto", padding: "28px 32px", background: "#F0EDE8" }}>
          <StatsBar schedule={schedule} conflicts={conflicts} />
          
          <div style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "15px", color: "#1E293B" }}>Weekly Timetable</span>
          </div>
          
          <TimetableGrid schedule={schedule} conflicts={conflicts} onSelect={setSelected} selected={selected} />
        </div>
      </div>
    </div>
  );
}