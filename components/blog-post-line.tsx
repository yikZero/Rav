import type { Post } from '@/lib/post.utils';

import PostLine from '@/components/post-line';

interface BlogPostLineProps {
  posts: Post[];
}

export default function BlogPostLine({ posts }: BlogPostLineProps) {
  return (
    <div className="mx-auto mt-16 flex max-w-240 flex-col justify-center px-4 sm:px-0">
      <div className="mb-2 flex w-full flex-row items-center gap-2 sm:mb-4">
        <h2 className="shrink-0 text-sm font-medium text-soft select-none">
          More Posts
        </h2>
        <div
          className="h-px w-full bg-linear-to-r from-strong/6 to-strong/2"
          aria-hidden
        />
      </div>
      <div className="flex flex-col gap-1">
        {posts.map((post) => (
          <div key={post.slug}>
            <PostLine
              slug={post.slug}
              title={post.metadata.title}
              category={post.metadata.category}
              date={post.metadata.updatedAt || post.metadata.publishedAt}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
