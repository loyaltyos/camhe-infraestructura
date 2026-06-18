"use client";

import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/components/cart-provider";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-camhe-yellow px-4 text-sm font-bold text-camhe-black transition hover:bg-yellow-300"
    >
      <ShoppingCart className="h-4 w-4" aria-hidden="true" />
      Agregar al carrito
    </button>
  );
}
