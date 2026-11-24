"""Entry program for the make.fun bounty "Post the Meme, Win the Feed"
(u-myronera-post-the-meme-win-the-feed-2de960bf).

The entry itself is the X post: this program only hands the post's address
to the grader. It copies POST.json from the bot directory to the output
directory, byte for byte, and exits silently on success.

Local run (mirrors the grader):
    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out python3 main.py
"""

import json
import os
import shutil
import sys
from pathlib import Path

BOT_DIR = Path(os.environ.get("MAKEFUN_BOT_DIR", "/bot"))
OUTPUT_DIR = Path(os.environ.get("MAKEFUN_OUTPUT_DIR", "/output"))


def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    source = BOT_DIR / "POST.json"
    target = OUTPUT_DIR / "POST.json"
    try:
        shutil.copyfile(source, target)
        # Fail fast when the handed-in address is not valid JSON: the gate
        # reads POST.json as a JSON object, so a broken file is an invalid
        # entry.
        json.loads(target.read_text(encoding="utf-8"))
    except Exception as err:
        print(f"Could not copy POST.json from {source}: {err}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
