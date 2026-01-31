import { Link } from '@/i18n/navigation';
import * as motion from 'motion/react-client';
import { useTranslations } from 'next-intl';
import localFont from 'next/font/local';
import Image from 'next/image';
import { Fragment } from 'react';

import { blurFadeVariants, heroTransition } from '@/lib/animations';

import { ArrowRight } from '@/components/icons';
import Trusted from '@/components/trusted';

const instrumentSerif = localFont({
  src: '../fonts/instrument-serif-subset.woff2',
  display: 'swap',
});

const HERO_TEXT = 'yikZero, Web3 Product Designer based in Hangzhou, China';
const HERO_WORDS = HERO_TEXT.split(' ');

export default function HeroContent(): React.ReactElement {
  const t = useTranslations('Hero');

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.04 }}
      viewport={{ once: true }}
      className="mx-auto flex w-full flex-col items-center gap-12 px-4 pt-32 sm:px-6 sm:pt-40"
    >
      <motion.div
        transition={heroTransition}
        variants={blurFadeVariants}
        className="group relative rotate-2 will-change-transform hover:rotate-3"
      >
        <Image
          src="https://cdn.yikzero.com/common/avatar.jpg"
          width={48}
          height={48}
          alt="yikZero's Avatar"
          className="size-12 rounded-xl outline outline-[#EFF6FF]/15"
          draggable="false"
          preload
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMjAgMzIwJz48ZmlsdGVyIGlkPSdiJyBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9J3NSR0InPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzIwJy8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPScxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAxMDAgLTEnIHJlc3VsdD0ncycvPjxmZUZsb29kIHg9JzAnIHk9JzAnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnLz48ZmVDb21wb3NpdGUgb3BlcmF0b3I9J291dCcgaW49J3MnLz48ZmVDb21wb3NpdGUgaW4yPSdTb3VyY2VHcmFwaGljJy8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMjAnLz48L2ZpbHRlcj48aW1hZ2Ugd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgeD0nMCcgeT0nMCcgcHJlc2VydmVBc3BlY3RSYXRpbz0nbm9uZScgc3R5bGU9J2ZpbHRlcjogdXJsKCNiKTsnIGhyZWY9J2RhdGE6aW1hZ2Uvd2VicDtiYXNlNjQsVWtsR1Jtb0FBQUJYUlVKUVZsQTRJRjRBQUFEUUFRQ2RBU29JQUFnQUFrQTRKWmdDZEFFTy9kWnFBQUQrOVY0emx3Q28zQTJEcm02UGpUSFFYTlVBaEwrMVJrL3BMekdycWs0K1c0VmFXWUJTVDJuSjBzZWNiVjNEdW9WRlJ0UVhadlhZdzZseEhpdHVqWE03djg5ZlFBQUEnLz48L3N2Zz4="
        />
        <div className="absolute top-1 -z-1 size-12 rounded-xl opacity-0 blur-xs transition duration-300 group-hover:bg-[url(https://cdn.yikzero.com/common/avatar.jpg!/fw/96)] group-hover:opacity-30" />
      </motion.div>
      <div className="flex flex-col items-center gap-4">
        <h1
          className={`${instrumentSerif.className} max-w-140 text-center text-4xl tracking-[0.01em] text-white/95 text-shadow-sm sm:text-5xl sm:leading-15.5`}
        >
          {HERO_WORDS.map((word, index) => (
            <Fragment key={index}>
              <motion.span
                className="inline-block will-change-[filter,transform]"
                transition={heroTransition}
                variants={blurFadeVariants}
              >
                {word}
              </motion.span>
              {index < HERO_WORDS.length - 1 && ' '}
            </Fragment>
          ))}
        </h1>
        <motion.span
          className="max-w-108 px-6 text-center text-sm text-soft text-shadow-sm sm:text-base"
          transition={heroTransition}
          variants={blurFadeVariants}
        >
          {t('description')}
        </motion.span>
        <motion.div
          transition={heroTransition}
          variants={blurFadeVariants}
          className="mt-8 will-change-[filter,transform]"
        >
          <Link
            href="mailto:yiikzero@gmail.com"
            className="group relative flex flex-row items-center gap-1 rounded-full bg-linear-to-b from-white/5 to-white/10 to-70% px-4 py-2 pr-4 pl-5 text-sm font-semibold text-strong shadow-md ring inset-shadow-2xs ring-[#01040E]/20 inset-shadow-white/10 text-shadow-2xs"
          >
            <span className="text-base font-medium text-strong">
              {t('emailMe')}
            </span>
            <ArrowRight className="size-4 opacity-60 transition duration-800 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </Link>
        </motion.div>
      </div>
      <motion.div
        transition={heroTransition}
        variants={blurFadeVariants}
        className="mb-32 max-w-full will-change-[filter,transform] sm:mb-40"
      >
        <Trusted />
      </motion.div>
    </motion.section>
  );
}
