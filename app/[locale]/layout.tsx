import { routing } from '@/i18n/routing';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import Background from '@/components/background';
import BackgroundGradient from '@/components/background-gradient';
import Footer from '@/components/footer';
import Header from '@/components/header';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
      <body className="relative min-h-dvh bg-background text-sm antialiased">
        <NextIntlClientProvider>
          <Background />
          <Header />
          {children}
          <BackgroundGradient />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
