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
        'relative w-full rounded-2xl bg-[#020626]/25 p-1 shadow-sm outline outline-strong/9 backdrop-blur-md transition duration-300 hover:shadow-md md:h-88',
        className,
      )}
    >
      <Image
        alt={title}
        width="429"
        height="572"
        loading="lazy"
        className="size-full rounded-xl object-cover object-bottom"
        src={`${url}!/fh/572`}
      />
    </div>
  );
}
