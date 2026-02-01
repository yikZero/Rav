'use client';

import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { AllLinks } from '@/lib/navigation';
import { cn } from '@/lib/utils';

type BackgroundStyle = {
  left: number;
  width: number;
  opacity: number;
};

const LINK_PATTERN_CACHE = new Map<string, RegExp>();

function getLinkPattern(linkId: string): RegExp {
  if (!LINK_PATTERN_CACHE.has(linkId)) {
    LINK_PATTERN_CACHE.set(
      linkId,
      new RegExp(`^(?:/[^/]+)?/${linkId}(?:/.*)?$`),
    );
  }
  return LINK_PATTERN_CACHE.get(linkId)!;
}

export default function Nav() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [enableTransition, setEnableTransition] = useState(false);

  const ulRef = useRef<HTMLUListElement>(null);
  const liRefs = useRef<(HTMLLIElement | null)[]>([]);

  const isActiveLink = useCallback(
    (linkId: string) => {
      if (linkId === 'home') {
        return (
          pathname === '/' ||
          locales.some((locale) => pathname === `/${locale}`)
        );
      }
      return getLinkPattern(linkId).test(pathname);
    },
    [pathname],
  );

  useLayoutEffect(() => {
    const activeIndex = AllLinks.findIndex((link) => isActiveLink(link.id));
    const activeLi = liRefs.current[activeIndex];

    if (activeIndex !== -1 && ulRef.current && activeLi) {
      setBackgroundStyle({
        left: activeLi.offsetLeft,
        width: activeLi.offsetWidth,
        opacity: 1,
      });
    } else {
      setBackgroundStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [pathname, isActiveLink]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setEnableTransition(true);
    });
  }, []);

  return (
    <ul
      ref={ulRef}
      className="pointer-events-auto relative flex flex-row items-center gap-1 text-sm font-normal"
    >
      {AllLinks.map((link, index) => {
        const isActive = isActiveLink(link.id);
        return (
          <li
            key={link.id}
            ref={(el) => {
              liRefs.current[index] = el;
            }}
          >
            <Link
              href={link.url}
              className={cn(
                'group relative z-10 block cursor-pointer px-3.5 py-2.5 leading-4 font-medium text-soft transition duration-300 hover:text-strong sm:px-3 sm:py-2',
                { 'font-medium text-strong': isActive },
              )}
            >
              {t(link.id)}
            </Link>
          </li>
        );
      })}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 bottom-0 h-full rounded-lg border border-brand-400/2 bg-linear-to-b from-white/5 to-white/7 to-70%"
        style={{
          ...backgroundStyle,
          transition: enableTransition
            ? 'left 300ms ease-in-out, width 300ms ease-in-out, opacity 300ms ease-in-out'
            : 'opacity 200ms ease-out',
        }}
      />
    </ul>
  );
}
