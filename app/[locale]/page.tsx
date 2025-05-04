import { routing } from '@/i18n/routing';
import { type Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { getBlogPosts } from '@/lib/post.utils';

import BlogPostGrid from '@/components/blog-post-grid';
import FadeIn from '@/components/fade-in';
import HeroContent from '@/components/hero-content';
import HomeAbout from '@/components/home-about';

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
  const cardPosts = posts.slice(0, 3);

  return (
    <main className="relative">
      <HeroContent />
      <FadeIn>
        <BlogPostGrid posts={cardPosts} isHome />
      </FadeIn>
      <FadeIn>
        <HomeAbout />
      </FadeIn>
    </main>
  );
}
