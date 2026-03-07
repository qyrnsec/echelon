"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { Settings } from "lucide-react";
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
      <Navbar
        isMenuOpen={menuOpen}
        onMenuOpenChange={setMenuOpen}
        className="bg-bg/80 backdrop-blur-md border-b border-[#1e1e2e]"
        maxWidth="xl"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="sm:hidden text-text-dim"
          />
          <NavbarBrand>
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/logo.png"
                alt="Échelon"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="font-display font-bold text-lg tracking-wider text-accent group-hover:text-accent-dim transition-colors">
                ÉCHELON
              </span>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {navLinks.map((link) => (
            <NavbarItem key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-text-dim hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
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
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="bg-bg-card/95 backdrop-blur-md pt-4">
          {navLinks.map((link) => (
            <NavbarMenuItem key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm text-text-dim hover:text-accent transition-colors w-full"
              >
                {link.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
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
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>

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
