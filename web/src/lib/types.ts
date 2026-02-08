export interface DigestItem {
  title: string;
  url: string;
  source: string;
  source_type: "reddit" | "rss" | "twitter" | "youtube" | "nvd";
  upvotes: number;
  comments: number;
  retweets?: number;
  cvss?: number;
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
