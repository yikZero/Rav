'use client';

import { Link } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

import { AllLinks } from '@/lib/navigation';
import { cn } from '@/lib/utils';

import { Star } from '@/components/icons';

export default function Nav() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  const locale = useLocale();

  const isActiveLink = useCallback(
    (linkId: string) => {
      if (linkId === 'home') {
        if (pathname === '/') return true;
        return locales.some((locale) => pathname === `/${locale}`);
      }
      const linkUrl = `/${linkId}`;
      const match = new RegExp(`^(?:/[^/]+)?${linkUrl}(?:/.*)?$`);
      return match.test(pathname);
    },
    [pathname],
  );

  return (
    <ul className="flex flex-row items-center gap-1 text-sm font-normal">
      {AllLinks.map((link) => {
        const isActive = isActiveLink(link.id);
        return (
          <li key={link.id}>
            <Link
              prefetch={true}
              href={link.url}
              className={cn(
                'relative cursor-pointer px-3 py-2 leading-4 font-medium text-sub transition duration-300 hover:text-strong',
                {
                  'text-strong': isActive,
                },
              )}
            >
              {t(link.id)}
              {isActive && (
                <motion.div
                  layoutId={`background-${locale}`}
                  aria-hidden
                  className="absolute inset-0 rounded-lg bg-linear-to-b from-white/5 to-white/9 to-70%"
                />
              )}
            </Link>
          </li>
        );
      })}
      <li>
        <button className="group relative flex cursor-pointer flex-row items-center gap-1.5 rounded-lg py-2 pr-3.5 pl-3 leading-4 font-medium text-sub transition duration-300 hover:text-strong">
          {t('talk')}
          <Star className="absolute top-1 right-1.5 size-2.5 text-disabled transition duration-800 ease-in-out group-hover:scale-105 group-hover:rotate-180 group-hover:text-brand-500" />
        </button>
      </li>
    </ul>
  );
}
