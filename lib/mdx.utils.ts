import { type Locale } from 'next-intl';
import type { ComponentType } from 'react';

export async function loadLocalizedMDX(
  directory: string,
  locale: Locale,
  slug: string,
): Promise<ComponentType> {
  return (await import(`@/content/${directory}/${locale}/${slug}.mdx`)).default;
}
