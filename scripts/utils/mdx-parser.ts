import fs from 'fs';

import yaml from 'yaml';

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
 * Parse frontmatter string into key-value pairs using yaml library
 */
export function parseFrontmatter(
  frontmatter: string,
): Record<string, unknown> {
  return yaml.parse(frontmatter) || {};
}

/**
 * Serialize metadata object back to frontmatter string
 */
export function serializeFrontmatter(metadata: Record<string, unknown>): string {
  return yaml.stringify(metadata, { singleQuote: true }).trim();
}

/**
 * Reconstruct MDX file from frontmatter and content
 */
export function reconstructMDX(frontmatter: string, content: string): string {
  return `---\n${frontmatter}\n---\n\n${content}\n`;
}
