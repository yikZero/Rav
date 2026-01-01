import { defaultLocale, routing } from '@/i18n/routing';
import ravConfig from '@/rav.config';
import * as motion from 'motion/react-client';
import type { Metadata } from 'next';
import { type Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { loadLocalizedMDX } from '@/lib/mdx.utils';
import { getBlogPosts } from '@/lib/post.utils';

import BlogTranslateNotice from '@/components/blog-translate-notice';
import DateDisplay from '@/components/date-display';
import PostNavigation from '@/components/post-navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const post = getBlogPosts({ language: locale }).find(
    (post) => post.slug === slug,
  );

  const title = post?.metadata.title;
  const description = post?.metadata.description;

  const ogImageUrl =
    `${ravConfig.siteUrl}/api/og?` +
    new URLSearchParams({
      title: title || '',
      description: description || '',
      pubDate: post?.metadata.updatedAt || post?.metadata.publishedAt || '',
      imageUrl: post?.metadata.image || '',
      locale: locale,
    }).toString();

  return {
    title,
    description,
    alternates: {
      canonical: `${ravConfig.siteUrl}/blog/${slug}`,
      languages: {
        'zh-CN': `${ravConfig.siteUrl}/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post?.metadata.publishedAt,
      modifiedTime: post?.metadata.updatedAt,
      url: `${ravConfig.siteUrl}${locale === defaultLocale ? '' : `/${locale}`}/blog/${slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title || '',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

const transition = { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const };
const variants = {
  hidden: { y: 20, opacity: 0 },
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

  const Content = await loadLocalizedMDX('posts', locale, slug);
  if (!Content) {
    notFound();
  }

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.05 }}
      viewport={{ once: true }}
      className="mx-auto max-w-172 px-4 pt-24 pb-12 sm:px-0 sm:pt-36"
    >
      <article className="sm:pt-4">
        <motion.div
          variants={variants}
          transition={transition}
          className="mb-10 flex flex-col gap-4 will-change-[transform,opacity]"
        >
          <h1 className="relative text-[1.75rem] leading-10 font-semibold tracking-tight text-pretty text-white outline-none sm:text-[2rem]">
            {post.metadata.title}
          </h1>
          <div className="flex items-center gap-2 text-sm leading-tight">
            <span className="inline rounded-md border border-strong/20 px-2 py-0.5 text-xs font-medium text-sub uppercase">
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
          className="sm:grid sm:gap-12 will-change-[transform,opacity]"
        >
          <div className="rypo max-w-172">
            {locale === 'en' && <BlogTranslateNotice />}
            <div lang={locale}>
              <Content />
            </div>
            <PostNavigation currentId={post.slug} />
          </div>
          {/* <div className="hidden sm:col-span-3 sm:block">
            <TableOfContents post={post} />
          </div> */}
        </motion.div>
      </article>
    </motion.main>
  );
}

export async function generateStaticParams() {
  const { locales } = routing;

  // Generate slug params for all locales
  const allParams = locales.flatMap((locale) => {
    const posts = getBlogPosts({ language: locale });
    return posts.map((post) => ({
      locale,
      slug: post.slug,
    }));
  });

  return allParams;
}

export const dynamicParams = false;
