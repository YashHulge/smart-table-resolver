Here is the fully updated `README.md` with the new, dedicated **Live Demo** section placed right at the bottom, just below the Future Roadmap.

Copy and paste this to update your repository:

---

```markdown
# Smart Timetable Conflict Resolver 📅

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Project-2563EB?style=for-the-badge&logo=vercel)](https://smart-table-resolver.vercel.app/)

An autonomous, interactive dashboard designed to instantly detect scheduling conflicts and algorithmically generate optimal, conflict-free timetables. 

Built as a high-performance MVP, this application strips away heavy backend dependencies to deliver real-time validation and autonomous conflict resolution entirely within the browser.

## 🚀 Key Features

* **Autonomous Resolution Algorithm:** Features a greedy "Auto-Resolve" engine that parses the entire schedule matrix, calculates alternative slots, and instantly resolves all active conflicts with a single click.
* **Real-Time Conflict Detection:** Automatically flags overlaps and highlights the exact point of failure, including:
    * 👤 **Faculty Clashes:** Double-booked professors.
    * 🚪 **Room Clashes:** Double-booked physical spaces.
    * ⚠️ **Type Mismatches:** E.g., Scheduling a Lab session in a Lecture hall.
* **Interactive Visual Dashboard:** A clean, 3-column enterprise-grade UI featuring intuitive color-coded state management and real-time statistics.
* **Frictionless Export:** Generates instant `.csv` spreadsheet downloads and features custom CSS injection for flawless, formatted PDF printing.
* **Zero-Dependency Persistence:** Utilizes browser `localStorage` to ensure schedule data survives accidental page refreshes without needing a database.

## 🛠️ Tech Stack

This project was intentionally engineered to be lean and fast, strictly utilizing foundational frontend technologies without relying on heavy external UI libraries or backend frameworks.

* **Core:** React.js (via Vite)
* **Logic:** Pure JavaScript (ES6+) Algorithms
* **Styling:** Vanilla CSS (Flexbox/Grid architecture)
* **Deployment:** Vercel

## 📂 Project Architecture

The codebase is modularized for strict separation of concerns, keeping UI rendering distinct from algorithmic calculations.

```text
src/
├── Components/          
│   ├── forms/           # Data entry and schedule creation UI
│   └── timetable/       # Core visualization, grid rendering, and conflict cards
├── data/                
│   └── mockData.js      # Structured JSON serving as the mock database
├── utils/               
│   └── conflictDetector.js # Pure JS math/logic for overlap detection and resolution
└── App.jsx              # Main state container and layout orchestration

```

## 💻 Getting Started

To run this project locally on your machine:

**1. Clone the repository**

```bash
git clone [https://github.com/YashHulge/smart-table-resolver.git](https://github.com/YashHulge/smart-table-resolver.git)
cd smart-table-resolver

```

**2. Install dependencies**

```bash
npm install

```

**3. Start the development server**

```bash
npm run dev

```

Open the `localhost` link provided in your terminal to view the application.

## 🔮 Future Roadmap (Post-MVP)

While the current iteration fulfills the core algorithmic and visualization requirements, future scaling could include:

* Integration of a Node/Express backend for multi-user, cross-department collaborative scheduling.
* Implementation of secure JWT-based faculty authentication.
* Drag-and-drop capabilities directly within the Timetable Grid.

## 🌐 Live Project Showcase

Experience the autonomous conflict resolver in action. The MVP is fully deployed and accessible online:

👉 **[Launch Smart Timetable Resolver](https://smart-table-resolver.vercel.app/)**

```

```
