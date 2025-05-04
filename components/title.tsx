import { cn } from '@/lib/utils';

interface TitleProps {
  title: string;
  description?: string;
  className?: string;
  right?: React.ReactNode;
}

export default function Title({
  title,
  description,
  className,
  right,
}: TitleProps) {
  return (
    <div
      className={cn('mx-auto mb-16 flex max-w-240 flex-row gap-8', className)}
    >
      <div className="flex w-full flex-col gap-2">
        <h1 className="text-xl font-semibold text-strong sm:text-2xl">
          {title}
        </h1>
        {description && (
          <span className="text-sm text-soft">{description}</span>
        )}
      </div>
      <div className="flex flex-row items-start gap-3">{right}</div>
    </div>
  );
}
