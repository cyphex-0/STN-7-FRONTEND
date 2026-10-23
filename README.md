# CourseMaster — Frontend Web Application

A modern, responsive, and feature-rich Single Page Application (SPA) for the CourseMaster Learning Management System (LMS). Built with React 19, Vite, Redux Toolkit, React Router, Tailwind CSS, and DaisyUI, this application delivers a seamless learning and instructional experience for both students and administrators.

---

## Architecture & System Highlights

- **Dual-Theme Support (Light & Dark):** Integrated theme system powered by DaisyUI with a synchronous pre-paint bootstrap script in the document `<head>` that guarantees zero Flash of Unstyled Theme (FOUC).
- **Responsive Layout:** Mobile-first, fully responsive layouts engineered for phones, tablets, and desktop displays, complete with accessible drawer menus and touch targets.
- **Debounced Catalog Search:** 350ms keystroke debounce timers on course search, category, and tag inputs to prevent network request storms and eliminate UI flickering.
- **Interactive Course Player:** Responsive 16:9 aspect-ratio video player with YouTube URL parsing, module/lesson navigation drawer, live class links, interactive assignment submission, and real-time quiz grading.
- **Client-Side Route Protection:** Dedicated authentication and role-based guards (`ProtectedRoute`) protecting student dashboards and administrative management consoles.
- **Network Resilience:** Centralized HTTP client configured with automatic authorization header injection, a 15-second request timeout, and `AbortController` lifecycle cancellation to prevent memory leaks and unmount race conditions.
- **Full Administrative Console:** Complete dashboard providing course curriculum authoring, batch scheduling, assignment review and grading, student enrollment tracking, user suspension management, and Recharts analytics visualizations.

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Core** | React 19, React DOM 19 |
| **Build Tool & Bundler** | Vite 7 |
| **State Management** | Redux Toolkit, React-Redux |
| **Routing** | React Router DOM 7 |
| **Styling & Components** | Tailwind CSS 4, DaisyUI 5 |
| **HTTP Client** | Axios (configured with interceptors, timeouts, and signal cancellation) |
| **Data Visualization** | Recharts |
| **Icons** | Lucide React |

---

## Directory Structure

```
frontend/
├── src/
│   ├── components/         # Reusable presentation and layout components
│   │   ├── CourseCard/     # Course card grid, search bar, and filter components
│   │   └── shared/         # Navbar, Footer, Logo, and ThemeToggle components
│   ├── contexts/           # React context providers (ThemeContext)
│   ├── layouts/            # Layout wrappers (MainLayout)
│   ├── pages/              # Application views and routed screens
│   │   ├── admin/          # Admin portal pages (Overview, Courses, Enrollments, Assignments, Users, Analytics)
│   │   ├── CoursePlayer/   # Interactive lesson player, quiz runner, and assignment submitter
│   │   ├── CousrseDetails/ # Course landing, batch selector, and syllabus preview
│   │   ├── Home/           # Hero showcase and featured catalog
│   │   ├── Courses/        # Comprehensive searchable course catalog
│   │   ├── Login/          # User authentication and demo login portal
│   │   ├── Register/       # Student registration and admin provisioning
│   │   └── student/        # Student dashboard with enrolled courses and progress metrics
│   ├── routes/             # Authentication and role route guards (ProtectedRoute)
│   ├── services/           # Central Axios instance and modular API services (auth, courses, admin, quiz, etc.)
│   ├── store/              # Redux store configuration and domain slices (authSlice, adminSlice, enrollmentSlice)
│   └── utils/              # Client helpers (token management, formatting, YouTube URL parsers)
├── index.html              # HTML shell with synchronous pre-paint theme bootstrap script
├── vite.config.js          # Vite build and plugin configurations
└── package.json            # Manifest and script definitions
```

---

## Installation & Setup

### Prerequisites

Ensure you have the following installed locally:
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- Running **CourseMaster Backend API** service

### 1. Install Dependencies

Navigate to the `frontend` directory and install dependencies:

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `frontend` directory based on `.env.example`:

```env
# Backend API Base URL
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Run Development Server

Launch the Vite local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### 4. Build for Production

Compile and optimize the application for production deployment:

```bash
npm run build
```

The production output bundle will be generated in the `dist/` directory.

### 5. Preview Production Build

Preview the generated production build locally:

```bash
npm run preview
```

---

## Application Features & Workflows

### 1. Public & Student Features

- **Course Catalog Exploration:**
  - Search courses by title or instructor with debounced inputs.
  - Filter by category and tags with dynamic badge pills.
  - Sort courses by price ascending or descending.
  - Server-paginated course grid.
- **Course Details & Batch Selection:**
  - View full course descriptions, instructor profiles, and complete syllabus breakdown.
  - Select active course batches with real-time selection validation.
  - Instant enrollment workflow for logged-in students.
- **Interactive Course Player (`/courses/:id/player`):**
  - Responsive video streaming with support for embedded video URLs.
  - Module and lesson navigation drawer.
  - Live class banner with direct launch links.
  - Complete lesson button with synchronous progress updates.
  - Built-in quiz runner with multi-choice options, instant scoring, and retake support.
  - Assignment submission supporting text explanations or Google Drive links.
- **Student Dashboard (`/student`):**
  - Track learning progress across all enrolled courses with percentage indicators.
  - Expandable course cards displaying completed lessons and upcoming syllabus modules.
  - Quick-action buttons to resume playback directly from where the student left off.

### 2. Administrative Console (`/admin`)

- **Overview Dashboard:** Top-level metrics cards (total revenue, active students, course counts, submission tallies) and Recharts enrollment visualization.
- **Course Management:** Add, edit, or delete courses; manage modules, lessons, video URLs, and batch schedules. Form state cleanup prevents stale creation traps.
- **Enrollment Monitoring:** Filter student enrollments by course and batch, with verified student references.
- **Assignment Review:** Review pending submissions, inspect student code/links, assign grades, and submit feedback notes.
- **User Management:** Manage registered accounts, inspect student records, and toggle account suspension (`isBanned`).
- **Live Class Hub:** Manage and broadcast live class session links across active batches.

---

## State Management Overview

The application utilizes **Redux Toolkit** for predictable and centralized state management:

1. **`authSlice`:**
   - Manages user identity, JWT token storage, loading states, and authentication status.
   - Normalizes `id` and `_id` user attributes uniformly.
   - Synchronizes seamlessly with `localStorage` token storage.
2. **`adminSlice`:**
   - Handles administrative operations including course creation, updates, deletions, enrollment lists, and assignment collections.
   - Provides explicit lifecycle actions (`clearSuccess`, `clearError`) to keep form states clean.
3. **`enrollmentSlice`:**
   - Manages enrolled course lists, lesson completion tracking, and real-time student progress percentages.

---

## UI / UX Design & Accessibility Highlights

- **DaisyUI Semantic Themes:** Utilizes semantic utility tokens (`bg-base-100`, `text-base-content`, `btn-primary`, `alert-error`) ensuring high-contrast readability across light and dark themes.
- **Zero-FOUC Theme Initialization:** Synchronous inline JavaScript in `index.html` inspects `localStorage` or `prefers-color-scheme` before the first frame paints, eliminating sudden white flashes.
- **Consistent Interactive Cursor States:** All interactive buttons, dropdowns, and links enforce `cursor-pointer` across both desktop and mobile viewports.
- **Safe Form Validations:** Interactive submission buttons surface clear validation alerts and loading spinners rather than being silently disabled.
