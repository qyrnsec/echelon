export interface DigestItem {
  title: string;
  url: string;
  source: string;
  source_type: "reddit" | "rss" | "youtube" | "podcast" | "github" | "nvd";
  upvotes: number;
  comments: number;
  cvss?: number;
  severity?: string;
  severity_score?: number;
  created_utc: number;
  score: number;
  category: string;
}

export interface Digest {
  date: string;
  generated_at: string;
  count: number;
  items: DigestItem[];
}
