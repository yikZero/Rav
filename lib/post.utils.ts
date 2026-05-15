import { defaultLocale } from '@/i18n/routing';
import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import { parse as parseYaml } from 'yaml';

export interface PostMetadata {
  title: string;
  publishedAt: string;
  updatedAt?: string;
  description: string;
  image: string;
  category: string;
  state: 'draft' | 'published' | 'archived';
}

export interface Post {
  metadata: PostMetadata;
  slug: string;
  content: string;
}

function parseFrontmatterFallback(frontMatterBlock: string): PostMetadata {
  const lines = frontMatterBlock.trim().split('\n');
  const metadata: Record<string, string> = {};

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const value = line
      .slice(colonIndex + 1)
      .trim()
      .replace(/^['"](.*)['"]$/, '$1');

    if (key && value) {
      metadata[key] = value;
    }
  }

  return metadata as unknown as PostMetadata;
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

const MDX_EXTENSIONS = ['.mdx'];

function getMDXFiles(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((file) => MDX_EXTENSIONS.includes(path.extname(file)));
}

function readMDXFile(filePath: string): {
  metadata: PostMetadata;
  content: string;
} {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string): Post[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const mdxFiles = getMDXFiles(dir);
  const posts: Post[] = [];

  for (const file of mdxFiles) {
    try {
      const filePath = path.join(dir, file);
      const { metadata, content } = readMDXFile(filePath);
      const slug = path.basename(file, path.extname(file));
      posts.push({ metadata, slug, content });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(
        `Warning: Skipping file ${file} due to parsing error: ${message}`,
      );
    }
  }

  return posts;
}

interface GetBlogPostsOptions {
  filterPublished?: boolean;
  language?: string;
  limit?: number;
}

export const getBlogPosts = cache(function getBlogPosts({
  filterPublished = true,
  language = defaultLocale,
  limit,
}: GetBlogPostsOptions = {}): Post[] {
  const postsDir = path.join(process.cwd(), 'content', 'posts', language);
  const posts = getMDXData(postsDir);

  const isDevelopment = process.env.NODE_ENV === 'development';
  const shouldFilter = filterPublished && !isDevelopment;

  const filteredPosts = shouldFilter
    ? posts.filter((post) => post.metadata.state === 'published')
    : posts;

  const sortedPosts = filteredPosts.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  return limit ? sortedPosts.slice(0, limit) : sortedPosts;
});
