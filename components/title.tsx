import { cn } from '@/lib/utils';

interface TitleProps {
  title: string;
  className?: string;
  right?: React.ReactNode;
}

export default function Title({ title, className, right }: TitleProps) {
  return (
    <div
      className={cn('mx-auto mb-6 flex max-w-240 flex-row gap-8', className)}
    >
      <div className="flex w-full flex-row gap-2">
        <h1 className="text-xl font-semibold text-strong sm:text-2xl">
          {title}
        </h1>
      </div>
      <div className="flex flex-row gap-3">{right}</div>
    </div>
  );
}
