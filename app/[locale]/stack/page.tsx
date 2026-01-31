import { defaultLocale, routing } from '@/i18n/routing';
import ravConfig from '@/rav.config';
import * as motion from 'motion/react-client';
import type { Metadata } from 'next';
import { type Locale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { defaultTransition, fadeUpVariants } from '@/lib/animations';

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
    description: t('description'),
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

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.06 }}
      viewport={{ once: true }}
      className="pt-24 sm:pt-32"
    >
      <motion.div variants={fadeUpVariants} transition={defaultTransition}>
        <Title title={t('title')} description={t('description')} />
      </motion.div>
      <motion.div variants={fadeUpVariants} transition={defaultTransition}>
        <StackList locale={locale} />
      </motion.div>
    </motion.main>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
