'use client';

import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ViewTransition, useCallback } from 'react';

import { AllLinks } from '@/lib/navigation';
import { cn } from '@/lib/utils';

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

  return (
    <ul className="pointer-events-auto relative flex flex-row items-center gap-1 text-sm font-normal">
      {AllLinks.map((link) => {
        const isActive = isActiveLink(link.id);
        return (
          <li key={link.id} className="relative">
            {isActive && (
              <ViewTransition name="nav-indicator" share="nav-slide">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-lg border border-brand-400/2 bg-linear-to-b from-white/5 to-white/7 to-70%"
                />
              </ViewTransition>
            )}
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
    </ul>
  );
}
