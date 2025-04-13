import { type Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <div>Blog</div>;
}
