import fs from 'fs';
import path from 'path';

import { defaultLocale, locales } from '../i18n/routing';
import { parseFrontmatter, parseMDX } from './utils/mdx-parser';

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'posts');
const SOURCE_LOCALE = defaultLocale;
const TARGET_LOCALES = locales.filter((locale) => locale !== SOURCE_LOCALE);
const MDX_EXTENSION = '.mdx';
const REQUIRED_FIELDS = [
  'title',
  'publishedAt',
  'description',
  'image',
  'category',
  'state',
] as const;
const MIRRORED_FIELDS = [
  'publishedAt',
  'updatedAt',
  'image',
  'category',
  'state',
] as const;

type Locale = (typeof locales)[number];
type Metadata = Record<string, unknown>;

interface PostFile {
  filename: string;
  filePath: string;
  metadata: Metadata;
}

const errors: string[] = [];

function normalize(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value ?? '');
}

function readPosts(locale: Locale): Map<string, PostFile> {
  const dir = path.join(CONTENT_ROOT, locale);
  const posts = new Map<string, PostFile>();

  if (!fs.existsSync(dir)) {
    errors.push(`Missing content directory: ${dir}`);
    return posts;
  }

  for (const filename of fs.readdirSync(dir)) {
    if (filename.startsWith('.')) continue;

    const extension = path.extname(filename);
    if (extension === '.md') {
      errors.push(`Use .mdx instead of .md: ${path.join(dir, filename)}`);
      continue;
    }

    if (extension !== MDX_EXTENSION) continue;

    const filePath = path.join(dir, filename);
    try {
      const { frontmatter } = parseMDX(filePath);
      const metadata = parseFrontmatter(frontmatter);
      posts.set(path.basename(filename, MDX_EXTENSION), {
        filename,
        filePath,
        metadata,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`Invalid MDX file ${filePath}: ${message}`);
    }
  }

  return posts;
}

function requireFields(post: PostFile) {
  for (const field of REQUIRED_FIELDS) {
    if (normalize(post.metadata[field]) === '') {
      errors.push(`Missing frontmatter field "${field}" in ${post.filePath}`);
    }
  }
}

function compareMirroredFields(source: PostFile, target: PostFile) {
  for (const field of MIRRORED_FIELDS) {
    const sourceValue = normalize(source.metadata[field]);
    const targetValue = normalize(target.metadata[field]);

    if (sourceValue !== targetValue) {
      errors.push(
        `Mismatched "${field}" for ${target.filename}: ${sourceValue || '(empty)'} != ${targetValue || '(empty)'}`,
      );
    }
  }
}

const sourcePosts = readPosts(SOURCE_LOCALE);
const publishedSourcePosts = [...sourcePosts.entries()].filter(
  ([, post]) => normalize(post.metadata.state) === 'published',
);

for (const [, post] of publishedSourcePosts) {
  requireFields(post);
}

for (const locale of TARGET_LOCALES) {
  const targetPosts = readPosts(locale);

  for (const [slug, sourcePost] of publishedSourcePosts) {
    const targetPost = targetPosts.get(slug);

    if (!targetPost) {
      errors.push(
        `Missing ${locale} translation for published post: ${slug}.mdx`,
      );
      continue;
    }

    requireFields(targetPost);
    compareMirroredFields(sourcePost, targetPost);
  }

  for (const [slug, targetPost] of targetPosts) {
    const sourcePost = sourcePosts.get(slug);
    const targetState = normalize(targetPost.metadata.state);
    const sourceState = normalize(sourcePost?.metadata.state);

    if (targetState !== 'published') continue;

    if (!sourcePost) {
      errors.push(`Published ${locale} post has no source file: ${slug}.mdx`);
      continue;
    }

    if (sourceState !== 'published') {
      errors.push(
        `Published ${locale} post points to non-published source: ${slug}.mdx`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error('Content check failed:\n');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Content check passed: ${publishedSourcePosts.length} published ${SOURCE_LOCALE} posts have mirrored translations.`,
);
