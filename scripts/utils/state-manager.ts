import fs from 'fs';
import path from 'path';

export interface TranslationState {
  [filename: string]: {
    hash: string;
    lastTranslated: string;
  };
}

const STATE_FILE = path.join(
  process.cwd(),
  'scripts',
  'translate-state.json',
);

/**
 * Load translation state
 */
export function loadState(): TranslationState {
  if (!fs.existsSync(STATE_FILE)) {
    return {};
  }
  const content = fs.readFileSync(STATE_FILE, 'utf-8');
  return JSON.parse(content);
}

/**
 * Save translation state
 */
export function saveState(state: TranslationState): void {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

/**
 * Check if file needs translation
 */
export function needsTranslation(
  filename: string,
  currentHash: string,
  state: TranslationState,
): boolean {
  const fileState = state[filename];
  if (!fileState) {
    return true; // New file
  }
  return fileState.hash !== currentHash; // Hash changed
}

/**
 * Update file state
 */
export function updateFileState(
  state: TranslationState,
  filename: string,
  hash: string,
): TranslationState {
  return {
    ...state,
    [filename]: {
      hash,
      lastTranslated: new Date().toISOString(),
    },
  };
}
