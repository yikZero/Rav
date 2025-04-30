'use client';

import mediumZoom from 'medium-zoom';
import Image, { type ImageProps } from 'next/image';
import { memo, useEffect, useMemo, useRef } from 'react';

// 定义组件的 props 类型
interface CustomImageProps
  extends Omit<ImageProps, 'src' | 'width' | 'height'> {
  src?: string;
  width?: string | number;
  height?: string | number;
}

// 定义 zoom 配置
const ZOOM_OPTIONS = {
  background: 'var(--color-background)',
  margin: 24,
} as const;

function CustomImage({
  alt,
  src = '',
  width,
  height,
  ...props
}: CustomImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  // 处理尺寸
  const dimensions = useMemo(
    () => ({
      width: typeof width === 'string' ? parseInt(width) : width || 0,
      height: typeof height === 'string' ? parseInt(height) : height || 0,
    }),
    [width, height],
  );

  // 处理 zoom 效果
  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const zoom = mediumZoom(imageElement, ZOOM_OPTIONS);
    return () => {
      zoom.detach();
      return undefined;
    };
  }, []);

  return (
    <figure>
      <Image
        {...props}
        ref={imageRef}
        src={src}
        alt={alt || ''}
        loading="lazy"
        {...dimensions}
      />
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  );
}

export default memo(CustomImage);
