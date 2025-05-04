import * as motion from 'motion/react-client';
import { type Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { loadLocalizedMDX } from '@/lib/mdx.utils';
import { getBlogPosts } from '@/lib/post.utils';

import BlogTranslateNotice from '@/components/blog-translate-notice';
import DateDisplay from '@/components/date-display';
import PostNavigation from '@/components/post-navigation';
import TableOfContents from '@/components/table-of-contents';

const transition = { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] };
const variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const post = getBlogPosts({ language: locale }).find(
    (post) => post.slug === slug,
  );
  if (!post) {
    notFound();
  }

  const result = await loadLocalizedMDX('posts', locale, slug);
  if (!result) {
    notFound();
  }

  const { content: Content } = result;
  return (
    <motion.main
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.06 }}
      viewport={{ once: true }}
      className="mx-auto max-w-240 pt-28 pb-12 sm:pt-36"
    >
      <article className="sm:pt-4">
        <motion.div
          variants={variants}
          transition={transition}
          className="mb-10 flex flex-col gap-4"
        >
          <h1 className="relative text-[1.75rem] leading-10 font-semibold tracking-tight text-pretty text-strong outline-none sm:text-[2rem]">
            {post.metadata.title}
          </h1>
          <div className="flex items-center gap-2 text-sm leading-tight">
            <span className="inline rounded-md border border-strong/20 px-2 py-0.5 text-xs font-medium text-sub">
              {post.metadata.category}
            </span>
            <span className="text-soft select-none">· </span>
            <DateDisplay
              className="text-nowrap text-sub"
              date={post.metadata.publishedAt}
              updatedAt={post.metadata.updatedAt}
            />
          </div>
        </motion.div>
        <motion.div
          variants={variants}
          transition={transition}
          className="sm:grid sm:grid-cols-12 sm:gap-12"
        >
          <div className="rypo sm:col-span-9">
            {locale === 'en' && <BlogTranslateNotice />}
            <Content />
            <PostNavigation currentId={post.slug} />
          </div>
          <div className="hidden sm:col-span-3 sm:block">
            <TableOfContents post={post} />
          </div>
        </motion.div>
      </article>
    </motion.main>
  );
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;
