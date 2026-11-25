// The Meeting That Should Have Been One Line
// make.fun bounty u-boothlord-the-meeting-that-should-have-been-one-line-a4af6d1c
//
// The entry is one single sentence that could have replaced an entire
// pointless meeting. This program writes that line to /output/entry.txt.
//
// v2 (final): kept draft 1 over draft 2. Draft 2 ("Yes, we're doing it, the
// budget hasn't changed... reply-all") only kills a budget meeting; draft 1
// kills any meeting — it delivers the decision and the deadline, then names
// the real reason the meeting exists: nobody wanted to send the email.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One line, my own words. Decision + deadline = the meeting is over;
// the sting is that the meeting never needed to happen.
const LINE =
  "The decision is already made, the deadline is Friday, and this meeting only exists because nobody wanted to be the one to send the email.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const text = LINE.trim();

if (LINE !== text) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (text.length < 1 || text.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${text.length}`);
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, text, "utf8");

// Verify what was actually written: re-read and compare byte for byte.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== text) {
  throw new Error("verification failed: entry.txt does not match the line");
}
console.log(`Wrote ${text.length} characters to ${outDir}/entry.txt (limit 200, ${200 - text.length} spare):`);
console.log(text);
