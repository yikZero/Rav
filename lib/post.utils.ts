import fs from 'fs';
import path from 'path';

export type PostMetadata = {
  title: string;
  titleEn: string;
  publishedAt: string;
  updatedAt?: string;
  description: string;
  descriptionEn: string;
  image: string;
  category: string;
  state: 'draft' | 'published' | 'archived';
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

function getMDFiles(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((file) => ['.md', '.mdx'].includes(path.extname(file)));
}

function readMDFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function getMDData(dir: string) {
  const mdxFiles = getMDFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts({ filterPublished = true } = {}) {
  const data = getMDData(path.join(process.cwd(), 'content', 'posts'));
  const filteredData = filterPublished
    ? data.filter((item) => item.metadata.state === 'published')
    : data;

  return filteredData.sort((a, b) => {
    const dateA = new Date(a.metadata.publishedAt);
    const dateB = new Date(b.metadata.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });
}
