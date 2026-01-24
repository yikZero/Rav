import { routing } from '@/i18n/routing';
import ravConfig from '@/rav.config';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { getBlogPosts } from '@/lib/post.utils';

import BlogPostGrid from '@/components/blog-post-grid';
import FadeIn from '@/components/fade-in';
import HeroContent from '@/components/hero-content';
import HomeAbout from '@/components/home-about';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export function generateStaticParams(): Array<{ locale: string }> {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Home');
  return {
    title: {
      absolute: `${t('title')} - ${ravConfig.title}`,
    },
  };
}

export default function HomePage({ params }: HomePageProps): React.ReactElement {
  const { locale } = use(params);
  setRequestLocale(locale);

  const posts = getBlogPosts({ language: locale, limit: 3 });

  return (
    <main className="relative">
      <HeroContent />
      <FadeIn>
        <BlogPostGrid posts={posts} isHome />
      </FadeIn>
      <FadeIn>
        <HomeAbout />
      </FadeIn>
    </main>
  );
}
