# Knowsy!

Welcome to **Knowsy** — a futuristic, lightning-fast knowledge portal powered by Wikipedia.

Knowsy takes the wealth of human knowledge available on Wikipedia and presents it in a beautiful, distraction-free, glassmorphism interface. Designed with performance and aesthetics in mind, it provides an unparalleled reading and discovery experience.

## ✨ Features

- **Blazing Fast Searches**: Search through millions of Wikipedia articles instantly with real-time debounced autocomplete.
- **Article of the Day**: Discover something new every day! The homepage fetches Wikipedia's "Featured Article of the Day" directly on the server.
- **"Surprise Me" Discovery**: Feeling lucky? Click the dice icon to fetch a completely random article to learn about.
- **Read Aloud (Text-to-Speech)**: Don't feel like reading? Knowsy uses the native Web Speech API to read article summaries out loud to you.
- **Quick Share**: Instantly copy direct Wikipedia links to your clipboard to share with friends.
- **Keyboard Navigation**: Fully optimized for power users. Use `Ctrl+K` to focus search, `Arrow Keys` to navigate autocomplete, and `Enter` to search.
- **Stunning UI**: Built with Tailwind CSS and Framer Motion, featuring deep cyber-glow backgrounds, glass panels, and smooth micro-animations.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: Wikipedia REST API & Action API

## 🛠 Architecture

Knowsy adheres strictly to modern React and Next.js best practices:

- **React Server Components (RSC)**: The homepage and featured article fetching happen securely on the server with aggressively cached ISR (`revalidate: 86400`), resulting in near-instant load times.
- **Custom Hooks**: Complex browser APIs (Speech Synthesis, Clipboard) and DOM logic (Keyboard shortcuts, Outside clicks) are extracted into isolated, reusable custom hooks (`useTextToSpeech`, `useClipboard`, `useSearchPanel`).
- **Service Layer**: All Wikipedia API calls are centralized in `services/wikipedia.ts` to keep the UI components purely presentational.
- **Error Handling**: Implements global Error and Loading boundaries (`error.tsx`, `loading.tsx`) to gracefully handle network failures.

## 💻 Getting Started

First, install the dependencies using pnpm:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License

This project is open-source and free to use. Knowledge should be accessible to everyone!
