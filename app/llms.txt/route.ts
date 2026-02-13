import ravConfig from '@/rav.config';
import messages from '@/messages/en.json';

import { getBlogPosts } from '@/lib/post.utils';
import { categoryLabels, stackCategories, stackItems } from '@/lib/stack';

export async function GET() {
  let posts: ReturnType<typeof getBlogPosts> = [];
  try {
    posts = getBlogPosts({ language: 'en' });
  } catch (error) {
    console.error('Failed to load blog posts for llms.txt:', error);
  }
  const siteUrl = ravConfig.siteUrl.replace(/\/$/, '');

  const about = messages.About;
  const experience = [about.experience.onekey, about.experience.asiainfo, about.experience.zjut]
    .map((exp) => `- ${exp.title} (${exp.time}): ${exp.description}`)
    .join('\n');

  const lines: string[] = [
    `# ${ravConfig.title}`,
    '',
    `> ${ravConfig.description}`,
    '',
    '## Experience',
    '',
    experience,
    '',
    '## Stack',
    '',
    ...stackCategories.flatMap((category) => {
      const items = stackItems.filter((item) => item.category === category);
      if (items.length === 0) return [];
      return [
        `### ${categoryLabels[category].en}`,
        '',
        ...items.map((item) =>
          item.link
            ? `- [${item.name}](${item.link}): ${item.description.en}`
            : `- ${item.name}: ${item.description.en}`,
        ),
        '',
      ];
    }),
    '## Blog Posts',
    '',
    'All blog post URLs support content negotiation with the `Accept: text/markdown` header to retrieve raw Markdown content.',
    '',
    ...posts.map(
      (post) =>
        `- [${post.metadata.title}](${siteUrl}/blog/${post.slug}): ${post.metadata.description}`,
    ),
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
