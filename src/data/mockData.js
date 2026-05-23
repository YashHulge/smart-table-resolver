export const FACULTY = [
  { id: "F001", name: "Dr. Priya Menon",    dept: "CSE"  },
  { id: "F002", name: "Prof. Rahul Sharma", dept: "MATH" },
  { id: "F003", name: "Dr. Anita Desai",    dept: "CSE"  },
  { id: "F004", name: "Prof. Kiran Joshi",  dept: "PHY"  },
];

export const ROOMS = [
  { id: "R101", name: "Room 101", type: "lecture" },
  { id: "R102", name: "Room 102", type: "lecture" },
  { id: "LAB1", name: "CS Lab 1", type: "lab"     },
  { id: "LAB2", name: "CS Lab 2", type: "lab"     },
];

export const SUBJECTS = [
  { id: "S001", name: "Data Structures",   code: "CS201", requiredRoomType: "lecture" },
  { id: "S002", name: "Operating Systems", code: "CS301", requiredRoomType: "lecture" },
  { id: "S003", name: "DBMS Lab",          code: "CS302", requiredRoomType: "lab"     },
  { id: "S004", name: "Linear Algebra",    code: "MA201", requiredRoomType: "lecture" },
];

export const INITIAL_SCHEDULE = [
  { id: "SCH001", subjectId: "S001", facultyId: "F001", roomId: "R101", day: "Monday",    slot: "09:00–10:00" },
  { id: "SCH002", subjectId: "S002", facultyId: "F001", roomId: "R102", day: "Monday",    slot: "09:00–10:00" },
  { id: "SCH003", subjectId: "S003", facultyId: "F003", roomId: "R101", day: "Monday",    slot: "09:00–10:00" },
  { id: "SCH004", subjectId: "S004", facultyId: "F002", roomId: "R102", day: "Tuesday",   slot: "10:00–11:00" },
  { id: "SCH005", subjectId: "S001", facultyId: "F003", roomId: "LAB1", day: "Wednesday", slot: "11:00–12:00" },
  { id: "SCH006", subjectId: "S003", facultyId: "F004", roomId: "LAB1", day: "Wednesday", slot: "11:00–12:00" },
  { id: "SCH007", subjectId: "S002", facultyId: "F004", roomId: "R102", day: "Thursday",  slot: "14:00–15:00" },
  { id: "SCH008", subjectId: "S004", facultyId: "F002", roomId: "LAB2", day: "Friday",    slot: "15:00–16:00" },
];

export const DAYS  = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
export const SLOTS = ["09:00–10:00","10:00–11:00","11:00–12:00","14:00–15:00","15:00–16:00"];
export const ALT_SLOTS = ["09:00–10:00","10:00–11:00","11:00–12:00","14:00–15:00","15:00–16:00"];