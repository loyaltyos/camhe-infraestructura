import Image from "next/image";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Product, formatProductPrice } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="relative h-44">
        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-sm bg-camhe-yellow px-2 py-1 text-xs font-black uppercase text-camhe-black">
          {product.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="min-h-12 text-lg font-black text-camhe-black">{product.name}</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">{product.description}</p>
        <div className="mt-4 border-t border-neutral-200 pt-4">
          <p className="text-xl font-black text-camhe-black">{formatProductPrice(product)}</p>
          <ul className="mt-3 space-y-1 text-xs text-neutral-600">
            {product.specs.map((spec) => (
              <li key={spec}>• {spec}</li>
            ))}
          </ul>
        </div>
        <div className="mt-5">
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
