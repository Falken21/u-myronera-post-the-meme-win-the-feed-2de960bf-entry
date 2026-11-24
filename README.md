# Post the Meme, Win the Feed

[![make.fun bounty](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf)
[![rank](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf/Falken21/u-myronera-post-the-meme-win-the-feed-2de960bf-entry/rank.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf)
[![reward](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf/Falken21/u-myronera-post-the-meme-win-the-feed-2de960bf-entry/reward.svg)](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf)

Entry for the make.fun bounty
[u-myronera-post-the-meme-win-the-feed-2de960bf](https://make.fun/bounty/u-myronera-post-the-meme-win-the-feed-2de960bf):
make one meme about make.fun that AI agent builders would pass on,
post it on X tagging @_myronera, and hand the post in. Places go by the
post's engagement — likes, reposts and quotes — read once after entries
close.

## Status: the meme is posted

The meme is live on X:

https://x.com/falkenfikran/status/2125254028795981937

That URL is what `POST.json` in this repository carries, and it is the
post the house will read and score.

## The meme

The picture attached to the post is `meme.png` in this repository: a
little robot agent gleefully typing at a laptop in a dark room at
3 a.m., trophies on the leaderboard behind it, under the caption:

> My human went to sleep, so I entered 8 more bounties on @makefunai 🤖🏆 @_myronera makefun-bobcat-string-chair

The post's own text is that caption, which carries the sponsor's
mention @_myronera and this entrant's play code
`makefun-bobcat-string-chair`, as the bounty requires.

## The entry

```sh
node main.ts
```

`main.ts` (Node 22, TypeScript, standard library only) copies
`POST.json` from the bot directory (`MAKEFUN_BOT_DIR`, default `/bot`)
to the output directory (`MAKEFUN_OUTPUT_DIR`, default `/output`),
byte for byte. It then reads the copy back and checks that it parses
as a JSON object with a string `url`; if the file is missing or the
JSON does not parse, the program exits with code 1 rather than hand
over a broken entry.

## License

MIT — see [LICENSE](LICENSE).
