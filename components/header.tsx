"use client";

import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";

const links = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-camhe-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-camhe-yellow text-lg font-black text-camhe-black">
            C
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-black uppercase tracking-wide">CAMHE</span>
            <span className="block text-xs font-semibold uppercase text-camhe-yellow">Infraestructura</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-neutral-200 hover:text-camhe-yellow">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/carrito"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-700 hover:border-camhe-yellow"
            aria-label="Carrito"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute -right-2 -top-2 rounded-full bg-camhe-yellow px-2 py-0.5 text-xs font-black text-camhe-black">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-700 md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Abrir menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-neutral-800 px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="font-semibold">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
