# Himachal Pradesh AI Travel Planner - Project Documentation

## 1. Project Overview
This project is a **Next.js-based Travel Planner Web Application** dedicated to Himachal Pradesh tourism. The core feature is an **AI-powered itinerary generator** that creates personalized travel plans based on user preferences (budget, duration, interests). It also features a curated list of destinations, detailed service information, and an interactive contact interface.

### Key Features
- **AI Itinerary Planner**: Generates day-by-day travel plans using Google Gemini (via Genkit).
- **Interactive Maps**: Visualizes destinations and routes using Leaflet/Google Maps.
- **Modern UI/UX**: Features smooth animations, dark mode, parallax effects, and a responsive design.
- **Authentication**: Secure user login and signup using Firebase Auth.
- **Real-time Data**: Dynamic content rendering for destinations and services.

---

## 2. Technology Stack used (Frontend & Backend)

### Frontend Core
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router Architecture).
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI) for accessible, reusable components.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) and `tailwindcss-animate`.

### Backend & Services
- **Authentication**: [Firebase Authentication](https://firebase.google.com/) (Google Sign-in, Email/Password).
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) for storing user data and itineraries.
- **AI Engine**: [Google Genkit](https://firebase.google.com/docs/genkit) utilizing the **Gemini 1.5 Flash** model.
- **Maps**: `@react-google-maps/api` and `react-leaflet`.

---

## 3. Frontend Architecture & Code Flow

### 3.1 Next.js App Router Structure
The project uses the modern **App Router** (`src/app` directory), where the file system defines the routes.

- `src/app/layout.tsx`: The **Root Layout**. It wraps the entire application. It includes:
    - **Global Providers**: Theme provider (Dark/Light mode), Firebase provider, Toast notifications.
    - **Header & Footer**: Components that appear on every page.
    - **Fonts**: Loads Google Fonts (PT Sans, Playfair Display) optimally.

- `src/app/page.tsx`: The **Home Page**. It is composed of smaller components:
    - `HeroSection`: The top banner with the main image and call-to-action.
    - `FeaturedDestinations`: A carousel showing popular spots using static data (`src/lib/placeholder-images.ts`).
    - `AnimatedSection`: A wrapper component I created to handle scroll animations easily.

### 3.2 Server vs. Client Components
Next.js allows us to render components on the server (for speed/SEO) or the client (for interactivity).

- **Server Components (Default)**: Used for static content, fetching data, and layout. They don't have interactivity like `onClick` or `useState`.
- **Client Components (`'use client'`)**: Used whenever we need user interaction (buttons, forms, animations).
    - *Example*: The Login form (`src/app/login/page.tsx`) needs to handle user input, so it's a Client Component.

### 3.3 How the AI Planner Works (Code Flow)
1.  **User Input**: The user goes to `/planner` and fills out a form (Duration, Budget, Interests).
2.  **API Request**: When they hit "Generate Plan", the frontend sends this data to a Server Action or API Route.
3.  **AI Processing (`src/ai`)**:
    - The code in `src/ai/genkit.ts` initializes the Google Gemini model.
    - A specific **Prompt** is constructed: *"Create a [duration] day trip to Himachal for [budget] budget..."*.
    - The AI generates a structured JSON response containing the itinerary.
4.  **Display**: The frontend receives this JSON and renders it into a card view (`ItineraryDisplay.tsx`), showing Day 1, Day 2, etc.

---

## 4. Folder Structure Explained

```
/src
  /ai           -> AI configuration (Genkit, Gemini) and prompt flows.
  /app          -> Main Pages and Routes (Home, Login, Planner, etc.).
  /components   -> Reusable UI parts.
     /ui        -> Basic blocks like Buttons, Cards, Inputs (Shadcn based).
     /layout    -> Header, Footer.
  /firebase     -> Firebase configuration and client-side setup.
  /lib          -> Utility functions, static data (destination lists), helpers.
  /hooks        -> Custom React Hooks (e.g., use-toast.ts).
```

---

## 5. Viva Questions & Answers (For Final Project)

**Q1: Why did you choose Next.js over simple React?**
**Ans:** Next.js provides **Server-Side Rendering (SSR)** and **Static Site Generation (SSG)** out of the box, which makes the website faster and better for SEO (Search Engine Optimization) compared to a standard React Single Page Application (SPA). It also offers simplified routing via the App Router.

**Q2: What is the purpose of TypeScript in this project?**
**Ans:** TypeScript adds **static typing** to JavaScript. It helps catch errors during development (like passing a string where a number is expected) rather than at runtime. This makes the code more robust and easier to maintain, especially in a large project.

**Q3: How does the AI Trip Planner integration work?**
**Ans:** We use the **Genkit SDK** to connect with Google's **Gemini 1.5 Flash** model. When a user submits their preferences, we send a prompt to the AI model asking for a structured JSON itinerary. The AI returns the plan, which we then parse and display on the UI.

**Q4: How do you handle User Authentication?**
**Ans:** We utilize **Firebase Authentication**. It handles the complex security logic for logging in users via Email/Password or Google Sign-In. It manages sessions securely and provides us with a user ID to link data to specific users.

**Q5: What is Tailwind CSS and why use it?**
**Ans:** Tailwind is a **utility-first CSS framework**. Instead of writing separate CSS files with custom classes, we apply pre-defined utility classes (like `flex`, `p-4`, `text-center`) directly in the HTML/JSX. This speeds up development and ensures design consistency.

**Q6: Explain the difference between `layout.tsx` and `page.tsx`.**
**Ans:** `layout.tsx` defines UI that is **shared** across multiple routes (like a Navbar or Sidebar) and preserves state on navigation. `page.tsx` represents the unique UI for a specific route (URL).

**Q7: How is the data for destinations managed?**
**Ans:** Currently, static destination data is stored in `src/lib/placeholder-images.ts` or similar constant files for fast loading. For dynamic user data (like saved trips), we use **Firestore** (a NoSQL database).

**Q8: What is "Hydration" in Next.js?**
**Ans:** Hydration is the process where a static HTML page (rendered by the server) becomes interactive in the browser. The JavaScript attaches event listeners to the HTML elements so that buttons and forms start working.

**Q9: How do you optimize the images on the website?**
**Ans:** We use the Next.js `<Image />` component. It automatically resizes images, converts them to modern formats like WebP, and lazy-loads them (only loads when they scroll into view) to improve performance.

**Q10: What challenges did you face while building this?**
**Ans:** (Personalize this, but a common answer is):
"Integrating the AI response was challenging because LLMs sometimes return unstructured text. We had to carefully prompt engineering the model to return strict **JSON format** so our frontend could render it as a structured itinerary list."
