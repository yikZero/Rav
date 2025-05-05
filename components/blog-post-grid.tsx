import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import type { Post } from '@/lib/post.utils';
import { cn } from '@/lib/utils';

import { ArrowRight } from '@/components/icons';
import PostCard from '@/components/post-card';

interface BlogPostGridProps {
  posts: Post[];
  isHome?: boolean;
}

export default function BlogPostGrid({
  posts,
  isHome = false,
}: BlogPostGridProps) {
  const t = useTranslations('Blog');

  return (
    <section className={cn('mx-auto max-w-240 px-4 sm:px-0')}>
      <div className="grid grid-cols-1 gap-5 sm:h-90 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-2 sm:gap-4">
        {posts.map((post, index) => (
          <PostCard
            key={post.slug}
            slug={post.slug}
            metadata={post.metadata}
            isFirst={index === 0}
            className={cn('h-48', index === 0 && 'h-72 sm:row-span-2')}
          />
        ))}
      </div>
      {isHome && (
        <div className="flex w-full justify-end">
          <Link
            href="/blog"
            className="group mt-8 flex w-fit flex-row items-center gap-1 text-sm font-medium text-soft transition duration-300 hover:text-brand-500 sm:mt-4"
            prefetch={true}
          >
            {t('more')}
            <ArrowRight className="size-4 text-disabled transition duration-500 ease-in-out group-hover:translate-x-0.5 group-hover:text-brand-500" />
          </Link>
        </div>
      )}
    </section>
  );
}
