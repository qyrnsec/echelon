"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StackConfigModal from "./StackConfigModal";

export default function Header() {
  const [stackOpen, setStackOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Dernier digest" },
    { href: "/archive", label: "Archives" },
    { href: "/my-digest", label: "Mon Digest" },
  ];

  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <Image
              src="/logo.png"
              alt="Echelon"
              width={32}
              height={32}
              className="rounded sm:w-9 sm:h-9"
            />
            <span className="text-lg sm:text-xl font-bold tracking-wider text-accent group-hover:text-accent-dim transition-colors">
              ECHELON
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm text-text-dim">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setStackOpen(true)}
              className="hover:text-accent transition-colors cursor-pointer"
            >
              [config]
            </button>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-text-dim hover:text-accent transition-colors cursor-pointer"
            aria-label="Menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-bg-card">
            <div className="px-4 py-3 space-y-1">
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
                className="block w-full text-left py-2 text-sm text-text-dim hover:text-accent transition-colors cursor-pointer"
              >
                [config]
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
