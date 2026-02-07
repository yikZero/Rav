'use client';

import { useTranslations } from 'next-intl';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');

  return (
    <main className="mx-auto flex min-h-[calc(100svh-172px)] max-w-240 items-center justify-center">
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-semibold text-strong">{t('title')}</h1>
          <p className="text-base font-normal text-soft">{t('description')}</p>
        </div>
        <div>
          <button
            onClick={reset}
            className="w-fit cursor-pointer rounded-lg bg-brand-500 px-4 py-2 font-medium text-strong transition duration-300 hover:bg-brand-400"
          >
            {t('retry')}
          </button>
        </div>
      </div>
    </main>
  );
}
