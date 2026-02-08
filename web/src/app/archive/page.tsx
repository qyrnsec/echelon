import { getDigestDates } from "@/lib/digests";
import ArchiveList from "@/components/ArchiveList";

export default function ArchivePage() {
  const dates = getDigestDates();

  return (
    <div>
      <h1 className="text-lg font-bold mb-6">
        <span className="text-accent">$</span> ls archives/
      </h1>
      <ArchiveList dates={dates} />
    </div>
  );
}
