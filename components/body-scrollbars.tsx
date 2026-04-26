'use client';

import {
  ClickScrollPlugin,
  OverlayScrollbars,
} from 'overlayscrollbars';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import { useEffect } from 'react';

OverlayScrollbars.plugin(ClickScrollPlugin);

export default function BodyScrollbars() {
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

  useEffect(() => {
    initialize({
      target: document.body,
      cancel: { nativeScrollbarsOverlaid: false, body: false },
    });
    return () => instance()?.destroy();
  }, [initialize, instance]);

  return null;
}
