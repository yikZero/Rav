import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

import { Github, Telegram, Twitter } from '@/components/icons';

interface FooterLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const footerLinks: FooterLink[] = [
  {
    name: 'Github',
    url: 'https://github.com/yikZero',
    icon: Github,
  },
  {
    name: 'Telegram',
    url: 'https://t.me/yikzero',
    icon: Telegram,
  },
  {
    name: 'X (Twitter)',
    url: 'http://onekey.so',
    icon: Twitter,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('Footer');
  const locale = useLocale();

  return (
    <footer className="mx-auto mt-24 flex max-w-196 flex-row justify-between">
      <div className="flex flex-row items-center gap-3">
        <p className="text-center text-sm font-medium text-soft select-none">
          {t.rich('copyright', {
            currentYear: currentYear,
          })}
        </p>
        {locale === 'zh-CN' && (
          <>
            <div className="hidden h-2 w-[1px] bg-disabled sm:block"></div>
            <Link
              rel="noopener noreferrer"
              className="flex flex-row items-center gap-1 text-center text-sm font-medium text-soft transition-colors duration-300 hover:text-brand-500"
              target="_blank"
              href="https://beian.miit.gov.cn/#/Integrated/index"
            >
              <Image
                alt="ICP License Icon"
                className="pointer-events-none size-4"
                width="20"
                height="20"
                loading="lazy"
                src="https://cdn.yikzero.com/roominess5/beian.png!/format/webp"
              />
              浙ICP备20012359号-1
            </Link>
          </>
        )}
      </div>
      <div className="flex flex-row gap-4">
        {footerLinks.map((link) => (
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
