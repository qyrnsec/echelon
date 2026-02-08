import Link from "next/link";

export default function ArchiveList({ dates }: { dates: string[] }) {
  if (dates.length === 0) {
    return (
      <p className="text-text-dim text-sm">Aucun digest disponible.</p>
    );
  }

  return (
    <ul className="space-y-2">
      {dates.map((date) => (
        <li key={date}>
          <Link
            href={`/digest/${date}`}
            className="block border border-border rounded-lg px-4 py-3 hover:border-accent/40 hover:bg-bg-hover transition-all text-sm group"
          >
            <span className="text-accent font-mono group-hover:text-accent-dim transition-colors">
              {date}
            </span>
            <span className="text-text-dim ml-3">Digest hebdomadaire</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
