import { defaultLocale, routing } from '@/i18n/routing';
import ravConfig from '@/rav.config';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { getBlogPosts } from '@/lib/post.utils';

import BlogPostGrid from '@/components/blog-post-grid';
import HeroContent from '@/components/hero-content';
import HomeAbout from '@/components/home-about';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export function generateStaticParams(): Array<{ locale: string }> {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('Home');
  return {
    title: {
      absolute: `${t('title')} - ${ravConfig.title}`,
    },
    description: t('metaDescription'),
    alternates: {
      canonical:
        locale === defaultLocale
          ? ravConfig.siteUrl
          : `${ravConfig.siteUrl}/${locale}`,
      languages: {
        'zh-CN': ravConfig.siteUrl,
        en: `${ravConfig.siteUrl}/en`,
        'x-default': ravConfig.siteUrl,
      },
    },
  };
}

export default function HomePage({
  params,
}: HomePageProps): React.ReactElement {
  const { locale } = use(params);
  setRequestLocale(locale);

  const posts = getBlogPosts({ language: locale, limit: 3 });

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${ravConfig.siteUrl}/#website`,
    name: ravConfig.title,
    url: ravConfig.siteUrl,
    description: ravConfig.description,
    inLanguage: locale,
    author: {
      '@type': 'Person',
      name: ravConfig.author,
      url: ravConfig.siteUrl,
      sameAs: [
        'https://github.com/yikZero',
        'https://x.com/yikZero',
      ],
    },
  };

  return (
    <main data-home className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HeroContent />
      <div className="section-animate" style={{ animationDelay: '0.9s' }}>
        <BlogPostGrid posts={posts} isHome />
      </div>
      <div className="section-animate" style={{ animationDelay: '1s' }}>
        <HomeAbout />
      </div>
    </main>
  );
}
