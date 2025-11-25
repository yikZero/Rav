import { routing } from '@/i18n/routing';
import ravConfig from '@/rav.config';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import Background from '@/components/background';
import BackgroundGradient from '@/components/background-gradient';
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
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
    openGraph: {
      images: [
        {
          url: `${ravConfig.siteUrl}/${locale === 'en' ? 'opengraph-image-en.png' : 'opengraph-image.png'}`,
        },
      ],
    },
    alternates: {
      types: {
        'application/rss+xml': [
          {
            title: ravConfig.title,
            url: `${ravConfig.siteUrl}/rss.xml`,
          },
        ],
      },
      languages: {
        'zh-CN': '/',
        en: '/en',
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
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://cdn.yikzero.com" />
        <link rel="dns-prefetch" href="https://cdn.yikzero.com" />
      </head>
      <body className="relative min-h-dvh bg-background text-sm antialiased">
        <NextIntlClientProvider>
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
