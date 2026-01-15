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
        'group relative flex cursor-pointer flex-col justify-end rounded-xl sm:h-full',
        className,
      )}
    >
      {/* 图片容器 */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <Image
          className="size-full object-cover"
          src={`${metadata.image}!/fw/944`}
          alt=""
          fill
          draggable="false"
        />
      </div>
      {/* 蒙层 - 稍微扩大覆盖边缘 */}
      <div
        className={cn(
          'absolute -inset-px rounded-xl bg-linear-to-t from-[#01040E]/97 to-[#01040E]/82',
          isFirst && 'from-[#01040E]/95 from-10% to-[#01040E]/50',
        )}
        aria-hidden="true"
      />
      {/* 内描边 */}
      <div
        className="absolute inset-0 z-1 rounded-xl ring-1 ring-white/4 ring-inset"
        aria-hidden="true"
      />

      <Link
        prefetch={true}
        href={`/blog/${slug}`}
        className="absolute inset-0 z-10 rounded-xl"
        aria-label={`阅读文章: ${metadata.title}`}
      >
        <span className="sr-only">阅读文章: {metadata.title}</span>
      </Link>

      <div className="relative z-1 flex flex-col gap-3 p-5">
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
