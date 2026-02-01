import { defaultLocale, routing } from '@/i18n/routing';
import ravConfig from '@/rav.config';
import type { Metadata } from 'next';
import { type Locale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { use } from 'react';

import { getBlogPosts } from '@/lib/post.utils';

import BlogPostGrid from '@/components/blog-post-grid';
import BlogPostLine from '@/components/blog-post-line';
import { Rss } from '@/components/icons';
import Title from '@/components/title';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('Blog');
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${ravConfig.siteUrl}${locale === defaultLocale ? '' : `/${locale}`}/blog`,
      languages: {
        'zh-CN': `${ravConfig.siteUrl}/blog`,
        en: `${ravConfig.siteUrl}/en/blog`,
        'x-default': `${ravConfig.siteUrl}/blog`,
      },
    },
  };
}

export default function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('Blog');

  const posts = getBlogPosts({ language: locale });
  const cardPosts = posts.slice(0, 3);
  const linePosts = posts.slice(3);

  return (
    <main className="pt-24 sm:pt-32">
      <div className="stagger-animate" style={{ animationDelay: '0.1s' }}>
        <Title
          title={t('title')}
          description={t('description')}
          right={
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="/rss.xml"
              className="group flex size-8 items-center justify-center rounded-lg transition duration-300 hover:bg-strong/9"
            >
              <Rss className="size-4.5 text-soft transition duration-300 group-hover:text-strong" />
            </Link>
          }
        />
      </div>
      <div className="stagger-animate" style={{ animationDelay: '0.16s' }}>
        <BlogPostGrid posts={cardPosts} />
      </div>
      <div className="stagger-animate" style={{ animationDelay: '0.22s' }}>
        <BlogPostLine posts={linePosts} />
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
