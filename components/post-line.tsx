import { Link } from '@/i18n/navigation';

import DateDisplay from '@/components/date-display';

interface PostLineProps {
  slug: string;
  title: string;
  category: string;
  date: string;
}

export default function PostLine({
  slug,
  title,
  category,
  date,
}: PostLineProps) {
  return (
    <Link
      prefetch={true}
      href={`/blog/${slug}`}
      className="group relative flex w-full justify-between gap-4 rounded-lg py-4 text-sm sm:grid sm:grid-cols-5"
    >
      <div className="line-clamp-1 w-full font-medium text-strong transition duration-500 ease-in-out group-hover:text-brand-500 sm:col-span-3 sm:line-clamp-2">
        {title}
      </div>
      <div className="col-span-1 hidden font-normal text-soft sm:block">
        {category}
      </div>
      <DateDisplay
        date={date}
        className="shrink-0 text-soft sm:col-span-1 sm:text-end"
      />
    </Link>
  );
}
