# Project Structure & Implementation Guide

Welcome to the **Travel Planner** project. This document serves as a guide for examiners and teachers to understand the organized structure of the codebase.

## 🏗️ High-Level Architecture

The project is divided into three main layers:
1.  **Frontend (Next.js)**: Located in the `src/` directory.
2.  **Backend (Firebase)**: Integrated within the frontend using Firebase SDK and Next.js Server Actions.
3.  **Java Utility (PDF Generation)**: Located in `java-backend/`, handles complex document generation.

---

## 📂 Package Overview

### 1. Frontend & UI (`src/components/`)
Contains all the visual building blocks of the application.
-   `ui/`: Base components (buttons, cards, inputs) based on Radix UI.
-   `animations/`: **[NEW PACKAGE]** Dedicated home for high-end animations (snow particles, counters, motion sections).
-   `home/`: Large sections specific to the landing page.
-   `maps/`: Integration with OpenStreetMap for destination visualization.

### 2. AI Package (`src/ai/`)
Encapsulates all Artificial Intelligence logic.
-   Uses **Google GenKit** for flow-based AI logic.
-   Contains schemas and TypeScript definitions for AI responses.
-   Provides specialized travel itinerary generation flows.

### 3. Backend Package (`src/firebase/`)
Centralized Firebase configuration and database interaction logic.
-   `firestore/`: Custom hooks for real-time data fetching.
-   Contains authentication providers and global error handling for database operations.
-   Server Actions in `src/app/actions/` handle secure backend operations.

### 4. Java Package (`java-backend/`)
A robust Spring Boot application for heavy-duty tasks.
-   Handles PDF generation for travel itineraries.
-   Demonstrates integration between a modern JS frontend and a traditional Java backend.

### 5. Data & Images Package (`src/data/`)
**[NEW PACKAGE]** Centralized storage for all application data.
-   `placeholder-images.json`: A single source of truth for all image URLs and links used across the site.
-   `destinations-data.ts`: Hardcoded tourism data for Himachal Pradesh.

---

## 🚀 Presentation Tips for the Examiner
-   Start by showing the **AI Itinerary Planner**; it demonstrates the integration of the AI and Backend packages.
-   Highlight the **Animations Package**; it shows advanced UI/UX capabilities.
-   The **Java Backend** demonstrates full-stack versatility and system integration.
