import {
  type StackItem,
  categoryLabels,
  stackCategories,
  stackItems,
} from '@/lib/stack';

import { ExternalLink } from '@/components/icons';

function StackCard({ item, locale }: { item: StackItem; locale: string }) {
  const description =
    item.description[locale as keyof typeof item.description] ??
    item.description['zh-CN'];

  const content = (
    <div className="group flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition duration-300 hover:border-white/10 hover:bg-white/[0.04]">
      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.icon}
          alt={item.name}
          width={48}
          height={48}
          loading="lazy"
          className="size-full object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
        <span className="text-[0.9375rem] leading-tight font-medium text-strong">
          {item.name}
        </span>
        <p className="line-clamp-2 text-[0.8125rem] leading-relaxed text-soft select-none sm:line-clamp-1">
          {description}
        </p>
      </div>
      {item.link && (
        <ExternalLink className="mt-1 hidden size-4 shrink-0 text-transparent transition duration-300 group-hover:text-soft/50 sm:block" />
      )}
    </div>
  );

  if (item.link) {
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

export default function StackList({ locale }: { locale: string }) {
  const grouped = stackCategories.map((cat) => ({
    category: cat,
    items: stackItems.filter((i) => i.category === cat),
  }));

  return (
    <div className="mx-auto flex max-w-240 flex-col gap-12 px-4 sm:px-6">
      {grouped.map(({ category, items }) => (
        <section key={category}>
          <h2 className="mb-4 text-[0.8125rem] font-medium tracking-wider text-soft/50 uppercase select-none">
            {categoryLabels[category]?.[
              locale as keyof (typeof categoryLabels)[typeof category]
            ] ?? category}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <StackCard key={item.name} item={item} locale={locale} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
