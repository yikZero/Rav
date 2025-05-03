import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: '404',
};

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <main className="mx-auto flex min-h-[calc(100svh-172px)] max-w-240 items-center justify-center">
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-semibold text-strong">{t('title')}</h1>
          <p className="text-base font-normal text-soft">{t('description')}</p>
        </div>
        <div className="">
          <Link
            href="/"
            className="w-fit rounded-lg bg-brand-500 px-4 py-2 font-medium text-strong transition duration-300 hover:bg-brand-400"
          >
            {t('returnHome')}
          </Link>
        </div>
      </div>
    </main>
  );
}
