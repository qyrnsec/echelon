import { getDigestDates, getAllDigests } from "@/lib/digests";
import ArchiveSearch from "@/components/ArchiveSearch";

export default function ArchivePage() {
  const dates = getDigestDates();
  const digests = getAllDigests();

  return (
    <div>
      <h1 className="text-lg font-bold mb-6">
        <span className="text-accent">$</span> ls archives/
      </h1>
      <ArchiveSearch dates={dates} digests={digests} />
    </div>
  );
}
