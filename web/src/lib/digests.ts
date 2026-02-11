import fs from "fs";
import path from "path";
import type { Digest } from "./types";

const DIGESTS_DIR = path.join(process.cwd(), "..", "data", "digests");

export function getDigestDates(): string[] {
  if (!fs.existsSync(DIGESTS_DIR)) return [];
  return fs
    .readdirSync(DIGESTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""))
    .sort()
    .reverse();
}

export function getDigest(date: string): Digest | null {
  const filepath = path.join(DIGESTS_DIR, `${date}.json`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, "utf-8");
  return JSON.parse(raw) as Digest;
}

export function getLatestDigest(): Digest | null {
  const dates = getDigestDates();
  if (dates.length === 0) return null;
  return getDigest(dates[0]);
}

export function getAllDigests(): Digest[] {
  const dates = getDigestDates();
  const digests: Digest[] = [];
  for (const date of dates) {
    const d = getDigest(date);
    if (d) digests.push(d);
  }
  return digests;
}
