'use client';

import { motion } from 'motion/react';

import type { Post } from '@/lib/post.utils';

import PostLine from '@/components/post-line';

interface BlogPostLineProps {
  posts: Post[];
}

export default function BlogPostLine({ posts }: BlogPostLineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mx-auto mt-16 flex max-w-240 flex-col justify-center"
    >
      <div className="mb-2 flex w-full flex-row items-center gap-2 sm:mb-4">
        <h2 className="shrink-0 text-sm font-medium text-soft select-none">
          More Posts
        </h2>
        <div
          className="h-[1px] w-full bg-gradient-to-r from-strong/6 to-strong/2"
          aria-hidden
        />
      </div>
      <div className="flex flex-col gap-1">
        {posts.map((post) => (
          <PostLine
            key={post.slug}
            slug={post.slug}
            title={post.metadata.title}
            category={post.metadata.category}
            date={post.metadata.updatedAt || post.metadata.publishedAt}
          />
        ))}
      </div>
    </motion.div>
  );
}
