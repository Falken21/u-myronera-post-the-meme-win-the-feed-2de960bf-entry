// Entry program for the make.fun bounty "Post the Meme, Win the Feed".
//
// The whole deliverable of this bounty is one X post, recorded in
// POST.json next to this file. The grader does not run a game or a
// simulation here; it only needs that JSON handed over cleanly. So this
// program does one small job: take POST.json from the bot directory and
// place a copy of it in the output directory, untouched, so the house
// can read which post to score.
//
// Where the two directories live is configurable through the
// environment (MAKEFUN_BOT_DIR / MAKEFUN_OUTPUT_DIR) and falls back to
// the standard locations, /bot for the bot's own files and /output for
// results the grader collects.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourcePath = join(BOT_DIR, "POST.json");
const targetPath = join(OUTPUT_DIR, "POST.json");

// The output directory may not exist yet on a fresh run; create it
// (and any parents) before writing into it.
mkdirSync(OUTPUT_DIR, { recursive: true });

// Copy the file as-is: the grader compares and parses the copy, so the
// bytes must survive the trip exactly as the bot wrote them. Then read
// the copy back and make sure it parses as a JSON object holding a
// string "url". A missing file, an unreadable copy, or JSON that does
// not parse means the entry is worthless to the grader, so any failure
// along the way aborts the run with exit code 1 instead of quietly
// handing over a broken deliverable.
try {
  copyFileSync(sourcePath, targetPath);

  const copied = readFileSync(targetPath, "utf8");
  const parsed: unknown = JSON.parse(copied);
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    typeof (parsed as { url?: unknown }).url !== "string"
  ) {
    throw new Error("POST.json must be a JSON object with a string \"url\"");
  }
} catch (err) {
  console.error(
    `Could not deliver POST.json from ${sourcePath}: ${
      err instanceof Error ? err.message : String(err)
    }`,
  );
  process.exit(1);
}
