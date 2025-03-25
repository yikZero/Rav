import { routing } from '@/i18n/routing';
import { type Locale } from 'next-intl';
import type { ComponentType } from 'react';

interface MDXLoadResult {
  content: ComponentType;
  isFallback: boolean;
  actualLocale: Locale;
}

export async function loadLocalizedMDX(
  directory: string,
  locale: Locale,
  slug: string,
): Promise<MDXLoadResult | null> {
  const { defaultLocale } = routing;

  try {
    const content = (
      await import(`@/content/${directory}/${locale}/${slug}.mdx`)
    ).default;
    return {
      content,
      isFallback: false,
      actualLocale: locale,
    };
  } catch (error) {
    if (locale !== defaultLocale) {
      try {
        const defaultContent = (
          await import(`@/content/${directory}/${defaultLocale}/${slug}.mdx`)
        ).default;
        return {
          content: defaultContent,
          isFallback: true,
          actualLocale: defaultLocale,
        };
      } catch {
        return null;
      }
    }
    return null;
  }
}
