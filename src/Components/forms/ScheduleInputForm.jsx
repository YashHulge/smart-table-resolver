import { useState } from "react";
import { SUBJECTS, FACULTY, ROOMS, DAYS, SLOTS } from "../../data/mockData";

export default function ScheduleInputForm({ onAdd }) {
  const [formData, setFormData] = useState({
    subjectId: SUBJECTS[0].id, facultyId: FACULTY[0].id, roomId: ROOMS[0].id, day: DAYS[0], slot: SLOTS[0],
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ id: `SCH_NEW_${Date.now()}`, ...formData });
  };

  const formGroup = { marginBottom: "16px", display: "flex", flexDirection: "column", gap: "6px" };
  const formLabel = { fontSize: "11px", fontWeight: "600", color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px" };
  const formSelect = { padding: "8px 10px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "12px", color: "#1E293B", outline: "none", background: "#F8F9FA" };

  return (
    <div style={{ background: "#FAFAF9", borderRight: "1px solid #E2E0DA", overflowY: "auto" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #E2E0DA", position: "sticky", top: 0, background: "#FAFAF9", zIndex: 10 }}>
        <p style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "#64748B", margin: 0 }}>Schedule Class</p>
      </div>
      <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
        <div style={formGroup}>
          <label style={formLabel}>Subject</label>
          <select name="subjectId" style={formSelect} value={formData.subjectId} onChange={handleChange}>
            {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.name} ({s.code})</option>)}
          </select>
        </div>
        <div style={formGroup}>
          <label style={formLabel}>Faculty</label>
          <select name="facultyId" style={formSelect} value={formData.facultyId} onChange={handleChange}>
            {FACULTY.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        </div>
        <div style={formGroup}>
          <label style={formLabel}>Room</label>
          <select name="roomId" style={formSelect} value={formData.roomId} onChange={handleChange}>
            {ROOMS.map(r => <option key={r.id} value={r.id}>{r.name} ({r.type})</option>)}
          </select>
        </div>
        <div style={formGroup}>
          <label style={formLabel}>Day</label>
          <select name="day" style={formSelect} value={formData.day} onChange={handleChange}>
            {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div style={formGroup}>
          <label style={formLabel}>Time Slot</label>
          <select name="slot" style={formSelect} value={formData.slot} onChange={handleChange}>
            {SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", background: "#1E293B", color: "#FFF", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer", marginTop: "8px" }}>
          + Add to Schedule
        </button>
      </form>
    </div>
  );
}