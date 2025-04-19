import { cn } from '@/lib/utils';

interface TitleProps {
  title: string;
  description: string;
  className?: string;
}

export default function Title({ title, description, className }: TitleProps) {
  return (
    <div className={cn('mb-12 flex flex-col gap-1', className)}>
      <h1 className="text-xl font-semibold text-strong sm:text-2xl">{title}</h1>
      <span className="text-base font-normal text-sub">{description}</span>
    </div>
  );
}
