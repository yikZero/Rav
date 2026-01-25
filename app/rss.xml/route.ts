import ravConfig from '@/rav.config';
import { Feed } from 'feed';
import { type NextRequest } from 'next/server';
import { remark } from 'remark';
import html from 'remark-html';

import { getBlogPosts } from '@/lib/post.utils';

const processor = remark().use(html);

function processMdxComponents(content: string): string {
  // Handle Video components with any attributes (src, poster, etc.)
  let result = content.replace(
    /<Video\s+[^>]*src=["']([^"']+)["'][^>]*\/>/g,
    '[查看视频]($1)',
  );
  // Remove other self-closing MDX components
  result = result.replace(/<[A-Z][a-zA-Z]*\s*[^>]*\/>/g, '');
  // Remove MDX components with children
  result = result.replace(/<([A-Z][a-zA-Z]*)[^>]*>[\s\S]*?<\/\1>/g, '');
  return result;
}

function generateHtmlPage(
  posts: Array<{
    title: string;
    link: string;
    description: string;
    date: Date;
  }>,
  siteUrl: string,
) {
  const postItems = posts
    .map(
      (post) => `
      <li class="post-item">
        <h2 class="post-title">
          <a href="${post.link}">${post.title}</a>
        </h2>
        <p class="post-meta">${post.date.toLocaleDateString('zh-CN')}</p>
        <p class="post-description">${post.description}</p>
      </li>`,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${ravConfig.title} RSS Feed</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      line-height: 1.6;
      max-width: 720px;
      margin: 0 auto;
      padding: 2rem 1rem;
      background: #fafafa;
      color: #333;
    }
    header {
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 1.5rem;
      margin-bottom: 2rem;
    }
    .badge {
      display: inline-block;
      background: #f97316;
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0.5rem 0;
      color: #111;
    }
    .description { color: #666; margin-top: 0.5rem; }
    .subscribe-hint {
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-top: 1rem;
      font-size: 0.875rem;
      color: #666;
    }
    .subscribe-hint code {
      background: #f5f5f5;
      padding: 0.125rem 0.375rem;
      border-radius: 0.25rem;
      font-size: 0.8125rem;
      word-break: break-all;
    }
    .post-list { list-style: none; padding: 0; margin: 0; }
    .post-item {
      border-bottom: 1px solid #e5e5e5;
      padding: 1.25rem 0;
    }
    .post-item:last-child { border-bottom: none; }
    .post-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }
    .post-title a { color: #111; text-decoration: none; }
    .post-title a:hover { color: #f97316; }
    .post-meta {
      font-size: 0.8125rem;
      color: #888;
      margin-bottom: 0.5rem;
    }
    .post-description {
      color: #555;
      font-size: 0.9375rem;
      margin: 0;
    }
    @media (prefers-color-scheme: dark) {
      body { background: #111; color: #e5e5e5; }
      header { border-bottom-color: #333; }
      h1 { color: #fff; }
      .description { color: #999; }
      .subscribe-hint { background: #1a1a1a; border-color: #333; color: #999; }
      .subscribe-hint code { background: #222; }
      .post-item { border-bottom-color: #333; }
      .post-title a { color: #fff; }
      .post-description { color: #aaa; }
    }
  </style>
</head>
<body>
  <header>
    <span class="badge">RSS Feed</span>
    <h1>${ravConfig.title}</h1>
    <p class="description">${ravConfig.description}</p>
    <div class="subscribe-hint">
      <strong>如何订阅？</strong> 复制当前页面 URL 到你喜欢的 RSS 阅读器中即可订阅。
      <br>
      <code>${siteUrl}/rss.xml</code>
    </div>
  </header>
  <main>
    <ul class="post-list">${postItems}</ul>
  </main>
</body>
</html>`;
}

export async function GET(request: NextRequest) {
  const posts = getBlogPosts();
  const siteUrl = ravConfig.siteUrl.replace(/\/$/, '');

  // Check if browser is requesting HTML
  const acceptHeader = request.headers.get('accept') || '';
  const wantHtml =
    acceptHeader.includes('text/html') &&
    !acceptHeader.includes('application/rss+xml') &&
    !acceptHeader.includes('application/xml');

  const feedItems: Array<{
    title: string;
    link: string;
    description: string;
    date: Date;
  }> = [];

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

  for (const post of posts) {
    try {
      const cleanContent = processMdxComponents(post.content || '');
      const result = await processor.process(cleanContent);
      const renderedContent = String(result);
      const postDate = new Date(
        post.metadata.updatedAt || post.metadata.publishedAt,
      );

      feed.addItem({
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
      });

      feedItems.push({
        title: post.metadata.title,
        link: `${siteUrl}/blog/${post.slug}`,
        description: post.metadata.description,
        date: postDate,
      });
    } catch (error) {
      console.error(`Error processing post ${post.slug}:`, error);
    }
  }

  if (wantHtml) {
    return new Response(generateHtmlPage(feedItems, siteUrl), {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        Vary: 'Accept',
      },
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      Vary: 'Accept',
    },
  });
}
