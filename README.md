# Destiny Tour & Travels Website

This is a Next.js project for the Destiny Tour & Travels website, created and managed in Firebase Studio.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **UI:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Backend:** [Firebase](https://firebase.google.com/) (Firestore, Authentication)
- **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit)

## Project Structure

- **Pages**: Located in `src/app/`. Each folder represents a route (e.g., `src/app/about/page.tsx`).
- **Global Layout**: The main site template is at `src/app/layout.tsx`.
- **Components**: Reusable components are in `src/components/ui/` and `src/components/layout/`.
- **Firebase**: All Firebase configuration, hooks, and providers are in `src/firebase/`.
- **Static Data**: Site configuration, placeholder images, and initial data are managed in the `src/lib/` directory.

To get started, take a look at the main page file at `src/app/page.tsx`.

## Running Locally

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
