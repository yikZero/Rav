import ravConfig from '@/rav.config';
import { Feed } from 'feed';
import { remark } from 'remark';
import html from 'remark-html';

import { getBlogPosts } from '@/lib/post.utils';

export const dynamic = 'force-static';

const processor = remark().use(html);

function processMdxComponents(content: string): string {
  let result = content.replace(
    /<Video\s+[^>]*src=["']([^"']+)["'][^>]*\/>/g,
    '[查看视频]($1)',
  );
  result = result.replace(/<[A-Z][a-zA-Z]*\s*[^>]*\/>/g, '');
  result = result.replace(/<([A-Z][a-zA-Z]*)[^>]*>[\s\S]*?<\/\1>/g, '');
  return result;
}

export async function GET() {
  const posts = getBlogPosts();
  const siteUrl = ravConfig.siteUrl.replace(/\/$/, '');

  const feed = new Feed({
    title: ravConfig.title,
    description: ravConfig.description,
    id: siteUrl,
    link: siteUrl,
    language: 'zh-CN',
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    generator: 'Next.js',
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
    },
    author: {
      name: ravConfig.author,
      email: ravConfig.email,
      link: siteUrl,
    },
  });

  const feedItems = await Promise.allSettled(
    posts.map(async (post) => {
      try {
        const cleanContent = processMdxComponents(post.content || '');
        const result = await processor.process(cleanContent);
        const renderedContent = String(result);
        const postDate = new Date(
          post.metadata.updatedAt || post.metadata.publishedAt,
        );

        return {
          title: post.metadata.title,
          id: `${siteUrl}/blog/${post.slug}`,
          link: `${siteUrl}/blog/${post.slug}`,
          description: post.metadata.description,
          content: renderedContent,
          date: postDate,
          author: [
            {
              name: ravConfig.author,
              email: ravConfig.email,
            },
          ],
        };
      } catch (error) {
        console.error(`Error processing post ${post.slug}:`, error);
        throw error;
      }
    }),
  );

  for (const item of feedItems) {
    if (item.status === 'fulfilled') {
      feed.addItem(item.value);
    }
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
