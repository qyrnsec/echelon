"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Settings, Menu, X } from "lucide-react";
import StackConfigModal from "./StackConfigModal";

const navLinks = [
  { href: "/", label: "Dernier digest" },
  { href: "/archive", label: "Archives" },
  { href: "/my-digest", label: "Mon Digest" },
];

export default function Header() {
  const [stackOpen, setStackOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#1e1e2e]" style={{ background: "#0a0a0f" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <Image
              src="/logo.png"
              alt="Échelon"
              width={28}
              height={28}
              className="rounded"
            />
            <span className="font-display font-bold text-base tracking-wider text-accent group-hover:text-accent-dim transition-colors">
              ÉCHELON
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-dim hover:text-text transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={() => setStackOpen(true)}
              aria-label="Configuration stack"
              className="text-text-dim hover:text-accent"
            >
              <Settings size={16} />
            </Button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-1.5 text-text-dim hover:text-accent transition-colors cursor-pointer"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-[#1e1e2e]" style={{ background: "#111118" }}>
            <div className="mx-auto max-w-5xl px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-sm text-text-dim hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setStackOpen(true);
                }}
                className="flex items-center gap-2 py-2 text-sm text-text-dim hover:text-accent transition-colors w-full cursor-pointer"
              >
                <Settings size={14} />
                Configuration stack
              </button>
            </div>
          </nav>
        )}
      </header>

      <StackConfigModal
        open={stackOpen}
        onClose={() => setStackOpen(false)}
        onSave={() => {
          window.location.reload();
        }}
      />
    </>
  );
}
