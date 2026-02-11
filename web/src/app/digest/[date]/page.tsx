import { getDigest, getDigestDates } from "@/lib/digests";
import DigestView from "@/components/DigestView";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getDigestDates().map((date) => ({ date }));
}

export default async function DigestPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const digest = getDigest(date);

  if (!digest) notFound();

  return (
    <DigestView
      date={digest.date}
      items={digest.items}
      count={digest.count}
      backLink
    />
  );
}
