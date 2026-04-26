import { defaultLocale, routing } from '@/i18n/routing';
import ravConfig from '@/rav.config';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import Background from '@/components/background';
import BackgroundGradient from '@/components/background-gradient';
import BodyScrollbars from '@/components/body-scrollbars';
import Footer from '@/components/footer';
import Header from '@/components/header';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const t = await getTranslations('Seo');
  const { locale } = await params;

  const metadataBaseUrl = ravConfig.siteUrl
    ? new URL(ravConfig.siteUrl)
    : undefined;

  return {
    title: {
      default: `${ravConfig.title}`,
      template: `%s - ${ravConfig.title}`,
    },
    description: t('description'),
    keywords: [
      'Roominess',
      'Portfolio',
      'yikZero',
      'Designer',
      'Hangzhou',
      'Developer',
      'Product Designer',
    ],
    applicationName: ravConfig.title,
    authors: [{ name: ravConfig.author, url: ravConfig.siteUrl }],
    creator: ravConfig.author,
    generator: 'Next.js',
    ...(metadataBaseUrl && { metadataBase: metadataBaseUrl }),
    openGraph: {
      images: [
        {
          url: `${ravConfig.siteUrl}/${locale === 'en' ? 'opengraph-image-en.webp' : 'opengraph-image.webp'}`,
        },
      ],
    },
    twitter: {
      site: ravConfig.twitter,
      creator: ravConfig.twitter,
    },
    alternates: {
      canonical:
        locale === defaultLocale
          ? ravConfig.siteUrl
          : `${ravConfig.siteUrl}/${locale}`,
      types: {
        'application/rss+xml': [
          {
            title: ravConfig.title,
            url: `${ravConfig.siteUrl}/rss.xml`,
          },
        ],
      },
      languages: {
        'zh-CN': ravConfig.siteUrl,
        en: `${ravConfig.siteUrl}/en`,
        'x-default': ravConfig.siteUrl,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} data-overlayscrollbars-initialize>
      <head>
        <link rel="preconnect" href="https://cdn.yikzero.com" />
        <link rel="dns-prefetch" href="https://cdn.yikzero.com" />
      </head>
      <body
        data-overlayscrollbars-initialize
        className="relative min-h-dvh bg-background text-sm antialiased"
      >
        <NextIntlClientProvider>
          <BodyScrollbars />
          <Background />
          <Header />
          {children}
          <BackgroundGradient />
          <Footer />
        </NextIntlClientProvider>
      </body>
      {process.env.NODE_ENV === 'production' && (
        <GoogleAnalytics gaId="G-3KYHM9F914" />
      )}
    </html>
  );
}
