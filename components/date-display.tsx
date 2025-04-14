import { useFormatter } from 'next-intl';

interface DateDisplayProps {
  className?: string;
  date: string;
  updatedAt?: string;
  monthsThreshold?: number;
  showRelative?: boolean;
  showAbsolute?: boolean;
}

export default function DateDisplay({
  className,
  date,
  updatedAt,
  monthsThreshold = 3,
  showRelative = true,
  showAbsolute = true,
}: DateDisplayProps) {
  const format = useFormatter();
  const finalDate = new Date(updatedAt ?? date);

  const isWithinMonths = (date: Date, months: number) => {
    const now = new Date();
    const monthsDiff =
      (now.getFullYear() - date.getFullYear()) * 12 +
      (now.getMonth() - date.getMonth());
    return Math.abs(monthsDiff) <= months;
  };

  const absoluteDate = format.dateTime(finalDate, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let displayDate = absoluteDate;

  if (showRelative && showAbsolute) {
    displayDate = isWithinMonths(finalDate, monthsThreshold)
      ? format.relativeTime(finalDate)
      : absoluteDate;
  } else if (showRelative) {
    displayDate = format.relativeTime(finalDate);
  }

  return (
    <time
      dateTime={updatedAt ?? date}
      className={className}
      title={absoluteDate}
    >
      {displayDate}
    </time>
  );
}
