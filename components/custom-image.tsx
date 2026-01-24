'use client';

import mediumZoom from 'medium-zoom';
import Image, { type ImageProps } from 'next/image';
import { memo, useEffect, useRef } from 'react';

interface CustomImageProps
  extends Omit<ImageProps, 'src' | 'width' | 'height'> {
  src?: string;
  width?: string | number;
  height?: string | number;
}

const ZOOM_OPTIONS = {
  background: 'var(--color-background)',
  margin: 24,
} as const;

const DEFAULT_WIDTH = 1200;

function parseSize(value: string | number | undefined): number | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'string' ? parseInt(value, 10) : value;
}

function CustomImage({
  alt,
  src = '',
  width,
  height,
  ...props
}: CustomImageProps): React.ReactElement {
  const imageRef = useRef<HTMLImageElement>(null);

  const parsedWidth = parseSize(width) ?? DEFAULT_WIDTH;
  const parsedHeight = parseSize(height);
  const hasAutoHeight = !parsedHeight;

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const zoom = mediumZoom(imageElement, ZOOM_OPTIONS);
    return () => {
      zoom.detach();
    };
  }, []);

  return (
    <figure>
      <Image
        {...props}
        ref={imageRef}
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        width={parsedWidth}
        height={hasAutoHeight ? 0 : parsedHeight}
        sizes="(max-width: 768px) 100vw, 800px"
        style={hasAutoHeight ? { width: '100%', height: 'auto' } : undefined}
      />
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  );
}

export default memo(CustomImage);
