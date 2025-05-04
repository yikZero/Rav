import Image from 'next/image';

import { cn } from '@/lib/utils';

interface PhotoCardProps {
  title: string;
  url: string;
  className?: string;
}

export default function PhotoCard({ title, url, className }: PhotoCardProps) {
  return (
    <div
      className={cn(
        'relative w-full cursor-crosshair rounded-2xl bg-background/45 p-1 shadow-sm outline outline-strong/9 brightness-99 transition-all duration-300 hover:shadow-lg hover:brightness-100 md:h-80',
        className,
      )}
    >
      <Image
        alt={title}
        width="429"
        height="572"
        loading="lazy"
        className="size-full rounded-xl object-cover object-bottom select-none"
        src={`${url}!/fh/572`}
        draggable="false"
      />
    </div>
  );
}
