import Link from 'next/link';

import { getBlogPosts } from '@/lib/post.utils';

import { Rss } from '@/components/icons';
import Title from '@/components/title';

export default function BlogPage() {
  const posts = getBlogPosts();
  const categories = [
    { name: 'All', posts },
    ...Array.from(new Set(posts.map((post) => post.metadata.category))).map(
      (category) => ({
        name: category,
        posts: posts.filter((post) => post.metadata.category === category),
      }),
    ),
  ];

  return (
    <main className="pt-32">
      <Title
        title="Blog"
        right={
          <Link
            href="/rss.xml"
            className="group flex size-8 items-center justify-center"
          >
            <Rss className="size-4.5 text-soft transition duration-300 group-hover:text-strong" />
          </Link>
        }
      />
    </main>
  );
}
