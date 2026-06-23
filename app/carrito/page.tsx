"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatPrice, formatProductPrice } from "@/lib/products";

export default function Carrito() {
  const { items, removeItem, setQuantity, subtotal } = useCart();

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-camhe-yellow">Carrito</p>
      <h1 className="mt-3 text-4xl font-black text-camhe-black">Productos seleccionados</h1>
      {items.length === 0 ? (
        <div className="mt-10 rounded-lg bg-white p-8 text-center">
          <p className="text-neutral-600">Tu carrito está vacío.</p>
          <Link href="/catalogo" className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-camhe-yellow px-5 font-black text-camhe-black">
            Ver catálogo
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {items.map((item) => (
              <article key={item.product.id} className="grid gap-4 rounded-lg bg-white p-5 shadow-sm sm:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-xs font-black uppercase text-camhe-yellow">{item.product.category}</p>
                  <h2 className="mt-1 text-xl font-black">{item.product.name}</h2>
                  <p className="mt-2 text-sm text-neutral-600">{formatProductPrice(item.product)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(item.product.id, item.quantity - 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300"
                    aria-label="Reducir cantidad"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-black">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(item.product.id, item.quantity + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-700 hover:bg-red-50 hover:text-red-700"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <aside className="h-fit rounded-lg bg-camhe-black p-6 text-white">
            <p className="text-sm font-bold text-neutral-300">Subtotal estimado</p>
            <p className="mt-2 text-3xl font-black">{formatPrice(subtotal)} MXN</p>
            <p className="mt-3 text-sm leading-6 text-neutral-300">
              El subtotal considera productos con precio estimado. La confirmación final puede variar por volumen, especificación, disponibilidad y entrega.
            </p>
            <Link href="/checkout" className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-camhe-yellow px-5 font-black text-camhe-black">
              Continuar al checkout
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
