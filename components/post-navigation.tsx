import { Link } from '@/i18n/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';

import { getBlogPosts } from '@/lib/post.utils';

interface PostNavigationProps {
  currentId: string;
}

export default function PostNavigation({ currentId }: PostNavigationProps) {
  const locale = useLocale();
  const allPosts = getBlogPosts({ language: locale });
  const currentIndex = allPosts.findIndex((post) => post.slug === currentId);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="mt-16 grid grid-cols-1 gap-4 sm:mt-28 sm:grid-cols-2">
      <div className="flex justify-start">
        {prevPost && (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="group line-clamp-1 flex max-w-fit flex-row items-center gap-1 py-1 !no-underline"
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
            className="group line-clamp-1 flex max-w-fit flex-row items-center gap-1 py-1 !no-underline"
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
