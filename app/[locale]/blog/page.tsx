import { type Locale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { use } from 'react';

import { getBlogPosts } from '@/lib/post.utils';

import BlogPostGrid from '@/components/blog-post-grid';
import BlogPostLine from '@/components/blog-post-line';
import { Rss } from '@/components/icons';
import Title from '@/components/title';

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
    <main className="pt-32">
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
      <BlogPostGrid posts={cardPosts} />
      <BlogPostLine posts={linePosts} />
    </main>
  );
}
