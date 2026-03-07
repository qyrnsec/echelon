"use client";

import { useState, useEffect } from "react";
import type { StackConfig } from "@/lib/types";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Chip,
} from "@heroui/react";
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

  useEffect(() => {
    if (open) {
      const saved = getStorageItem<StackConfig>(STORAGE_KEY);
      if (saved) setKeywords(saved.keywords);
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

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      size="lg"
      classNames={{
        base: "bg-bg-card border border-[#1e1e2e]",
        header: "border-b border-[#1e1e2e] pb-3",
        footer: "border-t border-[#1e1e2e] pt-3",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-text">
            Configuration stack
          </h2>
          <p className="text-xs text-text-dim font-normal">
            Définissez les technologies de votre stack pour mettre en surbrillance les articles pertinents.
          </p>
        </ModalHeader>

        <ModalBody className="py-4 gap-4">
          <Input
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
              input: "text-sm text-text placeholder:text-text-dim/40",
              inputWrapper:
                "border-[#1e1e2e] hover:border-accent/40 focus-within:!border-accent/60 bg-bg",
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
                      className="hover:text-white/80 transition-colors cursor-pointer ml-0.5"
                    >
                      <X size={10} />
                    </button>
                  }
                  classNames={{
                    content: "text-[11px] pr-0",
                  }}
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
                  <Chip
                    key={s}
                    size="sm"
                    variant="bordered"
                    color="default"
                    onClick={() => addKeyword(s)}
                    className="cursor-pointer hover:border-accent/40 hover:text-accent transition-all"
                    classNames={{
                      base: "border-[#1e1e2e] h-5",
                      content: "text-[10px] text-text-dim",
                    }}
                  >
                    {s}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </ModalBody>

        <ModalFooter className="gap-2">
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
