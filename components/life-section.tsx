import Image from 'next/image';

interface LifeSectionProps {
  time: string;
  image: string;
  title: string;
  description: string;
  url?: string;
}

export default function LifeSection({
  time,
  image,
  title,
  url,
  description,
}: LifeSectionProps) {
  return (
    <div className="grid grid-cols-7 gap-2">
      <div className="col-span-3 flex shrink-0 flex-row items-center gap-2 self-start text-[0.9375rem] leading-6 font-medium text-soft sm:pl-1">
        <div className="size-2 rounded-full border border-sub bg-background" />
        {time}
      </div>
      <div className="col-span-4 flex w-full flex-row gap-2.5">
        <Image
          src={image}
          width={22}
          height={22}
          alt={title}
          loading="lazy"
          className="mt-0.5 size-5.5 rounded-md"
          draggable="false"
        />
        <div className="flex flex-col gap-1">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-row items-center gap-1.5 py-0.5 text-base font-medium text-sub transition duration-200 hover:text-brand-500 sm:max-w-fit sm:py-0"
          >
            {title}
          </a>
          <p className="text-sm text-soft">{description}</p>
        </div>
      </div>
    </div>
  );
}
