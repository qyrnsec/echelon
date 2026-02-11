"use client";

export default function StackAlertBanner({ matchCount }: { matchCount: number }) {
  if (matchCount === 0) return null;

  return (
    <div className="mb-6 border border-accent/30 rounded-lg px-4 py-2.5 bg-accent/5">
      <p className="text-xs text-accent">
        <span className="font-bold">[!]</span> {matchCount} élément{matchCount > 1 ? "s" : ""} correspondant à votre stack
      </p>
    </div>
  );
}
