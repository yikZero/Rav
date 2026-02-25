import { defaultLocale, routing } from '@/i18n/routing';
import { stackItems } from '@/lib/stack';
import ravConfig from '@/rav.config';
import type { Metadata } from 'next';
import { type Locale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import StackList from '@/components/stack-list';
import Title from '@/components/title';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('Stack');
  return {
    title: t('title'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${ravConfig.siteUrl}${locale === defaultLocale ? '' : `/${locale}`}/stack`,
      languages: {
        'zh-CN': `${ravConfig.siteUrl}/stack`,
        en: `${ravConfig.siteUrl}/en/stack`,
        'x-default': `${ravConfig.siteUrl}/stack`,
      },
    },
  };
}

export default function StackPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('Stack');

  const stackUrl = `${ravConfig.siteUrl}${locale === defaultLocale ? '' : `/${locale}`}/stack`;
  const stackJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': stackUrl,
    name: t('title'),
    description: t('description'),
    url: stackUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: stackItems.length,
      itemListElement: stackItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        description:
          item.description[locale as 'zh-CN' | 'en'] ??
          item.description['zh-CN'],
        ...(item.link && { url: item.link }),
      })),
    },
  };

  return (
    <main className="pt-24 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stackJsonLd) }}
      />
      <div className="stagger-animate" style={{ animationDelay: '0.1s' }}>
        <Title title={t('title')} description={t('description')} />
      </div>
      <div className="stagger-animate" style={{ animationDelay: '0.16s' }}>
        <StackList locale={locale} />
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
