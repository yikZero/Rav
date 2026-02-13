import { defaultLocale, locales } from '@/i18n/routing';
import fs from 'fs';
import path from 'path';

const SAFE_SLUG_PATTERN = /^[a-zA-Z0-9_-]+$/;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string; slug: string }> },
) {
  const { locale = defaultLocale, slug } = await params;

  if (
    !slug ||
    !SAFE_SLUG_PATTERN.test(slug) ||
    !locales.includes(locale as (typeof locales)[number])
  ) {
    return new Response('Not Found', { status: 404 });
  }

  const filePath = path.join(
    process.cwd(),
    'content',
    'posts',
    locale,
    `${slug}.mdx`,
  );

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const tokenEstimate = Math.ceil(content.length / 4);

    return new Response(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'x-markdown-tokens': String(tokenEstimate),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new Response('Not Found', { status: 404 });
  }
}
