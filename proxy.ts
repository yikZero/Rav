import { defaultLocale, locales, routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const localePrefix = locales.filter((l) => l !== defaultLocale).join('|');
const BLOG_ROUTE_PATTERN = new RegExp(
  `^/(?:(${localePrefix})/)?blog/([^/]+)/?$`,
);

export default function proxy(request: NextRequest) {
  const accept = request.headers.get('accept') || '';
  if (!accept.includes('text/markdown')) {
    return intlMiddleware(request);
  }

  const match = BLOG_ROUTE_PATTERN.exec(request.nextUrl.pathname);
  if (!match) {
    return intlMiddleware(request);
  }

  const locale = match[1] || defaultLocale;
  const slug = match[2];

  const url = new URL(`/api/md/${locale}/${slug}`, request.url);

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|static|favicon.ico|favicon.png|robots.txt|sitemap.xml|rss.xml|opengraph-image|llms.txt|background.mp4).*)',
  ],
};
