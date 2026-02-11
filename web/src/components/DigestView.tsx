"use client";

import { useState, useEffect } from "react";
import type { DigestItem, FilterState, StackConfig } from "@/lib/types";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import CategorySection from "./CategorySection";
import DigestFilters from "./DigestFilters";
import ExportButton from "./ExportButton";
import StackAlertBanner from "./StackAlertBanner";

const FILTERS_KEY = "echelon:filters";
const STACK_KEY = "echelon:stack";
const CATEGORY_ORDER = ["Vulns", "Bounty", "Tools", "Tutorials", "News"];

export default function DigestView({
  date,
  items,
  count,
  backLink,
}: {
  date: string;
  items: DigestItem[];
  count: number;
  backLink?: boolean;
}) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    sourceTypes: [],
  });
  const [stackKeywords, setStackKeywords] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedFilters = getStorageItem<FilterState>(FILTERS_KEY);
    if (savedFilters) setFilters(savedFilters);
    const savedStack = getStorageItem<StackConfig>(STACK_KEY);
    if (savedStack) setStackKeywords(savedStack.keywords);
    setMounted(true);
  }, []);

  const handleFilterChange = (next: FilterState) => {
    setFilters(next);
    setStorageItem(FILTERS_KEY, next);
  };

  const filtered = items.filter((item) => {
    if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
      return false;
    }
    if (filters.sourceTypes.length > 0 && !filters.sourceTypes.includes(item.source_type)) {
      return false;
    }
    return true;
  });

  const highlightedUrls = new Set<string>();
  if (stackKeywords.length > 0) {
    for (const item of filtered) {
      const titleLower = item.title.toLowerCase();
      if (stackKeywords.some((kw) => titleLower.includes(kw))) {
        highlightedUrls.add(item.url);
      }
    }
  }

  const grouped: Record<string, DigestItem[]> = {};
  for (const item of filtered) {
    const cat = item.category || "News";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  }

  return (
    <div>
      {backLink && (
        <a
          href="/archive"
          className="text-xs text-text-dim hover:text-accent transition-colors mb-4 inline-block"
        >
          &larr; Archives
        </a>
      )}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">
            <span className="text-accent">$</span> digest —date {date}
          </h1>
          <ExportButton date={date} items={filtered} />
        </div>
        <p className="text-xs text-text-dim mt-1">
          {filtered.length === count
            ? `${count} éléments sélectionnés`
            : `${filtered.length}/${count} éléments affichés`}
        </p>
      </div>
      {mounted && (
        <>
          <DigestFilters filters={filters} onChange={handleFilterChange} />
          <StackAlertBanner matchCount={highlightedUrls.size} />
        </>
      )}
      {CATEGORY_ORDER.map((cat) => (
        <CategorySection
          key={cat}
          category={cat}
          items={grouped[cat] || []}
          highlightedUrls={highlightedUrls}
        />
      ))}
    </div>
  );
}
