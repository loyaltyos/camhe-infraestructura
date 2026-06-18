"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product, products } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const storageKey = "camhe-infraestructura-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.setTimeout(() => {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Array<{ id: string; quantity: number }>;
          setItems(
            parsed
              .map((item) => {
                const product = products.find((candidate) => candidate.id === item.id);
                return product ? { product, quantity: Math.max(1, item.quantity) } : null;
              })
              .filter(Boolean) as CartItem[]
          );
        } catch {
          window.localStorage.removeItem(storageKey);
        }
      }
      setReady(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(
      storageKey,
      JSON.stringify(items.map((item) => ({ id: item.product.id, quantity: item.quantity })))
    );
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (product: Product) => {
      setItems((current) => {
        const existing = current.find((item) => item.product.id === product.id);
        if (existing) {
          return current.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...current, { product, quantity: 1 }];
      });
    };

    return {
      items,
      addItem,
      removeItem: (productId) => setItems((current) => current.filter((item) => item.product.id !== productId)),
      setQuantity: (productId, quantity) =>
        setItems((current) =>
          current.map((item) =>
            item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        ),
      clearCart: () => setItems([]),
      count: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0)
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
