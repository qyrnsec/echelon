"use client";

import { useState, useRef, useCallback } from "react";
import type { Digest, DigestItem } from "@/lib/types";
import ArchiveList from "./ArchiveList";
import DigestCard from "./DigestCard";

interface SearchResult {
  digestDate: string;
  item: DigestItem;
}

export default function ArchiveSearch({
  dates,
  digests,
}: {
  dates: string[];
  digests: Digest[];
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const search = useCallback(
    (q: string) => {
      const trimmed = q.trim().toLowerCase();
      if (!trimmed) {
        setResults([]);
        setSearching(false);
        return;
      }
      setSearching(true);
      const matched: SearchResult[] = [];
      for (const digest of digests) {
        for (const item of digest.items) {
          if (
            item.title.toLowerCase().includes(trimmed) ||
            item.source.toLowerCase().includes(trimmed)
          ) {
            matched.push({ digestDate: digest.date, item });
          }
        }
      }
      setResults(matched);
    },
    [digests]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(value), 200);
  };

  const grouped: Record<string, DigestItem[]> = {};
  for (const r of results) {
    if (!grouped[r.digestDate]) grouped[r.digestDate] = [];
    grouped[r.digestDate].push(r.item);
  }
  const sortedDates = Object.keys(grouped).sort().reverse();

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2 border border-border rounded-lg px-4 py-2.5 focus-within:border-accent/50 transition-colors">
          <span className="text-accent text-sm shrink-0">$ grep -r &quot;</span>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="rechercher..."
            className="flex-1 bg-transparent text-sm text-text placeholder:text-text-dim/50 focus:outline-none"
          />
          <span className="text-accent text-sm shrink-0">&quot; archives/</span>
        </div>
        {searching && (
          <p className="text-xs text-text-dim mt-2">
            {results.length} résultat{results.length > 1 ? "s" : ""} trouvé{results.length > 1 ? "s" : ""}
          </p>
        )}
      </div>

      {!searching ? (
        <ArchiveList dates={dates} />
      ) : results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-dim text-sm">Aucun résultat pour &quot;{query.trim()}&quot;</p>
        </div>
      ) : (
        sortedDates.map((digestDate) => (
          <section key={digestDate} className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-dim mb-4 flex items-center gap-2">
              <span className="text-accent font-mono">&gt;</span>
              Digest {digestDate}
              <span className="text-[10px] text-text-dim font-normal">
                ({grouped[digestDate].length})
              </span>
            </h2>
            <div className="space-y-2">
              {grouped[digestDate].map((item, i) => (
                <DigestCard key={`${item.url}-${i}`} item={item} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
