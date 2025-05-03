'use client';

import { useEffect, useState } from 'react';

import Nav from '@/components/nav';

const SCROLL_THRESHOLD = 50;

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);

      if (scrollDifference > SCROLL_THRESHOLD) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlHeader);

    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed inset-x-0 top-4 z-50 transition-transform duration-800 sm:top-8 ${
        isVisible ? 'translate-y-0' : '-translate-y-20'
      }`}
    >
      <header className="mx-auto flex w-fit flex-row rounded-xl bg-linear-to-b from-strong/3 to-strong/1 p-1 shadow-2xl shadow-[#01040E]/15 outline outline-white/7 backdrop-blur-md transition duration-300 hover:outline-white/9">
        <Nav />
      </header>
    </div>
  );
}
