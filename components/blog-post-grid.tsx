import type { Post } from '@/lib/post.utils';
import { cn } from '@/lib/utils';

import PostCard from '@/components/post-card';

interface BlogPostGridProps {
  posts: Post[];
}

export default function BlogPostGrid({ posts }: BlogPostGridProps) {
  return (
    <section className="mx-auto mt-52 grid h-90 max-w-240 grid-flow-col grid-cols-2 grid-rows-2 gap-4">
      {posts.slice(0, 3).map((post, index) => (
        <PostCard
          key={post.slug}
          slug={post.slug}
          metadata={post.metadata}
          isFirst={index === 0}
          className={cn(index === 0 && 'row-span-2')}
        />
      ))}
    </section>
  );
}
