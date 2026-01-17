import { Link } from '@/i18n/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { Post } from '@/lib/post.utils';

interface PostNavigationProps {
  currentSlug: string;
  posts: Post[];
}

export default function PostNavigation({
  currentSlug,
  posts,
}: PostNavigationProps) {
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <div className="mt-16 grid grid-cols-1 gap-4 sm:mt-28 sm:grid-cols-2">
      <div className="flex justify-start">
        {prevPost && (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="group line-clamp-1 flex max-w-fit flex-row items-center gap-1 py-1 no-underline!"
            prefetch={true}
          >
            <ChevronLeft className="size-4 text-soft duration-500 ease-in-out group-hover:-translate-x-0.5 group-hover:text-sub" />
            <span className="font-medium text-sub transition duration-200 group-hover:text-strong">
              {prevPost.metadata.title}
            </span>
          </Link>
        )}
      </div>
      <div className="flex justify-end">
        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group line-clamp-1 flex max-w-fit flex-row items-center gap-1 py-1 no-underline!"
            prefetch={true}
          >
            <span className="font-medium text-sub transition duration-200 group-hover:text-strong">
              {nextPost.metadata.title}
            </span>
            <ChevronRight className="size-4 text-soft transition duration-500 ease-in-out group-hover:translate-x-0.5 group-hover:text-sub" />
          </Link>
        )}
      </div>
    </div>
  );
}
