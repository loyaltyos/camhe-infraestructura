import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, ClipboardCheck, HardHat, ShieldCheck, Truck } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { categories, categoryDescriptions, categoryImages, contact } from "@/lib/site";
import { featuredProducts } from "@/lib/products";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-camhe-black text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85"
            alt="Infraestructura urbana y desarrollo industrial"
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 industrial-grid bg-camhe-black/50" />
        </div>
        <div className="relative mx-auto grid min-h-[72vh] max-w-7xl content-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-sm bg-camhe-yellow px-3 py-1 text-sm font-black uppercase text-camhe-black">
              CAMHE Infraestructura
            </p>
            <h1 className="mt-6 text-4xl font-black tracking-normal sm:text-5xl lg:text-6xl">
              Infraestructura y equipamiento urbano para proyectos públicos y privados
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-100">
              Soluciones resistentes, funcionales y listas para constructoras, municipios, fraccionamientos, parques industriales y desarrollos urbanos.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/catalogo" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-camhe-yellow px-6 font-black text-camhe-black hover:bg-yellow-300">
                Ver catálogo <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/checkout" className="inline-flex h-12 items-center justify-center rounded-md border border-white/40 px-6 font-bold text-white hover:border-camhe-yellow hover:text-camhe-yellow">
                Solicitar cotización
              </Link>
            </div>
          </div>
        </div>
        <div className="relative h-3 hazard-stripe" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Categorías"
          title="Soluciones para obra urbana, vialidad y operación pública"
          description="Un catálogo preparado para especificación, compra por volumen y entregas coordinadas por proyecto."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category} href={`/catalogo?categoria=${encodeURIComponent(category)}`} className="group relative min-h-64 overflow-hidden rounded-lg bg-camhe-black">
              <Image src={categoryImages[category]} alt={category} fill className="object-cover opacity-55 transition group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-black">{category}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-200">{categoryDescriptions[category]}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Destacados" title="Productos listos para integrar a tu cotización" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Por qué CAMHE"
            title="Suministro serio para proyectos que necesitan resistencia y coordinación"
            description="Atendemos compras por proyecto con productos sujetos a disponibilidad, especificación técnica y logística coordinada."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Catálogo industrial", HardHat, "Productos para obra urbana, vialidades, parques y accesos."],
              ["Atención a proyecto", ClipboardCheck, "Cotización según volumen, medidas, acabados y ubicación."],
              ["Entrega coordinada", Truck, "Programación de entrega conforme a disponibilidad y alcance."],
              ["Enfoque corporativo", ShieldCheck, "Comunicación clara para empresas, municipios y desarrolladores."]
            ].map(([title, Icon, text]) => (
              <div key={String(title)} className="rounded-lg border border-neutral-200 bg-white p-6">
                <Icon className="h-8 w-8 text-camhe-yellow" />
                <h3 className="mt-4 font-black">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{String(text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-camhe-black py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-black uppercase text-camhe-yellow">Proceso</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Cotización sin pagos en línea</h2>
            <p className="mt-4 text-neutral-300">Agrega productos, envía tu solicitud y un asesor confirma especificaciones, disponibilidad, tiempos y entrega.</p>
          </div>
          <div className="grid gap-4">
            {["Selecciona productos del catálogo", "Comparte datos de proyecto y entrega", "Recibe seguimiento de CAMHE Infraestructura"].map((step, index) => (
              <div key={step} className="flex items-center gap-4 border border-neutral-800 bg-white/5 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-camhe-yellow font-black text-camhe-black">{index + 1}</span>
                <p className="font-bold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-4">
          {["Constructoras", "Municipios", "Fraccionamientos", "Parques industriales"].map((client) => (
            <div key={client} className="flex items-center gap-3 border-l-4 border-camhe-yellow bg-white p-5 font-black">
              <Building2 className="h-5 w-5 text-camhe-yellow" />
              {client}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-camhe-yellow">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="font-black uppercase text-camhe-black">Atención directa</p>
            <p className="mt-1 text-camhe-black">Cotiza por WhatsApp con un asesor: {contact.phone}</p>
          </div>
          <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-camhe-black px-6 font-black text-white">
            <CheckCircle2 className="h-5 w-5" /> Abrir WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
