'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundVideo(): React.ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setShouldLoad(true));
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(() => setShouldLoad(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      className="z-2 mx-auto h-full w-full scale-150 opacity-80 blur-[48px]"
      muted
      loop
      playsInline
      preload="none"
      poster="https://cdn.yikzero.com/rav/background-poster.jpg"
      disablePictureInPicture
      disableRemotePlayback
    >
      {shouldLoad && (
        <source
          src="https://cdn.yikzero.com/img/2026/06/2f72e172485c7a31f60a5294be87124d-rav-background-640-crf35.mp4"
          type="video/mp4"
        />
      )}
    </video>
  );
}
