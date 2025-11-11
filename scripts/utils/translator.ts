import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

import { parseFrontmatter } from './mdx-parser';

export interface TranslationResult {
  frontmatter: string;
  content: string;
}

/**
 * Translate frontmatter fields
 */
async function translateFrontmatter(frontmatter: string): Promise<string> {
  const metadata = parseFrontmatter(frontmatter);
  const translatedMetadata: Record<string, string> = { ...metadata };

  // Translate title and description
  const fieldsToTranslate = ['title', 'description'];

  for (const field of fieldsToTranslate) {
    if (metadata[field]) {
      console.log(`  Translating ${field}...`);
      const { text } = await generateText({
        model: google('gemini-2.5-pro'),
        prompt: `You are a professional English native translator who needs to fluently translate text into English. 
        1. Output only the translated content, without explanations or additional content (such as "Here's the translation:" or "Translation as follows:")
      2. The returned translation must maintain exactly the same number of paragraphs and format as the original text
      3. If the text contains HTML tags, consider where the tags should be placed in the translation while maintaining fluency
      4. For content that should not be translated (such as proper nouns, code, etc.), keep the original text
      5. You need to output it to me in the original format. What I provide is Markdown text, and you also need to provide Markdown text:\n\n${metadata[field]}`,
      });
      translatedMetadata[field] = text.trim();
    }
  }

  // Reconstruct frontmatter
  const lines = Object.entries(translatedMetadata).map(
    ([key, value]) => `${key}: '${value}'`,
  );
  return lines.join('\n');
}

/**
 * Translate MDX content while preserving code blocks and structure
 */
async function translateContent(content: string): Promise<string> {
  console.log('  Translating content...');

  const { text } = await generateText({
    model: google('gemini-2.0-flash-exp'),
    prompt: `You are a professional translator. Translate the following MDX/Markdown content from Chinese to English.

IMPORTANT RULES:
1. Preserve ALL code blocks exactly as they are (don't translate code)
2. Preserve ALL URLs and links exactly as they are
3. Preserve ALL MDX/Markdown syntax (headers, lists, bold, italic, etc.)
4. Preserve ALL HTML tags if any
5. Only translate the natural language text
6. Keep the same structure and formatting
7. Don't add any explanations or comments

Content to translate:

${content}`,
  });

  return text.trim();
}

/**
 * Translate entire MDX document
 */
export async function translateMDX(
  frontmatter: string,
  content: string,
): Promise<TranslationResult> {
  const [translatedFrontmatter, translatedContent] = await Promise.all([
    translateFrontmatter(frontmatter),
    translateContent(content),
  ]);

  return {
    frontmatter: translatedFrontmatter,
    content: translatedContent,
  };
}
