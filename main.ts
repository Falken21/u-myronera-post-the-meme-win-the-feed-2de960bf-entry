// Entry program for the make.fun meme-on-X bounty
// "Post the Meme, Win the Feed"
// (u-myronera-post-the-meme-win-the-feed-2de960bf).
//
// The entry itself is the X post: this program only hands the post's address
// to the grader. It copies POST.json from the bot directory to the output
// directory, byte for byte, and exits silently on success.
//
// Local run (mirrors the grader):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

const source = join(BOT_DIR, 'POST.json');
const target = join(OUTPUT_DIR, 'POST.json');

try {
  copyFileSync(source, target);
  // Fail fast when the handed-in address is not valid JSON: the gate reads
  // POST.json as a JSON object, so a broken file is an invalid entry.
  JSON.parse(readFileSync(target, 'utf8'));
} catch (err) {
  console.error(`Could not copy POST.json from ${source}: ${(err as Error).message}`);
  process.exit(1);
}
