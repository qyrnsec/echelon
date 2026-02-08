import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Echelon"
            width={36}
            height={36}
            className="rounded"
          />
          <span className="text-xl font-bold tracking-wider text-accent group-hover:text-accent-dim transition-colors">
            ECHELON
          </span>
        </Link>
        <nav className="flex gap-6 text-sm text-text-dim">
          <Link href="/" className="hover:text-accent transition-colors">
            Dernier digest
          </Link>
          <Link href="/archive" className="hover:text-accent transition-colors">
            Archives
          </Link>
        </nav>
      </div>
    </header>
  );
}
