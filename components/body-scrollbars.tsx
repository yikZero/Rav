'use client';

import {
  ClickScrollPlugin,
  OverlayScrollbars,
} from 'overlayscrollbars';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import { useLayoutEffect, useRef } from 'react';

OverlayScrollbars.plugin(ClickScrollPlugin);

export default function BodyScrollbars({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [initialize, instance] = useOverlayScrollbars({
    options: {
      scrollbars: {
        theme: 'os-theme-rav',
        autoHide: 'leave',
        autoHideDelay: 600,
        clickScroll: true,
      },
    },
  });

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    initialize({
      target: document.body,
      elements: { viewport },
      cancel: { nativeScrollbarsOverlaid: false, body: false },
    });
    return () => instance()?.destroy();
  }, [initialize, instance]);

  return (
    <div ref={viewportRef} data-overlayscrollbars-viewport="">
      {children}
    </div>
  );
}
