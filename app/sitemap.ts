import { defaultLocale, locales } from '@/i18n/routing';
import ravConfig from '@/rav.config';
import type { MetadataRoute } from 'next';

import { getBlogPosts } from '@/lib/post.utils';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!ravConfig.siteUrl) {
    throw new Error('site url is not defined');
  }

  const generateLocalizedUrl = (path: string, locale: string) => {
    if (locale === defaultLocale) return `${ravConfig.siteUrl}${path}`;
    return `${ravConfig.siteUrl}/${locale}${path}`;
  };

  const generateAlternates = (path: string) => ({
    languages: Object.fromEntries(
      locales.map((l) => [l, generateLocalizedUrl(path, l)]),
    ),
  });

  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/stack', changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  return [
    // 静态路由的多语言版本
    ...routes.flatMap((route) =>
      locales.map((locale) => ({
        url: generateLocalizedUrl(route.path, locale),
        lastModified: new Date('2025-01-01'),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: generateAlternates(route.path),
      })),
    ),
    // 博客文章 - 为每个语言单独获取
    ...locales.flatMap((locale) => {
      const posts = getBlogPosts({ language: locale });
      return posts.map((post) => ({
        url: generateLocalizedUrl(`/blog/${post.slug}`, locale),
        lastModified: new Date(
          post.metadata.updatedAt || post.metadata.publishedAt || '',
        ),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: generateAlternates(`/blog/${post.slug}`),
      }));
    }),
  ];
}
