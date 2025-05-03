import Link from 'next/link';

import { Rss } from '@/components/icons';
import Title from '@/components/title';

export default function BlogPage() {
  return (
    <main className="pt-32">
      <Title
        title="Blog"
        right={
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="/rss.xml"
            className="group flex size-8 items-center justify-center rounded-lg transition duration-300 hover:bg-strong/9"
          >
            <Rss className="size-4.5 text-soft transition duration-300 group-hover:text-strong" />
          </Link>
        }
      />
    </main>
  );
}
