'use client';

import { motion } from 'motion/react';

import type { Post } from '@/lib/post.utils';
import { cn } from '@/lib/utils';

import PostCard from '@/components/post-card';

interface BlogPostGridProps {
  posts: Post[];
}

export default function BlogPostGrid({ posts }: BlogPostGridProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'mx-auto mt-40 grid h-90 max-w-240 grid-flow-col grid-cols-2 grid-rows-2 gap-4',
      )}
    >
      {posts.map((post, index) => (
        <PostCard
          key={post.slug}
          slug={post.slug}
          metadata={post.metadata}
          isFirst={index === 0}
          className={cn(index === 0 && 'row-span-2')}
        />
      ))}
    </motion.section>
  );
}
