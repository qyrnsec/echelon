"use client";

import { Zap } from "lucide-react";

export default function StackAlertBanner({ matchCount }: { matchCount: number }) {
  if (matchCount === 0) return null;

  return (
    <div className="mb-6 border border-accent/30 rounded-xl px-4 py-3 bg-accent/[0.05] flex items-center gap-3">
      <Zap size={14} className="text-accent shrink-0" />
      <p className="text-xs text-accent">
        <span className="font-semibold">{matchCount} élément{matchCount > 1 ? "s" : ""}</span>
        {" "}correspondant{matchCount > 1 ? "s" : ""} à votre stack
      </p>
    </div>
  );
}
