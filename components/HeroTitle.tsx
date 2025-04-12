'use client';

import { animate, stagger } from 'motion/react';
import { Instrument_Serif } from 'next/font/google';
import { useEffect, useRef } from 'react';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function HeroTitle() {
  const titleAnimationRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleAnimationRef.current) {
      const words = titleAnimationRef.current.textContent?.split(' ') || [];
      titleAnimationRef.current.innerHTML = words
        .map((word) => `<span class="inline-block">${word}</span>`)
        .join(' ');

      const spans = titleAnimationRef.current.querySelectorAll('span');

      animate(
        spans,
        {
          opacity: [0, 1],
          y: [15, 0],
          filter: ['blur(8px)', 'blur(0px)'],
        },
        {
          duration: 0.6,
          delay: stagger(0.1),
        },
      );
    }
  }, []);

  return (
    <h1
      ref={titleAnimationRef}
      className={`${instrumentSerif.className} max-w-140 text-center text-5xl leading-[3.875rem] tracking-[0.01em] text-strong text-shadow-md`}
    >
      yikZero, Web3 Product Designer based in Hangzhou, China.
    </h1>
  );
}
