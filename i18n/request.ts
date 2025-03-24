import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    timeZone: 'Asia/Hong_Kong',
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
