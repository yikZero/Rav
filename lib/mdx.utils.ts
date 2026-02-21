import { defaultLocale } from '@/i18n/routing';
import { type Locale } from 'next-intl';
import type { ComponentType } from 'react';

async function tryImportMDX(
  directory: string,
  locale: string,
  slug: string,
): Promise<ComponentType | null> {
  try {
    return (await import(`@/content/${directory}/${locale}/${slug}.mdx`))
      .default;
  } catch {
    return null;
  }
}

export async function loadLocalizedMDX(
  directory: string,
  locale: Locale,
  slug: string,
): Promise<ComponentType | null> {
  const content = await tryImportMDX(directory, locale, slug);
  if (content) return content;

  if (locale !== defaultLocale) {
    return tryImportMDX(directory, defaultLocale, slug);
  }

  return null;
}
