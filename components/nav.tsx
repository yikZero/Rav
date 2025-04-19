'use client';

import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

import { AllLinks } from '@/lib/navigation';
import { cn } from '@/lib/utils';

import { Star } from '@/components/icons';

type BackgroundStyle = {
  left: number;
  width: number;
  opacity: number;
};

export default function Nav() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>({
    left: 0,
    width: 0,
    opacity: 0,
  });

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
      return new RegExp(`^(?:/[^/]+)?/${linkId}(?:/.*)?$`).test(pathname);
    },
    [pathname],
  );

  useEffect(() => {
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

  return (
    <ul
      ref={ulRef}
      className="relative flex flex-row items-center gap-1 text-sm font-normal"
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
              prefetch
              href={link.url}
              className={cn(
                'relative z-10 block cursor-pointer px-3 py-2 leading-4 font-medium text-sub transition duration-300 hover:text-strong',
                { 'text-strong': isActive },
              )}
            >
              {t(link.id)}
            </Link>
          </li>
        );
      })}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 bottom-0 h-full rounded-lg bg-linear-to-b from-white/5 to-white/9 to-70% transition-all duration-300 ease-in-out"
        style={backgroundStyle}
      />
      <li>
        <button className="group relative z-10 flex cursor-not-allowed flex-row items-center gap-1.5 rounded-lg py-2 pr-3.5 pl-3 leading-4 font-medium text-sub transition duration-300 hover:text-strong">
          {t('talk')}
          <Star className="absolute top-1 right-1.5 size-2.5 text-disabled transition duration-800 ease-in-out group-hover:scale-105 group-hover:rotate-180 group-hover:text-brand-500" />
        </button>
      </li>
    </ul>
  );
}
