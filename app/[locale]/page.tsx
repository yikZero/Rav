import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { type Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Instrument_Serif } from 'next/font/google';
import Image from 'next/image';
import { use } from 'react';

import { ArrowRight } from '@/components/icons';
import Trusted from '@/components/trusted';

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
      <section className="mx-auto flex w-full flex-col items-center gap-12 pt-48">
        <div className="group relative rotate-2 transition duration-300 hover:rotate-3">
          <Image
            src="https://cdn.yikzero.com/common/avatar.jpg!/fw/100"
            width={50}
            height={50}
            alt="yikZero's Avatar"
            className="size-12.5 rounded-xl outline outline-[#EFF6FF]/15"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMjAgMzIwJz48ZmlsdGVyIGlkPSdiJyBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9J3NSR0InPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzIwJy8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPScxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAxMDAgLTEnIHJlc3VsdD0ncycvPjxmZUZsb29kIHg9JzAnIHk9JzAnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnLz48ZmVDb21wb3NpdGUgb3BlcmF0b3I9J291dCcgaW49J3MnLz48ZmVDb21wb3NpdGUgaW4yPSdTb3VyY2VHcmFwaGljJy8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMjAnLz48L2ZpbHRlcj48aW1hZ2Ugd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgeD0nMCcgeT0nMCcgcHJlc2VydmVBc3BlY3RSYXRpbz0nbm9uZScgc3R5bGU9J2ZpbHRlcjogdXJsKCNiKTsnIGhyZWY9J2RhdGE6aW1hZ2Uvd2VicDtiYXNlNjQsVWtsR1Jtb0FBQUJYUlVKUVZsQTRJRjRBQUFEUUFRQ2RBU29JQUFnQUFrQTRKWmdDZEFFTy9kWnFBQUQrOVY0emx3Q28zQTJEcm02UGpUSFFYTlVBaEwrMVJrL3BMekdycWs0K1c0VmFXWUJTVDJuSjBzZWNiVjNEdW9WRlJ0UVhadlhZdzZseEhpdHVqWE03djg5ZlFBQUEnLz48L3N2Zz4="
          />
          <div className="absolute top-1 -z-1 size-12.5 rounded-xl opacity-0 blur-xs transition duration-300 group-hover:bg-[url(https://cdn.yikzero.com/common/avatar.jpg!/fw/100)] group-hover:opacity-30" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1
            className={`${instrumentSerif.className} max-w-132 text-center text-5xl leading-[3.875rem] text-strong text-shadow-md`}
          >
            yikZero, Web3 Product Designer based in Hangzhou, China.
          </h1>
          <span className="text-base text-soft text-shadow-sm">
            {`I enjoy hiking, cycling, coding and exploring. Let's connect.`}
          </span>
        </div>
        <Link
          href="mailto:yiikzero@gmail.com"
          className="group flex flex-row items-center gap-1 rounded-full bg-gradient-to-b from-[#020717] to-[#0A2341] py-2.5 pr-4 pl-5 outline outline-strong/9"
        >
          <span className="text-base font-medium text-strong">Email me</span>
          <ArrowRight className="size-4 transition duration-800 group-hover:translate-x-0.5" />
        </Link>
      </section>
      <Trusted />
    </main>
  );
}
