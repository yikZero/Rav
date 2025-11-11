import { defaultLocale } from '@/i18n/routing';
import fs from 'fs';
import path from 'path';

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

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock.trim().split('\n');
  const metadata: Partial<PostMetadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ');
    if (!key) return;

    let value = valueArr.join(': ').trim();
    value = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
    // @ts-expect-error Type 'string' is not assignable to type 'never' due to dynamic key access
    metadata[key.trim() as keyof PostMetadata] = value;
  });

  return {
    metadata: metadata as PostMetadata,
    content,
  };
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
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts({
  filterPublished = true,
  language = defaultLocale,
} = {}) {
  const postsDir = path.join(process.cwd(), 'content', 'posts', language);

  // Only load posts for the requested language
  const posts = getMDXData(postsDir);

  const filteredData = filterPublished
    ? posts.filter((item) => item.metadata.state === 'published')
    : posts;

  return filteredData.sort((a, b) => {
    const dateA = new Date(a.metadata.publishedAt);
    const dateB = new Date(b.metadata.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });
}
