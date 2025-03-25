import { routing } from '@/i18n/routing';
import { type Locale } from 'next-intl';
import type { ComponentType } from 'react';

interface MDXLoadResult {
  content: ComponentType;
  isFallback: boolean;
  actualLocale: Locale;
}

interface MDXLoadError extends Error {
  code?: string;
  path?: string;
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
    const loadError = error as MDXLoadError;
    console.log(
      ` ✗ 无法加载 ${locale} 语言的内容: ${directory}/${locale}/${slug}`,
      loadError.message,
    );

    if (locale !== defaultLocale) {
      try {
        const defaultContent = (
          await import(`@/content/${directory}/${defaultLocale}/${slug}.mdx`)
        ).default;
        console.log(
          ` ✓ 回退到默认语言 (${defaultLocale}) 的内容: ${directory}/${defaultLocale}/${slug}`,
        );
        return {
          content: defaultContent,
          isFallback: true,
          actualLocale: defaultLocale,
        };
      } catch (fallbackError) {
        const fallbackLoadError = fallbackError as MDXLoadError;
        console.log(
          ` ✗ 无法加载默认语言内容: ${directory}/${defaultLocale}/${slug}`,
          fallbackLoadError.message,
        );
        return null;
      }
    }
    return null;
  }
}
