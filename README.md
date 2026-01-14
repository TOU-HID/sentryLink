# SentryLink

## 1. Setup Instructions

Follow these steps to set up and run the project locally.

### 1.1 Prerequisites

- Node.js (>= 20.x) [[Setup Guide]](https://nodejs.org/en/download)
- npm (Usually comes with node.js)

### 1.2 Getting Started

- **Clone the repository:**

  ```bash
  git clone https://github.com/TOU-HID/sentryLink
  ```

- Navigate to the frontend directory:

  ```bash
  cd sentryLink
  ```

- Install dependencies:

  ```bash
  npm install
  ```

- Start the dev server:

  ```bash
  npm run dev
  ```

---

## Design Decisions

- **Framework & Tooling**: Built with **React** + **TypeScript**, using **Vite** for fast development and modern builds.
- **Styling**: **Tailwind CSS** .
- **State Management**: Simple local state with `useState` and prop drilling for selected document and screen navigation — keeps the app straightforward for this scope.
- **Data & Types**: Mocked data lives in `mockData/` and shared types are in `src/types` to maintain clear contracts and make future API integration easier.
- **Components**: Small, focused components (e.g., `Modal`, `StatusChip`, `Table`) to improve reusability and testability.
- **Accessibility & UX**: Use semantic markup, visible focus states, and avoid relying on color alone to convey status.
- **Build & CI**: `npm run build` runs `tsc -b` before `vite build` to ensure type checking is part of the CI flow.
