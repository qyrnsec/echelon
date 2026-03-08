"use client";

import { useState, useEffect, useRef } from "react";
import type { StackConfig } from "@/lib/types";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import { Button, Input, Chip } from "@heroui/react";
import { Plus, X } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.65)" }}
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-lg rounded-xl border border-[#1e1e2e] p-5 max-h-[85vh] overflow-y-auto flex flex-col gap-4"
        style={{ background: "#111118" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-text">Configuration stack</h2>
            <p className="text-xs text-text-dim mt-0.5">
              Définissez les technologies de votre stack pour mettre en surbrillance les articles pertinents.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-dim hover:text-accent transition-colors cursor-pointer shrink-0 mt-0.5"
          >
            <X size={16} />
          </button>
        </div>

        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ajouter un mot-clé..."
          size="sm"
          variant="bordered"
          endContent={
            <button
              onClick={() => addKeyword(input)}
              className="text-text-dim hover:text-accent transition-colors cursor-pointer"
            >
              <Plus size={14} />
            </button>
          }
          classNames={{
            input: "text-sm placeholder:text-[#6b6b80]/50",
            inputWrapper: "border-[#1e1e2e] hover:border-[#7c3aed]/40 focus-within:!border-[#7c3aed]/60 bg-[#0a0a0f]",
          }}
        />

        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {keywords.map((kw) => (
              <Chip
                key={kw}
                size="sm"
                variant="flat"
                color="primary"
                endContent={
                  <button
                    onClick={() => removeKeyword(kw)}
                    className="hover:opacity-70 transition-opacity cursor-pointer ml-0.5"
                  >
                    <X size={10} />
                  </button>
                }
              >
                {kw}
              </Chip>
            ))}
          </div>
        )}

        {availableSuggestions.length > 0 && (
          <div>
            <p className="text-[10px] text-text-dim/60 uppercase tracking-widest mb-2">
              Suggestions
            </p>
            <div className="flex flex-wrap gap-1.5">
              {availableSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => addKeyword(s)}
                  className="text-[10px] px-2 py-0.5 rounded-md border border-[#1e1e2e] text-text-dim hover:border-[#7c3aed]/40 hover:text-accent transition-all cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-1 border-t border-[#1e1e2e]">
          <Button
            size="sm"
            variant="light"
            color="default"
            onPress={onClose}
            className="text-text-dim"
          >
            Annuler
          </Button>
          <Button
            size="sm"
            variant="flat"
            color="primary"
            onPress={handleSave}
          >
            Sauvegarder
          </Button>
        </div>
      </div>
    </div>
  );
}
