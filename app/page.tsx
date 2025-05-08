'use client';

import { useEffect } from 'react';
import Chat from '@/components/Chat';

export default function Home() {
  // Check system dark mode preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <main className="min-h-screen p-4 bg-gray-100 dark:bg-gray-950 transition-colors">
      <div className="max-w-5xl mx-auto pt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          AI Chat Assistant <span className="text-blue-500 dark:text-blue-400">Powered by Muhammad Immad</span>
        </h1>
        <Chat />
      </div>
    </main>
  );
} 