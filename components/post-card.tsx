import { Link } from '@/i18n/navigation';
import Image from 'next/image';

import type { PostMetadata } from '@/lib/post.utils';
import { cn } from '@/lib/utils';

import DateDisplay from '@/components/date-display';

interface PostCardProps {
  metadata: PostMetadata;
  slug: string;
  isFirst?: boolean;
  className?: string;
}

export default function PostCard({
  metadata,
  slug,
  isFirst = false,
  className,
}: PostCardProps) {
  return (
    <article
      className={cn(
        'group relative isolate flex cursor-pointer flex-col justify-end overflow-hidden rounded-xl border border-[#EFF6FF]/6 sm:h-full',
        className,
      )}
    >
      <Link
        prefetch={true}
        href={`/blog/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={`阅读文章: ${metadata.title}`}
      >
        <span className="sr-only">阅读文章: {metadata.title}</span>
      </Link>

      <div
        className={cn(
          'absolute inset-0 -z-1 bg-linear-to-t from-[#01040E]/97 to-[#01040E]/90',
          isFirst && 'from-[#01040E]/97 from-20% to-[#01040E]/50',
        )}
        aria-hidden="true"
      />

      <Image
        className="-z-2 rounded-xl object-cover"
        src={`${metadata.image}!/fw/944`}
        alt=""
        fill
        draggable="false"
      />

      <div className="relative flex flex-col gap-3 p-5">
        {isFirst && (
          <span className="text-xs font-medium text-brand-500 uppercase">
            {metadata.category}
          </span>
        )}

        <header className="flex flex-col gap-2">
          <h3 className="text-base font-medium text-strong transition duration-500 ease-in-out group-hover:text-brand-500">
            {metadata.title}
          </h3>
          {isFirst ? (
            <p className="line-clamp-2 text-sm leading-5.5 text-strong/45">
              {metadata.description}
            </p>
          ) : (
            <DateDisplay
              date={metadata.updatedAt || metadata.publishedAt}
              className="text-sm text-strong/45"
            />
          )}
        </header>
      </div>
    </article>
  );
}
