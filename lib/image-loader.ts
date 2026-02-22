'use client';

import type { ImageLoaderProps } from 'next/image';

export default function cdnImageLoader({
  src,
}: ImageLoaderProps): string {
  return src;
}
