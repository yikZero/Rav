import { defaultLocale, routing } from '@/i18n/routing';
import ravConfig from '@/rav.config';
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

  return {
    title,
    description,
    alternates: {
      canonical: `${ravConfig.siteUrl}${locale === defaultLocale ? '' : `/${locale}`}/blog/${slug}`,
      languages: {
        'zh-CN': `${ravConfig.siteUrl}/blog/${slug}`,
        en: `${ravConfig.siteUrl}/en/blog/${slug}`,
        'x-default': `${ravConfig.siteUrl}/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post?.metadata.publishedAt,
      modifiedTime: post?.metadata.updatedAt,
      url: `${ravConfig.siteUrl}${locale === defaultLocale ? '' : `/${locale}`}/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      site: ravConfig.twitter,
      creator: ravConfig.twitter,
      title,
      description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const posts = getBlogPosts({ language: locale });
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const Content = await loadLocalizedMDX('posts', locale, slug);
  if (!Content) {
    notFound();
  }

  const postUrl = `${ravConfig.siteUrl}${locale === defaultLocale ? '' : `/${locale}`}/blog/${slug}`;
  const blogUrl = `${ravConfig.siteUrl}${locale === defaultLocale ? '' : `/${locale}`}/blog`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metadata.title,
    description: post.metadata.description,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.updatedAt || post.metadata.publishedAt,
    url: postUrl,
    inLanguage: locale,
    author: {
      '@type': 'Person',
      name: ravConfig.author,
      url: ravConfig.siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: ravConfig.author,
      url: ravConfig.siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': `${blogUrl}#blog`,
    },
    ...(post.metadata.image && {
      image: post.metadata.image,
    }),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: ravConfig.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: blogUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.metadata.title,
        item: postUrl,
      },
    ],
  };

  return (
    <main data-page="blog-detail" className="mx-auto max-w-180 px-4 pt-24 pb-12 sm:px-6 sm:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <article className="sm:pt-4">
        <div
          className="stagger-animate-sm mb-10 flex flex-col gap-4"
          style={{ animationDelay: '0.1s' }}
        >
          <h1 className="relative text-[1.75rem] leading-10 font-semibold tracking-tight text-white outline-none sm:text-[2rem]">
            {post.metadata.title}
          </h1>
          <div className="flex items-center gap-2 text-sm leading-tight">
            {post.metadata.state === 'draft' && (
              <span className="inline rounded-md bg-[#f59e0b]/20 px-2 py-0.5 text-xs font-medium text-[#fbbf24] uppercase">
                Draft
              </span>
            )}
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
        </div>
        <div className="stagger-animate-sm" style={{ animationDelay: '0.15s' }}>
          <div className="rypo">
            {locale === 'en' && <BlogTranslateNotice />}
            <div lang={locale}>
              <Content />
            </div>
            <PostNavigation currentSlug={post.slug} posts={posts} />
          </div>
        </div>
      </article>
    </main>
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
