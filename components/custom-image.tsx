import Image, { type ImageProps } from 'next/image';

import ImageZoom from '@/components/image-zoom';

interface CustomImageProps
  extends Omit<ImageProps, 'src' | 'width' | 'height'> {
  src?: string;
  width?: string | number;
  height?: string | number;
}

const DEFAULT_WIDTH = 1200;

function parseSize(value: string | number | undefined): number | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'string' ? parseInt(value, 10) : value;
}

export default function CustomImage({
  alt,
  src = '',
  width,
  height,
  ...props
}: CustomImageProps): React.ReactElement {
  const parsedWidth = parseSize(width) ?? DEFAULT_WIDTH;
  const parsedHeight = parseSize(height);
  const hasAutoHeight = !parsedHeight;

  return (
    <figure>
      <ImageZoom>
        <Image
          {...props}
          src={src}
          alt={alt ?? ''}
          loading="lazy"
          width={parsedWidth}
          height={hasAutoHeight ? 0 : parsedHeight}
          sizes="(max-width: 768px) 100vw, 800px"
          style={hasAutoHeight ? { width: '100%', height: 'auto' } : undefined}
        />
      </ImageZoom>
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  );
}
