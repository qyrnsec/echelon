"use client";

import { useState, useRef, useCallback } from "react";
import type { Digest, DigestItem } from "@/lib/types";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";
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

  const handleChange = (value: string) => {
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
      <div className="mb-4 sm:mb-6">
        <Input
          value={query}
          onValueChange={handleChange}
          placeholder="Rechercher dans les archives..."
          size="md"
          variant="bordered"
          startContent={<Search size={14} className="text-text-dim/60 shrink-0" />}
          classNames={{
            input: "text-sm text-text placeholder:text-text-dim/40",
            inputWrapper:
              "border-[#1e1e2e] hover:border-accent/40 focus-within:!border-accent/60 bg-bg-card",
          }}
        />
        {searching && (
          <p className="text-[11px] sm:text-xs text-text-dim mt-2">
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
          <section key={digestDate} className="mb-6 sm:mb-8">
            <h2 className="text-[13px] sm:text-sm font-semibold uppercase tracking-widest text-text-dim mb-3 sm:mb-4 flex items-center gap-2">
              <span className="text-accent font-mono">&gt;</span>
              Digest {digestDate}
              <span className="text-[10px] text-text-dim/50 font-normal">
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
