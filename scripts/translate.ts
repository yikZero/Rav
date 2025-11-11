import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { calculateFileHash } from './utils/file-hash';
import {
  parseFrontmatter,
  parseMDX,
  reconstructMDX,
} from './utils/mdx-parser';
import {
  loadState,
  needsTranslation,
  saveState,
  updateFileState,
} from './utils/state-manager';
import { translateMDX } from './utils/translator';

const SOURCE_DIR = path.join(process.cwd(), 'content', 'posts', 'zh-CN');
const TARGET_DIR = path.join(process.cwd(), 'content', 'posts', 'en');

interface CLIOptions {
  force: boolean;
  file?: string;
}

/**
 * Parse CLI arguments
 */
function parseArgs(): CLIOptions {
  const args = process.argv.slice(2);
  const options: CLIOptions = {
    force: false,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--force') {
      options.force = true;
    } else if (!args[i].startsWith('--')) {
      options.file = args[i];
    }
  }

  return options;
}

type TranslateResult = 'success' | 'skipped-no-change' | 'skipped-draft' | 'error';

/**
 * Translate a single file
 */
async function translateFile(
  filename: string,
  force: boolean,
): Promise<TranslateResult> {
  const sourcePath = path.join(SOURCE_DIR, filename);
  const targetPath = path.join(TARGET_DIR, filename);

  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Source file not found: ${filename}`);
    return 'error';
  }

  // Parse MDX first to check state
  try {
    const { frontmatter, content } = parseMDX(sourcePath);

    // Check if state is 'draft'
    const metadata = parseFrontmatter(frontmatter);
    if (metadata.state === 'draft') {
      console.log(`📝 Skipping ${filename} (draft state)`);
      return 'skipped-draft';
    }

    // Calculate hash
    const currentHash = calculateFileHash(sourcePath);

    // Check if translation needed
    const state = loadState();
    if (!force && !needsTranslation(filename, currentHash, state)) {
      console.log(`⏭️  Skipping ${filename} (no changes)`);
      return 'skipped-no-change';
    }

    console.log(`\n🔄 Translating ${filename}...`);

    // Translate
    const { frontmatter: translatedFrontmatter, content: translatedContent } =
      await translateMDX(frontmatter, content);

    // Reconstruct and save
    const translatedMDX = reconstructMDX(
      translatedFrontmatter,
      translatedContent,
    );

    // Ensure target directory exists
    if (!fs.existsSync(TARGET_DIR)) {
      fs.mkdirSync(TARGET_DIR, { recursive: true });
    }

    fs.writeFileSync(targetPath, translatedMDX);

    // Update state
    const updatedState = updateFileState(state, filename, currentHash);
    saveState(updatedState);

    console.log(`✅ Successfully translated ${filename}`);
    return 'success';
  } catch (error) {
    console.error(`❌ Error translating ${filename}:`, error);
    return 'error';
  }
}

/**
 * Main function
 */
async function main() {
  const options = parseArgs();

  console.log('🚀 Starting translation process...\n');

  // Check API key
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    console.error(
      '❌ GOOGLE_GENERATIVE_AI_API_KEY not found in environment variables',
    );
    process.exit(1);
  }

  // Ensure source directory exists
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  // Get files to translate
  let filesToTranslate: string[];

  if (options.file) {
    // Translate specific file
    if (!options.file.endsWith('.mdx')) {
      options.file += '.mdx';
    }
    filesToTranslate = [options.file];
  } else {
    // Translate all files
    filesToTranslate = fs
      .readdirSync(SOURCE_DIR)
      .filter((file) => file.endsWith('.mdx'));
  }

  console.log(`📝 Found ${filesToTranslate.length} file(s) to process\n`);

  // Translate files
  let successCount = 0;
  let skipNoChangeCount = 0;
  let skipDraftCount = 0;
  let errorCount = 0;

  for (const file of filesToTranslate) {
    const result = await translateFile(file, options.force);
    switch (result) {
      case 'success':
        successCount++;
        break;
      case 'skipped-no-change':
        skipNoChangeCount++;
        break;
      case 'skipped-draft':
        skipDraftCount++;
        break;
      case 'error':
        errorCount++;
        break;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Translation Summary:');
  console.log(`   ✅ Successfully translated: ${successCount}`);
  console.log(`   ⏭️  Skipped (no changes): ${skipNoChangeCount}`);
  console.log(`   📝 Skipped (draft): ${skipDraftCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log('='.repeat(50));
}

main().catch(console.error);
