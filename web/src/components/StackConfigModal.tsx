"use client";

import { useState, useEffect, useRef } from "react";
import type { StackConfig } from "@/lib/types";
import { getStorageItem, setStorageItem } from "@/lib/storage";

const STORAGE_KEY = "echelon:stack";

const SUGGESTIONS = [
  "Apache", "nginx", "WordPress", "Linux", "Docker", "OpenSSL",
  "PHP", "Node.js", "Python", "Java", "Kubernetes", "Redis",
  "PostgreSQL", "MySQL", "MongoDB", "AWS", "Azure", "Jenkins",
  "GitLab", "Grafana", "Elasticsearch", "Tomcat", "Spring",
  "React", "Angular", "Windows", "macOS", "Android", "iOS",
];

export default function StackConfigModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (keywords: string[]) => void;
}) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const saved = getStorageItem<StackConfig>(STORAGE_KEY);
      if (saved) setKeywords(saved.keywords);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const addKeyword = (kw: string) => {
    const trimmed = kw.trim().toLowerCase();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords((prev) => [...prev, trimmed]);
    }
    setInput("");
  };

  const removeKeyword = (kw: string) => {
    setKeywords((prev) => prev.filter((k) => k !== kw));
  };

  const handleSave = () => {
    setStorageItem<StackConfig>(STORAGE_KEY, { keywords });
    onSave(keywords);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword(input);
    }
  };

  const availableSuggestions = SUGGESTIONS.filter(
    (s) => !keywords.includes(s.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-bg-card border border-border rounded-lg p-4 sm:p-6 w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold">
            <span className="text-accent">$</span> config --stack
          </h2>
          <button
            onClick={onClose}
            className="text-text-dim hover:text-accent transition-colors cursor-pointer text-xs"
          >
            [x]
          </button>
        </div>

        <p className="text-xs text-text-dim mb-4">
          Définissez les technologies de votre stack pour mettre en surbrillance les articles pertinents.
        </p>

        <div className="flex gap-2 mb-4">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ajouter un mot-clé..."
            className="flex-1 bg-bg text-sm border border-border rounded px-3 py-2 text-text placeholder:text-text-dim/50 focus:border-accent/50 focus:outline-none transition-colors"
          />
          <button
            onClick={() => addKeyword(input)}
            className="text-xs border border-border rounded px-3 py-2 hover:border-accent/40 hover:text-accent transition-colors cursor-pointer"
          >
            [+]
          </button>
        </div>

        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {keywords.map((kw) => (
              <span
                key={kw}
                className="text-[11px] px-2.5 py-1 rounded border border-accent/40 bg-accent/10 text-accent flex items-center gap-1.5"
              >
                {kw}
                <button
                  onClick={() => removeKeyword(kw)}
                  className="hover:text-red transition-colors cursor-pointer"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        )}

        {availableSuggestions.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] text-text-dim uppercase tracking-widest mb-2">Suggestions</p>
            <div className="flex flex-wrap gap-1.5">
              {availableSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => addKeyword(s)}
                  className="text-[10px] px-2 py-0.5 rounded border border-border text-text-dim hover:border-accent/30 hover:text-accent transition-all cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-xs text-text-dim hover:text-text transition-colors cursor-pointer"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="text-xs border border-accent/40 rounded px-4 py-1.5 text-accent hover:bg-accent/10 transition-colors cursor-pointer"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}
