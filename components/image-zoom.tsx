'use client';

import mediumZoom from 'medium-zoom';
import { useEffect, useRef } from 'react';

const ZOOM_OPTIONS = {
  background: 'var(--color-background)',
  margin: 24,
} as const;

export default function ImageZoom({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = ref.current?.querySelector('img');
    if (!img) return;

    const zoom = mediumZoom(img, ZOOM_OPTIONS);
    return () => {
      zoom.detach();
    };
  }, []);

  return (
    <div ref={ref} style={{ display: 'contents' }}>
      {children}
    </div>
  );
}
