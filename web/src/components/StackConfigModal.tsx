"use client";

import { useState, useEffect, useRef } from "react";
import type { StackConfig } from "@/lib/types";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import { X, Plus, Layers } from "lucide-react";

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
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

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

  const availableSuggestions = SUGGESTIONS.filter(
    (s) => !keywords.includes(s.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: "rgba(0,0,0,0.7)" }}
        onClick={onClose}
      />

      <div
        className="relative w-full sm:max-w-md mx-0 sm:mx-4 rounded-t-2xl sm:rounded-2xl overflow-hidden"
        style={{
          background: "#111118",
          border: "1px solid #1e1e2e",
          boxShadow: "0 -4px 60px rgba(124,58,237,0.08), 0 0 0 1px #1e1e2e",
        }}
      >
        <div
          className="px-5 pt-5 pb-4"
          style={{ borderBottom: "1px solid #1e1e2e" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)" }}
              >
                <Layers size={13} style={{ color: "#a78bfa" }} />
              </div>
              <div>
                <h2 className="font-display font-semibold text-sm" style={{ color: "#e2e2e8" }}>
                  Votre stack
                </h2>
                <p className="text-[11px]" style={{ color: "#6b6b80" }}>
                  Surbrillance des articles correspondants
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 cursor-pointer transition-colors"
              style={{ color: "#6b6b80" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e2e2e8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b80")}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-5 max-h-[60vh] overflow-y-auto">
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2.5"
            style={{ background: "#0a0a0f", border: "1px solid #1e1e2e" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#1e1e2e")}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addKeyword(input);
                }
              }}
              placeholder="Ajouter une technologie..."
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: "#e2e2e8" }}
            />
            <button
              onClick={() => addKeyword(input)}
              disabled={!input.trim()}
              className="shrink-0 rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: "rgba(124,58,237,0.15)",
                border: "1px solid rgba(124,58,237,0.3)",
                color: "#a78bfa",
              }}
            >
              <Plus size={13} />
            </button>
          </div>

          {keywords.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "#6b6b80" }}>
                Actif · {keywords.length}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium"
                    style={{
                      background: "rgba(124,58,237,0.12)",
                      border: "1px solid rgba(124,58,237,0.3)",
                      color: "#c4b5fd",
                    }}
                  >
                    {kw}
                    <button
                      onClick={() => removeKeyword(kw)}
                      className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {availableSuggestions.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "#6b6b80" }}>
                Suggestions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {availableSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => addKeyword(s)}
                    className="rounded-lg px-2.5 py-1 text-[11px] cursor-pointer transition-all"
                    style={{
                      background: "#0a0a0f",
                      border: "1px solid #1e1e2e",
                      color: "#6b6b80",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(124,58,237,0.35)";
                      e.currentTarget.style.color = "#c4b5fd";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#1e1e2e";
                      e.currentTarget.style.color = "#6b6b80";
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className="px-5 py-4 flex items-center justify-between gap-3"
          style={{ borderTop: "1px solid #1e1e2e" }}
        >
          <p className="text-[11px]" style={{ color: "#6b6b80" }}>
            {keywords.length === 0
              ? "Aucun mot-clé configuré"
              : `${keywords.length} technologie${keywords.length > 1 ? "s" : ""} surveillée${keywords.length > 1 ? "s" : ""}`}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-colors"
              style={{ color: "#6b6b80" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e2e2e8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b80")}
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all"
              style={{
                background: "rgba(124,58,237,0.2)",
                border: "1px solid rgba(124,58,237,0.4)",
                color: "#c4b5fd",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(124,58,237,0.3)";
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(124,58,237,0.2)";
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
              }}
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
