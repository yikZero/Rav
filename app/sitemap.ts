import { defaultLocale, locales } from '@/i18n/routing';
import ravConfig from '@/rav.config';
import type { MetadataRoute } from 'next';

import { getBlogPosts } from '@/lib/post.utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts();

  if (!ravConfig.siteUrl) {
    throw new Error('site url is not defined');
  }

  const generateLocalizedUrl = (path: string, locale: string) => {
    if (locale === defaultLocale) return `${ravConfig.siteUrl}${path}`;
    return `${ravConfig.siteUrl}/${locale}${path}`;
  };

  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  return [
    // 静态路由的多语言版本
    ...routes.flatMap((route) =>
      locales.map((locale) => ({
        url: generateLocalizedUrl(route.path, locale),
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      })),
    ),
    // 博客文章的多语言版本
    ...posts.flatMap((post) =>
      locales.map((locale) => ({
        url: generateLocalizedUrl(`/blog/${post.slug}`, locale),
        lastModified: new Date(
          post.metadata.updatedAt || post.metadata.publishedAt || '',
        ),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
    ),
  ];
}
