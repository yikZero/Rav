import ravConfig from '@/rav.config';
import { remark } from 'remark';
import html from 'remark-html';
import RSS from 'rss';
import sanitizeHtml from 'sanitize-html';

import { getBlogPosts } from '@/lib/post.utils';

const processor = remark().use(html);

export async function GET() {
  const posts = getBlogPosts();

  const rss = new RSS({
    title: ravConfig.title,
    description: ravConfig.description,
    site_url: ravConfig.siteUrl,
    feed_url: ravConfig.siteUrl + '/rss.xml',
    language: 'zh-CN',
    generator: 'Next.js',
  });

  for (const post of posts) {
    try {
      const result = await processor.process(post.content || '');
      const renderedContent = String(result);
      const sanitizedContent = sanitizeHtml(renderedContent, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      });

      rss.item({
        title: post.metadata.title,
        guid: `${ravConfig.siteUrl}/blog/${post.slug}/`,
        author: ravConfig.author,
        url: `${ravConfig.siteUrl}/blog/${post.slug}`,
        description: post.metadata.description,
        custom_elements: [
          {
            'content:encoded': sanitizedContent,
          },
        ],
        date: new Date(post.metadata.updatedAt || post.metadata.publishedAt),
      });
    } catch (error) {
      console.error(`Error processing post ${post.slug}:`, error);
    }
  }

  return new Response(rss.xml(), {
    headers: {
      'content-type': 'application/xml',
    },
  });
}
