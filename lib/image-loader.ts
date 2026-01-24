'use client';

import type { ImageLoaderProps } from 'next/image';

export default function cdnImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (src.includes('!/')) {
    return src;
  }

  const params = [`!/fw/${width}`, 'format/webp'];
  if (quality) {
    params.push(`quality/${quality}`);
  }

  return `${src}${params.join('/')}`;
}
