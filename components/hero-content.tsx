import { Link } from '@/i18n/navigation';
import * as motion from 'motion/react-client';
import { useTranslations } from 'next-intl';
import { Instrument_Serif } from 'next/font/google';
import Image from 'next/image';
import { Fragment } from 'react';

import { ArrowRight } from '@/components/icons';
import Trusted from '@/components/trusted';

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const };
const variants = {
  hidden: { filter: 'blur(10px)', transform: 'translateY(20%)', opacity: 0 },
  visible: { filter: 'blur(0)', transform: 'translateY(0)', opacity: 1 },
};

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function HeroContent() {
  const text = 'yikZero, Web3 Product Designer based in Hangzhou, China';
  const words = text.split(' ');

  const t = useTranslations('Hero');

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.04 }}
      viewport={{ once: true }}
      className="mx-auto flex w-full flex-col items-center gap-12 px-4 pt-32 sm:px-0 sm:pt-40"
    >
      <motion.div
        transition={transition}
        variants={variants}
        className="group relative rotate-2 hover:rotate-3"
      >
        <Image
          src="https://cdn.yikzero.com/common/avatar.jpg!/fw/96"
          width={48}
          height={48}
          alt="yikZero's Avatar"
          className="size-12 rounded-xl outline outline-[#EFF6FF]/15"
          draggable="false"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMjAgMzIwJz48ZmlsdGVyIGlkPSdiJyBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9J3NSR0InPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzIwJy8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPScxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAxMDAgLTEnIHJlc3VsdD0ncycvPjxmZUZsb29kIHg9JzAnIHk9JzAnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnLz48ZmVDb21wb3NpdGUgb3BlcmF0b3I9J291dCcgaW49J3MnLz48ZmVDb21wb3NpdGUgaW4yPSdTb3VyY2VHcmFwaGljJy8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMjAnLz48L2ZpbHRlcj48aW1hZ2Ugd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgeD0nMCcgeT0nMCcgcHJlc2VydmVBc3BlY3RSYXRpbz0nbm9uZScgc3R5bGU9J2ZpbHRlcjogdXJsKCNiKTsnIGhyZWY9J2RhdGE6aW1hZ2Uvd2VicDtiYXNlNjQsVWtsR1Jtb0FBQUJYUlVKUVZsQTRJRjRBQUFEUUFRQ2RBU29JQUFnQUFrQTRKWmdDZEFFTy9kWnFBQUQrOVY0emx3Q28zQTJEcm02UGpUSFFYTlVBaEwrMVJrL3BMekdycWs0K1c0VmFXWUJTVDJuSjBzZWNiVjNEdW9WRlJ0UVhadlhZdzZseEhpdHVqWE03djg5ZlFBQUEnLz48L3N2Zz4="
        />
        <div className="absolute top-1 -z-1 size-12 rounded-xl opacity-0 blur-xs transition duration-300 group-hover:bg-[url(https://cdn.yikzero.com/common/avatar.jpg!/fw/96)] group-hover:opacity-30" />
      </motion.div>
      <div className="flex flex-col items-center gap-4">
        <h1
          className={`${instrumentSerif.className} max-w-140 text-center text-4xl tracking-[0.01em] text-white/95 text-shadow-sm sm:text-5xl sm:leading-15.5`}
        >
          {words.map((word, index) => (
            <Fragment key={index}>
              <motion.span
                className="inline-block"
                transition={transition}
                variants={variants}
              >
                {word}
              </motion.span>
              {index < words.length - 1 && ' '}
            </Fragment>
          ))}
        </h1>
        <motion.span
          className="max-w-108 px-6 text-center text-sm text-soft text-shadow-sm sm:text-base"
          transition={transition}
          variants={variants}
        >
          {t('description')}
        </motion.span>
        <motion.div
          transition={transition}
          variants={variants}
          className="mt-8"
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
        transition={transition}
        variants={variants}
        className="mb-32 max-w-full sm:mb-40"
      >
        <Trusted />
      </motion.div>
    </motion.section>
  );
}
