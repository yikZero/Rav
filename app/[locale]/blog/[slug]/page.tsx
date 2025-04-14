import { type Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { loadLocalizedMDX } from '@/lib/mdx.utils';
import { getBlogPosts } from '@/lib/post.utils';

import DateDisplay from '@/components/date-display';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const post = getBlogPosts().find((post) => post.slug === slug);
  if (!post) {
    notFound();
  }

  const result = await loadLocalizedMDX('posts', locale, slug);
  if (!result) {
    notFound();
  }

  const { content: Content } = result;
  return (
    <main className="mx-auto max-w-180 pt-28 pb-12 sm:pt-36">
      <article className="sm:pt-4">
        <div className="mb-10 flex flex-col gap-4">
          <h1 className="relative text-[1.75rem] leading-10 font-semibold tracking-tight text-pretty text-strong outline-none sm:text-[2rem]">
            {post.metadata.title}
          </h1>
          <div className="flex items-center gap-2 text-sm leading-tight">
            <span className="inline rounded-md border border-strong/20 px-2 py-0.5 text-xs font-medium text-sub">
              {post.metadata.category}
            </span>
            <span className="text-soft select-none">· </span>
            <DateDisplay
              className="text-nowrap text-sub"
              date={post.metadata.publishedAt}
              updatedAt={post.metadata.updatedAt}
            />
          </div>
        </div>
        <div className="rypo sm:col-span-7">
          {locale === 'en' && (
            <div className="mt-8 rounded-lg border border-brand-900 bg-brand-500/15 px-4 py-2 font-medium">
              This article is currently only available in Chinese. You can use
              <a
                href="https://immersivetranslate.com/en/"
                className="inline-flex px-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                Immersive Translate
              </a>
              Website Extension for automatic translation.
            </div>
          )}
          <Content />
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;
