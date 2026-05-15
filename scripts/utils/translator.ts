import { google } from '@ai-sdk/google';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { type LanguageModel, generateText } from 'ai';

import { parseFrontmatter, serializeFrontmatter } from './mdx-parser';

export type TranslationProvider = 'google' | 'onekey';

export interface TranslationOptions {
  provider?: TranslationProvider | string;
  model?: string;
  baseURL?: string;
  temperature?: number;
  maxRetries?: number;
}

export interface TranslationContext {
  provider: TranslationProvider;
  modelId: string;
  model: LanguageModel;
  temperature: number;
  maxRetries: number;
}

export interface TranslationResult {
  frontmatter: string;
  content: string;
}

const DEFAULT_GOOGLE_MODEL = 'gemini-2.5-flash';
const DEFAULT_ONEKEY_MODEL = 'gpt-5.5';
const DEFAULT_ONEKEY_BASE_URL = 'https://llm-api.onekeytest.com/v1';
const DEFAULT_ONEKEY_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const DEFAULT_TEMPERATURE = 0.2;
const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_CHUNK_SIZE = 6000;

function parseNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function resolveProvider(provider: string | undefined): TranslationProvider {
  const normalized = provider?.trim().toLowerCase();

  if (!normalized) return 'google';
  if (normalized === 'google' || normalized === 'onekey') return normalized;

  throw new Error(
    `Unsupported translation provider "${provider}". Use "google" or "onekey".`,
  );
}

export function createTranslationContext(
  options: TranslationOptions = {},
): TranslationContext {
  const provider = resolveProvider(
    options.provider ?? process.env.TRANSLATE_PROVIDER,
  );
  const modelId =
    options.model ??
    process.env.TRANSLATE_MODEL ??
    (provider === 'onekey' ? DEFAULT_ONEKEY_MODEL : DEFAULT_GOOGLE_MODEL);
  const temperature =
    options.temperature ??
    parseNumber(process.env.TRANSLATE_TEMPERATURE, DEFAULT_TEMPERATURE);
  const maxRetries =
    options.maxRetries ??
    parseNumber(process.env.TRANSLATE_MAX_RETRIES, DEFAULT_MAX_RETRIES);

  if (provider === 'onekey') {
    const apiKey = process.env.ONEKEY_LLM_API_KEY;
    if (!apiKey) {
      throw new Error('ONEKEY_LLM_API_KEY is required for OneKey translation.');
    }

    const baseURL =
      options.baseURL ??
      process.env.ONEKEY_LLM_BASE_URL ??
      DEFAULT_ONEKEY_BASE_URL;
    const oneKey = createOpenAICompatible({
      name: 'onekey',
      apiKey,
      baseURL,
      includeUsage: true,
      headers: {
        'User-Agent':
          process.env.ONEKEY_LLM_USER_AGENT ?? DEFAULT_ONEKEY_USER_AGENT,
        Accept: 'application/json, text/plain, */*',
      },
    });

    return {
      provider,
      modelId,
      model: oneKey(modelId),
      temperature,
      maxRetries,
    };
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error(
      'GOOGLE_GENERATIVE_AI_API_KEY is required for Google translation.',
    );
  }

  return {
    provider,
    modelId,
    model: google(modelId),
    temperature,
    maxRetries,
  };
}

async function translateText(
  text: string,
  prompt: string,
  context: TranslationContext,
): Promise<string> {
  const { text: translatedText } = await generateText({
    model: context.model,
    temperature: context.temperature,
    maxRetries: context.maxRetries,
    prompt: `${prompt}\n\n${text}`,
  });

  return translatedText.trim();
}

async function translateFrontmatter(
  frontmatter: string,
  context: TranslationContext,
): Promise<string> {
  const metadata = parseFrontmatter(frontmatter);
  const translatedMetadata: Record<string, unknown> = { ...metadata };
  const fieldsToTranslate = ['title', 'description'];

  await Promise.all(
    fieldsToTranslate.map(async (field) => {
      const value = metadata[field];
      if (typeof value !== 'string') return;

      console.log(`  Translating ${field}...`);
      translatedMetadata[field] = await translateText(
        value,
        `You are a professional English native translator. Translate the following text into fluent English.
Rules:
1. Output only the translated content, without explanations or labels.
2. Preserve the original paragraph count and Markdown formatting.
3. Preserve HTML tags, code, URLs, product names, and proper nouns unless translation is clearly needed.`,
        context,
      );
    }),
  );

  return serializeFrontmatter(translatedMetadata);
}

function protectContent(content: string): {
  content: string;
  restore: (translatedContent: string) => string;
} {
  const protectedValues: string[] = [];
  const protect = (value: string) => {
    const token = `__RAV_TRANSLATION_PROTECTED_${protectedValues.length}__`;
    protectedValues.push(value);
    return token;
  };

  const protectedContent = content
    .replace(/```[\s\S]*?```/g, protect)
    .replace(/data:[^\s)]+/g, protect);

  return {
    content: protectedContent,
    restore: (translatedContent: string) =>
      protectedValues.reduce(
        (result, value, index) =>
          result.replaceAll(`__RAV_TRANSLATION_PROTECTED_${index}__`, value),
        translatedContent,
      ),
  };
}

function splitIntoChunks(content: string): string[] {
  const chunkSize = parseNumber(
    process.env.TRANSLATE_CHUNK_SIZE,
    DEFAULT_CHUNK_SIZE,
  );
  const blocks = content.split(/\n{2,}/);
  const chunks: string[] = [];
  let currentChunk = '';

  for (const block of blocks) {
    const nextChunk = currentChunk ? `${currentChunk}\n\n${block}` : block;

    if (currentChunk && nextChunk.length > chunkSize) {
      chunks.push(currentChunk);
      currentChunk = block;
    } else {
      currentChunk = nextChunk;
    }
  }

  if (currentChunk) chunks.push(currentChunk);

  return chunks;
}

async function translateContent(
  content: string,
  context: TranslationContext,
): Promise<string> {
  const { content: protectedContent, restore } = protectContent(content);
  const chunks = splitIntoChunks(protectedContent);

  console.log(
    `  Translating content${chunks.length > 1 ? ` (${chunks.length} chunks)` : ''}...`,
  );

  const prompt = `You are a professional translator. Translate the following MDX/Markdown content from Chinese to English.

IMPORTANT RULES:
1. Preserve ALL placeholder tokens like __RAV_TRANSLATION_PROTECTED_0__ exactly as they are.
2. Preserve ALL URLs and links exactly as they are.
3. Preserve ALL MDX/Markdown syntax, headings, lists, tables, emphasis, and frontmatter-like examples.
4. Preserve ALL HTML tags and MDX components.
5. Only translate natural language text.
6. Keep the same structure and formatting.
7. Do not add explanations, comments, or wrappers.`;

  const translatedChunks = await Promise.all(
    chunks.map((chunk) => translateText(chunk, prompt, context)),
  );

  return restore(translatedChunks.join('\n\n'));
}

export async function translateMDX(
  frontmatter: string,
  content: string,
  context: TranslationContext,
): Promise<TranslationResult> {
  const [translatedFrontmatter, translatedContent] = await Promise.all([
    translateFrontmatter(frontmatter, context),
    translateContent(content, context),
  ]);

  return {
    frontmatter: translatedFrontmatter,
    content: translatedContent,
  };
}
