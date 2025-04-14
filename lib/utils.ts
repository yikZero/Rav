import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date: string,
  locale: string = 'zh-CN',
  includeRelative = false,
) {
  const currentDate = new Date();
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  const relativeTexts = {
    'zh-CN': {
      year: '年前',
      month: '个月前',
      day: '天前',
      today: '今天',
    },
    en: {
      year: 'y ago',
      month: 'mo ago',
      day: 'd ago',
      today: 'Today',
    },
  };

  const texts =
    relativeTexts[locale as keyof typeof relativeTexts] ||
    relativeTexts['zh-CN'];
  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}${texts.year}`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}${texts.month}`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}${texts.day}`;
  } else {
    formattedDate = texts.today;
  }

  const fullDate = targetDate.toLocaleString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
