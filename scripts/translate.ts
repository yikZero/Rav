import 'dotenv/config';
import fs from 'fs';
import path from 'path';

import { calculateFileHash } from './utils/file-hash';
import { parseFrontmatter, parseMDX, reconstructMDX } from './utils/mdx-parser';
import {
  loadState,
  needsTranslation,
  saveState,
  updateFileState,
} from './utils/state-manager';
import {
  type TranslationOptions,
  createTranslationContext,
  translateMDX,
} from './utils/translator';

const SOURCE_DIR = path.join(process.cwd(), 'content', 'posts', 'zh-CN');
const TARGET_DIR = path.join(process.cwd(), 'content', 'posts', 'en');
const DEFAULT_CONCURRENCY = 2;

interface CLIOptions {
  force: boolean;
  concurrency: number;
  file?: string;
  translation: TranslationOptions;
}

type TranslateResult =
  | 'success'
  | 'skipped-no-change'
  | 'skipped-draft'
  | 'error';

interface TranslateFileResult {
  filename: string;
  result: TranslateResult;
  hash?: string;
}

function readFlagValue(args: string[], index: number, name: string) {
  const arg = args[index];
  const inlineValue = arg.slice(name.length + 3);

  if (arg.startsWith(`--${name}=`)) return inlineValue;

  const nextValue = args[index + 1];
  if (!nextValue || nextValue.startsWith('--')) {
    throw new Error(`Missing value for --${name}`);
  }

  return nextValue;
}

function parsePositiveInteger(value: string | undefined, fallback: number) {
  if (!value) return fallback;

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseArgs(): CLIOptions {
  const args = process.argv.slice(2);
  const options: CLIOptions = {
    force: false,
    concurrency: parsePositiveInteger(
      process.env.TRANSLATE_CONCURRENCY,
      DEFAULT_CONCURRENCY,
    ),
    translation: {},
  };

  for (let index = 0; index < args.length; index++) {
    const arg = args[index];

    if (arg === '--force') {
      options.force = true;
      continue;
    }

    if (arg === '--provider' || arg.startsWith('--provider=')) {
      options.translation.provider = readFlagValue(args, index, 'provider');
      if (arg === '--provider') index++;
      continue;
    }

    if (arg === '--model' || arg.startsWith('--model=')) {
      options.translation.model = readFlagValue(args, index, 'model');
      if (arg === '--model') index++;
      continue;
    }

    if (arg === '--base-url' || arg.startsWith('--base-url=')) {
      options.translation.baseURL = readFlagValue(args, index, 'base-url');
      if (arg === '--base-url') index++;
      continue;
    }

    if (arg === '--concurrency' || arg.startsWith('--concurrency=')) {
      options.concurrency = parsePositiveInteger(
        readFlagValue(args, index, 'concurrency'),
        options.concurrency,
      );
      if (arg === '--concurrency') index++;
      continue;
    }

    if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    }

    options.file = arg;
  }

  return options;
}

async function translateFile(
  filename: string,
  force: boolean,
  context: ReturnType<typeof createTranslationContext>,
): Promise<TranslateFileResult> {
  const sourcePath = path.join(SOURCE_DIR, filename);
  const targetPath = path.join(TARGET_DIR, filename);

  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Source file not found: ${filename}`);
    return { filename, result: 'error' };
  }

  try {
    const { frontmatter, content } = parseMDX(sourcePath);
    const metadata = parseFrontmatter(frontmatter);

    if (metadata.state === 'draft') {
      console.log(`📝 Skipping ${filename} (draft state)`);
      return { filename, result: 'skipped-draft' };
    }

    const currentHash = calculateFileHash(sourcePath);
    const state = loadState();

    if (!force && !needsTranslation(filename, currentHash, state)) {
      console.log(`⏭️  Skipping ${filename} (no changes)`);
      return { filename, result: 'skipped-no-change' };
    }

    console.log(`\n🔄 Translating ${filename}...`);

    const { frontmatter: translatedFrontmatter, content: translatedContent } =
      await translateMDX(frontmatter, content, context);
    const translatedMDX = reconstructMDX(
      translatedFrontmatter,
      translatedContent,
    );

    if (!fs.existsSync(TARGET_DIR)) {
      fs.mkdirSync(TARGET_DIR, { recursive: true });
    }

    fs.writeFileSync(targetPath, translatedMDX);

    console.log(`✅ Successfully translated ${filename}`);
    return { filename, result: 'success', hash: currentHash };
  } catch (error) {
    console.error(`❌ Error translating ${filename}:`, error);
    return { filename, result: 'error' };
  }
}

async function runWithConcurrency(
  files: string[],
  concurrency: number,
  worker: (file: string) => Promise<void>,
) {
  let nextIndex = 0;

  async function runWorker() {
    while (nextIndex < files.length) {
      const file = files[nextIndex];
      nextIndex++;
      await worker(file);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, files.length) },
    runWorker,
  );
  await Promise.all(workers);
}

async function main() {
  const options = parseArgs();

  console.log('🚀 Starting translation process...\n');

  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  const context = createTranslationContext(options.translation);
  console.log(
    `🤖 Provider: ${context.provider}, model: ${context.modelId}, concurrency: ${options.concurrency}\n`,
  );

  let filesToTranslate: string[];

  if (options.file) {
    if (!options.file.endsWith('.mdx')) {
      options.file += '.mdx';
    }
    filesToTranslate = [options.file];
  } else {
    filesToTranslate = fs
      .readdirSync(SOURCE_DIR)
      .filter((file) => file.endsWith('.mdx'));
  }

  console.log(`📝 Found ${filesToTranslate.length} file(s) to process\n`);

  let state = loadState();
  const summary: Record<TranslateResult, number> = {
    success: 0,
    'skipped-no-change': 0,
    'skipped-draft': 0,
    error: 0,
  };

  await runWithConcurrency(
    filesToTranslate,
    options.concurrency,
    async (file) => {
      const result = await translateFile(file, options.force, context);
      summary[result.result]++;

      if (result.result === 'success' && result.hash) {
        state = updateFileState(state, result.filename, result.hash);
        saveState(state);
      }
    },
  );

  console.log('\n' + '='.repeat(50));
  console.log('📊 Translation Summary:');
  console.log(`   ✅ Successfully translated: ${summary.success}`);
  console.log(`   ⏭️  Skipped (no changes): ${summary['skipped-no-change']}`);
  console.log(`   📝 Skipped (draft): ${summary['skipped-draft']}`);
  console.log(`   ❌ Errors: ${summary.error}`);
  console.log('='.repeat(50));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
