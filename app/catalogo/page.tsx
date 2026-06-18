import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { categories, categoryDescriptions } from "@/lib/site";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Catálogo de mobiliario urbano, seguridad vial, señalización vial, infraestructura pluvial, equipamiento público, casetas y módulos."
};

export default function Catalogo({ searchParams }: { searchParams?: { categoria?: string } }) {
  const selected = categories.find((category) => category === searchParams?.categoria);
  const visibleProducts = selected ? products.filter((product) => product.category === selected) : products;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Catálogo"
        title="Productos para infraestructura urbana"
        description="Precios estimados cuando aplican. Los productos marcados como cotizar dependen de medidas, volumen, configuración, disponibilidad y destino."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/catalogo" className={`rounded-md px-4 py-2 text-sm font-bold ${!selected ? "bg-camhe-yellow text-camhe-black" : "bg-white text-neutral-700"}`}>
          Todos
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/catalogo?categoria=${encodeURIComponent(category)}`}
            className={`rounded-md px-4 py-2 text-sm font-bold ${selected === category ? "bg-camhe-yellow text-camhe-black" : "bg-white text-neutral-700"}`}
          >
            {category}
          </Link>
        ))}
      </div>
      {selected ? <p className="mt-5 max-w-3xl text-sm text-neutral-600">{categoryDescriptions[selected]}</p> : null}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
