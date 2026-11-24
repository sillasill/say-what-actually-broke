// make.fun — "Say What Actually Broke"
// Writes one line of software error copy to /output/entry.txt:
// the claimed outage, the real failure, and what to do next.
// Deterministic: the text is a constant. No randomness, no clock, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TEXT =
  "Nothing is down. The 2 a.m. deploy renamed the table your login needs, and the status page still says green because it only checks itself. Roll it back.";

// The gate requires UTF-8 text of 1-200 characters, a single line.
if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error(`TEXT must be 1-200 characters, got ${TEXT.length}`);
}
if (TEXT.includes("\n")) {
  throw new Error("TEXT must be a single line");
}

const out = process.argv[2] ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, TEXT, "utf8");
