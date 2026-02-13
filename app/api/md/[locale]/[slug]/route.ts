import { defaultLocale, locales } from '@/i18n/routing';
import fs from 'fs';
import path from 'path';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string; slug: string }> },
) {
  const { locale = defaultLocale, slug } = await params;

  if (!slug || !locales.includes(locale as (typeof locales)[number])) {
    return new Response('Not Found', { status: 404 });
  }

  const filePath = path.join(
    process.cwd(),
    'content',
    'posts',
    locale,
    `${slug}.mdx`,
  );

  if (!fs.existsSync(filePath)) {
    return new Response('Not Found', { status: 404 });
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const tokenEstimate = Math.ceil(content.length / 4);

  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(tokenEstimate),
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
