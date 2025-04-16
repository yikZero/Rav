import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import * as motion from 'motion/react-client';
import { type Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { use } from 'react';

import { getBlogPosts } from '@/lib/post.utils';

import BlogPostGrid from '@/components/blog-post-grid';
import HeroTitle from '@/components/hero-title';
import { ArrowRight } from '@/components/icons';
import Trusted from '@/components/trusted';

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

  const posts = getBlogPosts({ language: locale });

  return (
    <main className="relative">
      <section className="mx-auto flex w-full flex-col items-center gap-12 px-4 pt-32 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5 }}
          className="group relative rotate-2 hover:rotate-3"
        >
          <Image
            src="https://cdn.yikzero.com/common/avatar.jpg!/fw/96"
            width={48}
            height={48}
            alt="yikZero's Avatar"
            className="size-12 rounded-xl outline outline-[#EFF6FF]/15"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMjAgMzIwJz48ZmlsdGVyIGlkPSdiJyBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9J3NSR0InPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzIwJy8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPScxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAxIDAgMCAwIDAgMCAxMDAgLTEnIHJlc3VsdD0ncycvPjxmZUZsb29kIHg9JzAnIHk9JzAnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnLz48ZmVDb21wb3NpdGUgb3BlcmF0b3I9J291dCcgaW49J3MnLz48ZmVDb21wb3NpdGUgaW4yPSdTb3VyY2VHcmFwaGljJy8+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMjAnLz48L2ZpbHRlcj48aW1hZ2Ugd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgeD0nMCcgeT0nMCcgcHJlc2VydmVBc3BlY3RSYXRpbz0nbm9uZScgc3R5bGU9J2ZpbHRlcjogdXJsKCNiKTsnIGhyZWY9J2RhdGE6aW1hZ2Uvd2VicDtiYXNlNjQsVWtsR1Jtb0FBQUJYUlVKUVZsQTRJRjRBQUFEUUFRQ2RBU29JQUFnQUFrQTRKWmdDZEFFTy9kWnFBQUQrOVY0emx3Q28zQTJEcm02UGpUSFFYTlVBaEwrMVJrL3BMekdycWs0K1c0VmFXWUJTVDJuSjBzZWNiVjNEdW9WRlJ0UVhadlhZdzZseEhpdHVqWE03djg5ZlFBQUEnLz48L3N2Zz4="
          />
          <div className="absolute top-1 -z-1 size-12 rounded-xl opacity-0 blur-xs transition duration-300 group-hover:bg-[url(https://cdn.yikzero.com/common/avatar.jpg!/fw/96)] group-hover:opacity-30" />
        </motion.div>
        <div className="flex flex-col items-center gap-4">
          <HeroTitle />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.5,
            }}
            className="text-center text-sm text-soft text-shadow-sm sm:text-base"
          >
            {`I enjoy hiking, cycling, coding and exploring. Let's connect.`}
          </motion.span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            href="mailto:yiikzero@gmail.com"
            className="group relative flex flex-row items-center gap-1 rounded-full bg-linear-to-b from-white/5 to-white/10 to-70% px-4 py-2 pr-4 pl-5 text-sm font-semibold text-strong shadow-md ring inset-shadow-2xs ring-[#01040E]/20 inset-shadow-white/10 text-shadow-2xs"
          >
            <span className="text-base font-medium text-strong">Email me</span>
            <ArrowRight className="size-4 opacity-60 transition duration-800 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </Link>
        </motion.div>
      </section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Trusted />
      </motion.div>
      <BlogPostGrid posts={posts} />
    </main>
  );
}
