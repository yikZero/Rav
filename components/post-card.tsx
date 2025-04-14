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
    <>
      <Link
        href={`/blog/${slug}`}
        className={cn(
          'group relative flex cursor-pointer flex-col justify-end rounded-xl outline outline-[#EFF6FF]/7',
          className,
        )}
      >
        <div
          className={cn(
            'absolute inset-0 -z-1 bg-gradient-to-t from-[#01040E] to-[#01040E]/90',
            isFirst && 'from-[#01040E] from-20% to-[#01040E]/40',
          )}
        ></div>
        <Image
          className="-z-2 rounded-xl object-cover transition duration-500"
          src={`${metadata.image}!/fw/944`}
          alt={metadata.title}
          fill
        />
        <div className="flex flex-col gap-3 p-5">
          {isFirst && (
            <span className="text-xs font-medium text-brand-500 uppercase">
              {metadata.category}
            </span>
          )}
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium text-strong transition duration-500 ease-in-out group-hover:text-brand-500">
              {metadata.title}
            </h3>
            {isFirst ? (
              <p className="line-clamp-2 text-sm leading-[1.1875rem] text-strong/45">
                {metadata.description}
              </p>
            ) : (
              <DateDisplay
                date={metadata.updatedAt || metadata.publishedAt}
                className="text-sm text-strong/45"
              />
            )}
          </div>
        </div>
      </Link>
    </>
  );
}
