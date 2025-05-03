'use client';

import confetti from 'canvas-confetti';
import { useEffect } from 'react';

import { Sign } from '@/components/icons';

export default function ConfettiButton() {
  useEffect(() => {
    const STORAGE_KEY = 'confettiScrollTriggered';
    const hasTriggeredBefore = localStorage.getItem(STORAGE_KEY);

    if (!hasTriggeredBefore) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (documentHeight - scrollPosition <= 50) {
          confetti();
          localStorage.setItem(STORAGE_KEY, 'true');
          window.removeEventListener('scroll', handleScroll);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleClick = () => {
    confetti();
  };
  return (
    <button
      data-confetti-button
      className="group w-fit cursor-pointer"
      onClick={handleClick}
    >
      <Sign className="h-auto w-32 text-strong/90 transition duration-300 group-active:scale-75 hover:text-strong sm:w-36" />
    </button>
  );
}
