import type { Metadata } from 'next';

import NotFound from '@/components/not-found';

export const metadata: Metadata = {
  title: '404',
};

export default function NotFoundPage() {
  return <NotFound />;
}
