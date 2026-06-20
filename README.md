# Destiny Tour & Travels 

> **"Don't Just Visit, Live Himachal."**

Welcome to the **Destiny Tour & Travels** platform! This project is a modern, high-performance travel booking and AI-powered planning application designed to show the world the beauty of Himachal Pradesh.

Built with love, code, and a passion for the mountains.

---

## 🌟 Features

-   **User Authentication & Profiles:** Google Sign-in and Email/Password authentication powered by Firebase Auth. Includes user profile creation, roles management, and a custom user dashboard.
-   **Live Route Cost Calculator:** Dynamic distance and fare estimation using mathematical Haversine formula mapping and winding mountain path adjustments, plotted with a Leaflet route polyline.
-   **Popular Tour Packages:** Curated pre-made Himachal tour packages detailing Day-by-Day itineraries, inclusions, exclusions, and quick booking triggers.
-   **Travel Blog & Journal:** SEO-friendly, styled travel blog with categories, read times, author profiles, and detail page layouts.
-   **Real-time Weather Widget:** Regional simulated/live weather widgets tailored for Himachal towns to provide smart clothing and activity recommendations.
-   **Star Ratings & Reviews:** Real-time feedback submission linked with Firestore database, calculated average scores, and review feeds.
-   **Admin Control Panel:** Secured interface for managing active bookings (Confirm/Complete/Cancel) and dismissing contact inquiries.
-   **AI Trip Planner:** Intelligent itinerary generation using Genkit (Google GenAI & Groq).
-   **Interactive Maps:** Real-time distance and route calculation.
-   **Premium Fleet:** Showcase of available vehicles with booking integration.
-   **Dynamic Pricing:** Automated fare estimation based on distance and vehicle type.
-   **Responsive Design:** A "Visual Overdose" experience on any device, powered by Tailwind and Framer Motion.
-   **Direct Connection:** One-click WhatsApp booking and inquiry system.

### 📸 Screenshots

| Feature | Screenshot | Description |
|---|---|---|
| **Landing Page** | `![Homepage](/public/screenshots/homepage.png)` | Epic landing page with parallax and mountain mesh |
| **Trip Cost Calculator** | `![Cost Estimator](/public/screenshots/calculator.png)` | Route mapping & pricing breakdown |
| **User Dashboard** | `![Dashboard](/public/screenshots/dashboard.png)` | Secure user profile and booking history |
| **Travel Blog** | `![Blog](/public/screenshots/blog.png)` | SEO-friendly articles about Himachal valleys |
| **Tour Packages** | `![Packages](/public/screenshots/packages.png)` | Interactive modal itineraries |
| **Admin Control Center** | `![Admin Panel](/public/screenshots/admin.png)` | Dashboard to review orders and messages |

---

## 🛠️ Tech Stack

### Frontend (The Face)
-   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS, Shadcn UI, CSS Variables
-   **Animations:** Framer Motion, Lucide React
-   **Maps:** React Leaflet, OpenStreetMap
-   **State/Forms:** React Hook Form, Zod

### Backend (The Brain)
-   **Core Logic:** Java Spring Boot
-   **Services:**
    -   `DistanceService`: Calculates routes and distances.
    -   `FareController`: Manages pricing logic.
-   **AI Engine:** Genkit (Node.js/TypeScript)
    -   Providers: Google GenAI (Gemini), Groq

### Infrastructure
-   **Database/Auth:** Firebase
-   **Hosting:** Vercel (Frontend)

---

## 📂 Project Structure

A quick guide to finding your way around:

```
├── src/
│   ├── app/                # Next.js App Router (Pages & Layouts)
│   │   ├── discover-himachal/  # Feature Pages
│   │   ├── services/           # Fleet Showcase
│   │   └── planner/            # AI Trip Planner
│   ├── components/         # Reusable UI Blocks
│   │   ├── ui/             # Shadcn UI (Buttons, Cards, Sheet, Dialog)
│   │   ├── layout/         # Header, Footer
│   │   └── home/           # Hero Section & Landing Components
│   ├── lib/                # Utilities, Config, & Constants
│   └── ai/                 # Genkit AI Flows & Prompts
├── java-backend/           # Spring Boot Application
│   └── src/main/java/.../backend/
│       ├── controller/     # API Endpoints (Distance, Fare)
│       └── service/        # Business Logic
└── public/                 # Static Assets (Images, Icons)
```

---

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18+)
-   Java JDK (17+)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/destiny-tours.git
    cd destiny-tours
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Setup Environment Variables:**
    Create a `.env.local` file in the root:
    ```env
    NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key
    GOOGLE_GENAI_API_KEY=your_key
    ```

### Running the App

1.  **Start Frontend:**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to see the magic.

2.  **Start Backend (Optional for simple UI testing):**
    Navigate to `java-backend` and run the Spring Boot app via your IDE or Maven.

---

## 🎨 Design Philosophy

We believe in **"Visual Overdose"**. The UI is designed to be:
-   **Asymmetric & Bold:** Breaking away from standard grids.
-   **Immersive:** Parallax effects, snow particles, and glassmorphism.
-   **Accessible:** Readable fonts, clear contrast, and screen-reader friendly.

---

## 🤝 Contributing

We welcome contributions! Whether it's fixing a bug or adding a hidden gem destination to our list.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📞 Contact

**Destiny Tour & Travels**
-   📍 Dharamshala, Himachal Pradesh
-   📱 +91 78329 89320 (WhatsApp Available)
-   📧 JitenderKumar16941@gmail.com

---

*"To travel is to discover that everyone is wrong about other countries."*
