import crypto from 'crypto';
import fs from 'fs';

/**
 * Calculate MD5 hash of a file
 */
export function calculateFileHash(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('md5');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}
