import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|static|favicon.ico|favicon.png|robots.txt|sitemap.xml|rss.xml|opengraph-image|llms.txt).*)',
  ],
};
