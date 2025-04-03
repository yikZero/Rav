import { routing } from '@/i18n/routing';
import Avatar from '@/public/avatar.jpg';
import { type Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Instrument_Serif } from 'next/font/google';
import Image from 'next/image';
import { use } from 'react';

import Background from '@/components/background';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main className="relative">
      <Background />
      <section className="mx-auto flex w-full flex-col items-center gap-12 pt-45">
        <div className="relative rotate-2">
          <Image
            src={Avatar}
            alt="yikZero's Avatar"
            className="size-12.5 rounded-xl outline outline-[#EFF6FF]/15"
          />
          <div className="absolute top-0.5 -z-1 size-12.5 rounded-xl bg-[#091028]/70 blur-sm" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1
            className={`${instrumentSerif.className} max-w-132 text-center text-5xl leading-[3.875rem] text-strong`}
          >
            yikZero, Web3 Product Designer based in Hangzhou, China.
          </h1>
          <span className="text-base text-soft">
            I enjoy hiking, cycling, coding and exploring. Let&apos;s connect.
          </span>
        </div>
      </section>
    </main>
  );
}
