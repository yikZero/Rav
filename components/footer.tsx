'use client';

import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { Github, Telegram, Twitter } from '@/components/icons';

interface FooterLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FOOTER_LINKS: FooterLink[] = [
  { name: 'Github', url: 'https://github.com/yikZero/Rav', icon: Github },
  { name: 'Telegram', url: 'https://t.me/yikzero', icon: Telegram },
  { name: 'X (Twitter)', url: 'https://x.com/yikZero', icon: Twitter },
];

const BLOG_DETAIL_REGEX = /^\/([a-z-]+\/)?blog\/[^/]+\/?$/;

export default function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('Footer');
  const locale = useLocale();
  const pathname = usePathname();

  const isBlogDetail = BLOG_DETAIL_REGEX.test(pathname);

  return (
    <footer
      className={cn(
        'z-50 mx-auto mt-20 flex translate-z-0 flex-col-reverse items-center justify-between gap-6 px-4 pb-4 sm:mt-32 sm:flex-row sm:gap-0 sm:px-6',
        isBlogDetail ? 'max-w-172' : 'max-w-240',
      )}
    >
      <div className="flex flex-row items-center gap-4 sm:gap-3">
        <p className="text-center text-sm font-medium text-soft select-none">
          {t.rich('copyright', { currentYear })}
        </p>
        {locale === 'zh-CN' && (
          <>
            <div className="hidden h-2 w-px bg-disabled sm:block" />
            <Link
              rel="noopener noreferrer"
              className="flex flex-row items-center gap-1 text-center text-sm font-medium text-soft transition-colors duration-300 hover:text-brand-500"
              target="_blank"
              href="https://beian.miit.gov.cn/#/Integrated/index"
            >
              <Image
                alt="ICP License Icon"
                className="pointer-events-none size-4"
                width={16}
                height={16}
                loading="lazy"
                src="https://cdn.yikzero.com/roominess5/beian.png"
              />
              浙ICP备20012359号-1
            </Link>
          </>
        )}
      </div>
      <div className="flex flex-row gap-4">
        {FOOTER_LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-sub transition duration-300 hover:text-strong"
          >
            <link.icon className="size-5" />
          </Link>
        ))}
      </div>
    </footer>
  );
}
