import { routing } from '@/i18n/routing';
import * as motion from 'motion/react-client';
import type { Metadata } from 'next';
import { type Locale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { use } from 'react';

import { getBlogPosts } from '@/lib/post.utils';

import BlogPostGrid from '@/components/blog-post-grid';
import BlogPostLine from '@/components/blog-post-line';
import { Rss } from '@/components/icons';
import Title from '@/components/title';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Blog');
  return {
    title: t('title'),
    description: t('description'),
  };
}

const transition = { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] };
const variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

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
    <motion.main
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.06 }}
      viewport={{ once: true }}
      className="pt-24 sm:pt-32"
    >
      <motion.div variants={variants} transition={transition}>
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
      </motion.div>
      <motion.div variants={variants} transition={transition}>
        <BlogPostGrid posts={cardPosts} />
      </motion.div>
      <motion.div variants={variants} transition={transition}>
        <BlogPostLine posts={linePosts} />
      </motion.div>
    </motion.main>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
