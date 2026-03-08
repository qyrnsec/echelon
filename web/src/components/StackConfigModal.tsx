"use client";

import { useState, useEffect, useRef } from "react";
import type { StackConfig } from "@/lib/types";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import { X } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: "rgba(0,0,0,0.7)" }}
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "#111118",
          border: "1px solid #1e1e2e",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.08)",
          maxHeight: "85vh",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #1e1e2e" }}>
          <h2 className="text-sm font-semibold" style={{ color: "#e2e2e8" }}>
            <span style={{ color: "#7c3aed" }}>$</span> config --stack
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer transition-colors"
            style={{ color: "#6b6b80" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e2e2e8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b80")}
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-5 pt-4 pb-5 flex flex-col gap-4 overflow-y-auto">
          <p className="text-xs" style={{ color: "#6b6b80" }}>
            Définissez les technologies de votre stack pour mettre en surbrillance les articles pertinents.
          </p>

          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") { e.preventDefault(); addKeyword(input); }
              }}
              placeholder="Ajouter un mot-clé..."
              className="flex-1 rounded-lg px-3 py-2 text-sm outline-none transition-colors"
              style={{
                background: "#0a0a0f",
                border: "1px solid #1e1e2e",
                color: "#e2e2e8",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#1e1e2e")}
            />
            <button
              onClick={() => addKeyword(input)}
              className="rounded-lg px-3 py-2 text-sm font-medium cursor-pointer transition-all"
              style={{
                background: "#0a0a0f",
                border: "1px solid #1e1e2e",
                color: "#6b6b80",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
                e.currentTarget.style.color = "#7c3aed";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e1e2e";
                e.currentTarget.style.color = "#6b6b80";
              }}
            >
              [+]
            </button>
          </div>

          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium"
                  style={{
                    background: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.3)",
                    color: "#a78bfa",
                  }}
                >
                  {kw}
                  <button
                    onClick={() => removeKeyword(kw)}
                    className="cursor-pointer transition-opacity opacity-60 hover:opacity-100"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {availableSuggestions.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "#6b6b80" }}>
                Suggestions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {availableSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => addKeyword(s)}
                    className="rounded-md px-2 py-0.5 text-[11px] cursor-pointer transition-all"
                    style={{
                      background: "transparent",
                      border: "1px solid #1e1e2e",
                      color: "#6b6b80",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(124,58,237,0.35)";
                      e.currentTarget.style.color = "#a78bfa";
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
          className="flex items-center justify-end gap-3 px-5 py-4"
          style={{ borderTop: "1px solid #1e1e2e" }}
        >
          <button
            onClick={onClose}
            className="text-xs cursor-pointer transition-colors"
            style={{ color: "#6b6b80" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e2e2e8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b80")}
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg px-4 py-1.5 text-xs font-medium cursor-pointer transition-all"
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.35)",
              color: "#a78bfa",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(124,58,237,0.25)";
              e.currentTarget.style.borderColor = "rgba(124,58,237,0.55)";
              e.currentTarget.style.color = "#c4b5fd";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(124,58,237,0.15)";
              e.currentTarget.style.borderColor = "rgba(124,58,237,0.35)";
              e.currentTarget.style.color = "#a78bfa";
            }}
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}
