'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
}

export default function FadeIn({
  children,
  className,
}: FadeInProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: '0px 0px 100px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.5s, transform 0.5s',
      }}
    >
      {children}
    </div>
  );
}
