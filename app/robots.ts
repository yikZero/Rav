import ravConfig from '@/rav.config';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: `${ravConfig.siteUrl}/sitemap.xml`,
    host: ravConfig.siteUrl,
  };
}
