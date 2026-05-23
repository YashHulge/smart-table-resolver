import { FACULTY, ROOMS, SUBJECTS, DAYS, ALT_SLOTS } from '../data/mockData';

export const CONFLICT_META = {
  faculty:  { color: "#991B1B", bg: "#FEE2E2", accent: "#DC2626", icon: "👤", label: "Faculty Clash"    },
  room:     { color: "#92400E", bg: "#FEF3C7", accent: "#D97706", icon: "🚪", label: "Room Clash"       },
  mismatch: { color: "#1E3A5F", bg: "#DBEAFE", accent: "#2563EB", icon: "⚠️", label: "Type Mismatch"   },
};

export const subjectName  = id => SUBJECTS.find(s=>s.id===id)?.name  ?? id;
export const subjectCode  = id => SUBJECTS.find(s=>s.id===id)?.code  ?? "";
export const facultyName  = id => FACULTY.find(f=>f.id===id)?.name   ?? id;
export const roomName     = id => ROOMS.find(r=>r.id===id)?.name     ?? id;

export function detectConflicts(schedule) {
  const conflicts = [];
  for (let i = 0; i < schedule.length; i++) {
    for (let j = i + 1; j < schedule.length; j++) {
      const a = schedule[i], b = schedule[j];
      if (a.day !== b.day || a.slot !== b.slot) continue;
      if (a.facultyId === b.facultyId) {
        conflicts.push({ type: "faculty", ids: [a.id, b.id],
          label: `${FACULTY.find(f=>f.id===a.facultyId)?.name} double-booked`,
          detail: `${a.slot} · ${a.day}` });
      }
      if (a.roomId === b.roomId) {
        conflicts.push({ type: "room", ids: [a.id, b.id],
          label: `${ROOMS.find(r=>r.id===a.roomId)?.name} double-booked`,
          detail: `${a.slot} · ${a.day}` });
      }
    }
    const entry = schedule[i];
    const subj = SUBJECTS.find(s=>s.id===entry.subjectId);
    const room = ROOMS.find(r=>r.id===entry.roomId);
    if (subj && room && subj.requiredRoomType !== room.type) {
      conflicts.push({ type: "mismatch", ids: [entry.id],
        label: `Room type mismatch for ${subj.code}`,
        detail: `Needs ${subj.requiredRoomType}, has ${room.type}` });
    }
  }
  return conflicts;
}

export function suggestSlot(entry, schedule) {
  const usedFacultySlots = new Set(schedule.filter(e=>e.id!==entry.id && e.facultyId===entry.facultyId).map(e=>`${e.day}|${e.slot}`));
  const usedRoomSlots = new Set(schedule.filter(e=>e.id!==entry.id && e.roomId===entry.roomId).map(e=>`${e.day}|${e.slot}`));
  for (const day of DAYS) {
    for (const slot of ALT_SLOTS) {
      const key = `${day}|${slot}`;
      if (!usedFacultySlots.has(key) && !usedRoomSlots.has(key)) return { day, slot };
    }
  }
  return null;
}

// ✨ NEW: The greedy algorithm to resolve all conflicts autonomously
export function autoResolveAll(currentSchedule) {
  let optimizedSchedule = [...currentSchedule];
  let activeConflicts = detectConflicts(optimizedSchedule);
  let safetyCounter = 0; 

  while (activeConflicts.length > 0 && safetyCounter < 50) {
    const conflict = activeConflicts[0];
    const entryToFix = optimizedSchedule.find(e => conflict.ids.includes(e.id));
    
    if (entryToFix) {
      const suggestion = suggestSlot(entryToFix, optimizedSchedule);
      if (suggestion) {
        optimizedSchedule = optimizedSchedule.map(e => 
          e.id === entryToFix.id 
            ? { ...e, day: suggestion.day, slot: suggestion.slot } 
            : e
        );
      } else {
        break;
      }
    }
    
    activeConflicts = detectConflicts(optimizedSchedule);
    safetyCounter++;
  }

  return optimizedSchedule;
}