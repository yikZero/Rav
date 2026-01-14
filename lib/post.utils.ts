import { defaultLocale } from '@/i18n/routing';
import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import { parse as parseYaml } from 'yaml';

export type PostMetadata = {
  title: string;
  publishedAt: string;
  updatedAt?: string;
  description: string;
  image: string;
  category: string;
  state: 'draft' | 'published' | 'archived';
};

export type Post = {
  metadata: PostMetadata;
  slug: string;
  content: string;
};

function parseFrontmatterFallback(frontMatterBlock: string): PostMetadata {
  const metadata: Partial<PostMetadata> = {};
  const lines = frontMatterBlock.trim().split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    value = value.replace(/^['"](.*)['"]$/, '$1');

    if (key && value) {
      (metadata as Record<string, string>)[key] = value;
    }
  }

  return metadata as PostMetadata;
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    throw new Error('No frontmatter found in file');
  }

  const frontMatterBlock = match[1];
  const content = fileContent.slice(match[0].length).trim();

  let metadata: PostMetadata;
  try {
    metadata = parseYaml(frontMatterBlock) as PostMetadata;
  } catch {
    // Fallback to simple line-based parsing for malformed YAML
    metadata = parseFrontmatterFallback(frontMatterBlock);
  }

  return { metadata, content };
}

function getMDXFiles(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((file) => ['.md', '.mdx'].includes(path.extname(file)));
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const mdxFiles = getMDXFiles(dir);
  return mdxFiles
    .map((file) => {
      try {
        const filePath = path.join(dir, file);
        const { metadata, content } = readMDXFile(filePath);
        const slug = path.basename(file, path.extname(file));

        return {
          metadata,
          slug,
          content,
        };
      } catch (error) {
        console.warn(
          `Warning: Skipping file ${file} due to parsing error:`,
          error instanceof Error ? error.message : error
        );
        return null;
      }
    })
    .filter((post): post is Post => post !== null);
}

export const getBlogPosts = cache(function getBlogPosts({
  filterPublished = true,
  language = defaultLocale,
} = {}) {
  const postsDir = path.join(process.cwd(), 'content', 'posts', language);

  // Only load posts for the requested language
  const posts = getMDXData(postsDir);

  // In development environment, show all posts including drafts
  const isDevelopment = process.env.NODE_ENV === 'development';
  const shouldFilter = filterPublished && !isDevelopment;

  const filteredData = shouldFilter
    ? posts.filter((item) => item.metadata.state === 'published')
    : posts;

  return filteredData.sort((a, b) => {
    const dateA = new Date(a.metadata.publishedAt);
    const dateB = new Date(b.metadata.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });
});
