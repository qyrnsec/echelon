import type { DigestItem } from "./types";

export function generateDigestMarkdown(
  title: string,
  date: string,
  items: DigestItem[]
): string {
  const grouped: Record<string, DigestItem[]> = {};
  for (const item of items) {
    const cat = item.category || "News";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  }

  const categoryOrder = ["Vulns", "Bounty", "Tools", "Tutorials", "News"];
  let md = `# ${title}\n\n**Date** : ${date}\n\n`;

  for (const cat of categoryOrder) {
    const catItems = grouped[cat];
    if (!catItems || catItems.length === 0) continue;
    md += `## ${cat}\n\n`;
    for (const item of catItems) {
      let line = `- [${item.title}](${item.url}) — ${item.source}`;
      if (item.cvss && item.cvss > 0) {
        line += ` | CVSS ${item.cvss}`;
      }
      md += line + "\n";
    }
    md += "\n";
  }

  return md;
}

export function downloadMarkdown(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
