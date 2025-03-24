import { type Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { getBlogPosts } from '@/lib/post.utils';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const Post = (await import(`@/content/posts/${slug}.mdx`)).default;
  if (!Post) {
    notFound();
  }
  return <Post />;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;
