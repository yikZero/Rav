'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        router.replace(pathname, {
          locale: locale === 'zh-CN' ? 'en' : 'zh-CN',
        });
      }}
      className="cursor-pointer p-1 text-sm font-medium text-sub transition duration-300 hover:text-strong"
    >
      {locale === 'zh-CN' ? 'EN' : '中文'}
    </button>
  );
}
