import Link from "next/link";
import { Card, CardBody } from "@heroui/react";
import { ChevronRight } from "lucide-react";

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
          <Link href={`/digest/${date}`}>
            <Card
              className="border border-[#1e1e2e] bg-bg-card hover:border-accent/30 hover:bg-bg-hover transition-all group cursor-pointer"
              shadow="none"
              radius="md"
            >
              <CardBody className="px-4 py-3 flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-accent font-mono text-sm font-semibold group-hover:text-accent-dim transition-colors">
                    {date}
                  </span>
                  <span className="text-text-dim text-xs">Digest hebdomadaire</span>
                </div>
                <ChevronRight
                  size={14}
                  className="text-text-dim/40 group-hover:text-accent/60 transition-colors"
                />
              </CardBody>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
