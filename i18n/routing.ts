import { defineRouting } from 'next-intl/routing';

export const locales = ['zh-CN', 'en'] as const;
export const defaultLocale = 'zh-CN';

export const labels = {
  'zh-CN': 'Chinese',
  en: 'English',
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
  },
});
