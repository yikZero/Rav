import fs from 'fs';

export interface MDXContent {
  frontmatter: string;
  content: string;
  raw: string;
}

/**
 * Parse MDX file into frontmatter and content
 */
export function parseMDX(filePath: string): MDXContent {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(raw);

  if (!match) {
    throw new Error(`Invalid MDX format in ${filePath}`);
  }

  return {
    frontmatter: match[1].trim(),
    content: match[2].trim(),
    raw,
  };
}

/**
 * Parse frontmatter into key-value pairs
 */
export function parseFrontmatter(frontmatter: string): Record<string, string> {
  const metadata: Record<string, string> = {};
  const lines = frontmatter.trim().split('\n');

  lines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ');
    if (!key) return;

    let value = valueArr.join(': ').trim();
    // Remove quotes
    value = value.replace(/^['"](.*)['"]$/, '$1');
    metadata[key.trim()] = value;
  });

  return metadata;
}

/**
 * Reconstruct MDX file from frontmatter and content
 */
export function reconstructMDX(frontmatter: string, content: string): string {
  return `---\n${frontmatter}\n---\n\n${content}\n`;
}
