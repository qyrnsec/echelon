import { getLatestDigest } from "@/lib/digests";
import CategorySection from "@/components/CategorySection";
import type { DigestItem } from "@/lib/types";

export default function Home() {
  const digest = getLatestDigest();

  if (!digest) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl font-bold text-accent mb-2">Aucun digest disponible</p>
        <p className="text-text-dim text-sm">
          Exécutez le scraper pour générer le premier digest.
        </p>
      </div>
    );
  }

  const grouped: Record<string, DigestItem[]> = {};
  for (const item of digest.items) {
    const cat = item.category || "News";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  }

  const categoryOrder = ["Vulns", "Tools", "Tutorials", "News"];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-lg font-bold">
          <span className="text-accent">$</span> digest —date {digest.date}
        </h1>
        <p className="text-xs text-text-dim mt-1">
          {digest.count} éléments sélectionnés
        </p>
      </div>
      {categoryOrder.map((cat) => (
        <CategorySection
          key={cat}
          category={cat}
          items={grouped[cat] || []}
        />
      ))}
    </div>
  );
}
