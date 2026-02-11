import { getLatestDigest } from "@/lib/digests";
import DigestView from "@/components/DigestView";

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

  return (
    <DigestView
      date={digest.date}
      items={digest.items}
      count={digest.count}
    />
  );
}
