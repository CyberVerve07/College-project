# 🚀 Backend Architecture & Working of the Project

Hi! Here is the detailed breakdown of the backend architecture of your project. This document explains **which frameworks are used, why they are used, and how the entire backend functions from end to end.**

---

## 🏗️ 1. Main Backend Framework: Next.js (App Router) & Server Actions

**kyu use kiya gaya (Why)?**
- **Next.js** is a full-stack framework. We don't need a separate Express.js server because Next.js provides built-in API Routes and **Server Actions**.
- **Server Actions** allow the frontend to securely trigger asynchronous operations (like saving to the database or calling an AI model) without exposing sensitive API keys to the browser.
- **Vercel/Firebase App Hosting** deployment makes it extremely fast and serverless.

**Kya kaam karta hai (What it does)?**
- **Routing & API:** Whenever a user submits the "Create Itinerary" form, the frontend calls a Server Action (e.g., `createItinerary` in `src/ai/flows/create-itinerary-flow.ts`). This runs purely on the server.
- **Security:** Hides sensitive environment variables (like API keys for Gemini, Groq, and Firebase).

---

## 🧠 2. AI Orchestration Framework: Google Genkit (v1.20)

**kyu use kiya gaya (Why)?**
- AI outputs are unpredictable. Simple API calls often return broken text or bad formatting.
- **Genkit** provides structure. It enforces LLMs to return strict JSON data using Zod Schemas.
- It makes it easy to switch models (e.g., you can switch from Groq to Google Gemini very easily without changing the core application logic).

**Kya kaam karta hai (What it does)?**
- Located in `src/ai/genkit.ts` and `src/ai/flows`.
- When the user asks for a trip, **Genkit** takes the prompt along with `HIMACHAL_KNOWLEDGE` (the system's knowledge base of places, cafes, and budgets).
- It calls either **Google Gemini 1.5 Flash** or **Groq Llama 3 70B**.
- It forces the AI to reply in a strict JSON format (e.g., arrays for `bestDestinations`, `itinerary` per day, `budgetBreakdown`). If the AI fails, a fallback logic is triggered so the user never sees a broken page.

---

## 🔥 3. Database & Cloud Services: Firebase (Firestore & App Hosting)

**kyu use kiya gaya (Why)?**
- **Firestore** is a NoSQL, highly scalable cloud database. It is perfect for storing JSON objects, which perfectly aligns with our Genkit AI output structure.
- **App Hosting:** Your project contains `apphosting.yaml`, which indicates Next.js is seamlessly deployed/configured with Firebase.

**Kya kaam karta hai (What it does)?**
- Whenever an itinerary is created, it is cached or stored in Firestore.
- Controls security rules (`firestore.rules` is present), ensuring only authenticated or valid users can read/write data.

---

## ☕ 4. Microservice Backend: Spring Boot (Java 17) PDF Service

**kyu use kiya gaya (Why)?**
- While Next.js is great for web requests, generating complex PDFs with styling, fonts, and maps is notoriously difficult and heavy in Node.js.
- **Java Spring Boot** combined with **OpenPDF** (`librepdf`) is enterprise-grade, highly reliable, and very fast at assembling documents.
- It separates the heavy lifting (PDF generation) away from the main web server, speeding up the site.

**Kya kaam karta hai (What it does)?**
- Located inside the `java-backend/` folder (`pdf-service`).
- Exposes a REST API endpoint that Next.js calls when a user clicks "Download PDF".
- It uses `google-maps-services` to fetch real map snapshots or coordinates.
- It compiles the generated itinerary data into a beautifully formatted, structured PDF document that the user can download or print.

---

## 🔄 End-to-End Flow Summary (Poora Process Kaise Kaam Karta Hai)

1. **User Request:** User enters trip details (Origin, Budget, Days) on the Frontend (`Next.js UI`).
2. **Server Action Trigger:** Frontend calls a `createItinerary` function on the server.
3. **AI Generation (Genkit):** The next.js server uses Genkit to send the data to Google Gemini/Groq. Genkit processes the knowledge base and safely returns a perfectly structured JSON itinerary.
4. **Database (Firebase):** The Next.js server saves this structured AI response to Firestore for history or instant loading later.
5. **Frontend Display:** Next.js sends the JSON back to the browser to render beautiful UI components (like daily schedules, budgets).
6. **PDF Download (Java Backend):** If the user clicks "Download PDF", the Next.js frontend sends a request to your Java Spring Boot microservice. The Java backend creates a polished PDF with the data and sends the file back to the browser.

---
*This architecture is highly modern, robust, and scalable. You have split the computational load perfectly between Serverless Node.js (Next.js) and a Dedicated Microservice (Java Spring Boot) while using Firebase as the data glue!*
