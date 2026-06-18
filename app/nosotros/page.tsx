import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Factory, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "CAMHE Infraestructura forma parte del Grupo CAMHE y suministra equipamiento urbano, vial y modular para proyectos de construcción y desarrollo."
};

export default function Nosotros() {
  return (
    <>
      <section className="relative overflow-hidden bg-camhe-black py-20 text-white">
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85"
          alt="Proyecto de construcción urbana"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 industrial-grid" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase text-camhe-yellow">Nosotros</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black sm:text-5xl">Una división del Grupo CAMHE para infraestructura urbana y equipamiento público</h1>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5 text-lg leading-8 text-neutral-700">
            <p>
              CAMHE Infraestructura forma parte del Grupo CAMHE y está enfocada en suministrar equipamiento urbano, vial y modular para proyectos de construcción, urbanización y desarrollo.
            </p>
            <p>
              Atendemos necesidades de constructoras, municipios, desarrolladores inmobiliarios, fraccionamientos, parques industriales y organizaciones que requieren productos resistentes, funcionales y adecuados para operación en exterior.
            </p>
            <p>
              Nuestro modelo se basa en cotizaciones por proyecto, revisión de disponibilidad, especificación técnica y coordinación de entrega según el alcance requerido.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              [Building2, "Proyectos públicos y privados", "Soluciones para parques, vialidades, accesos, plazas y desarrollos urbanos."],
              [Factory, "Capacidad de suministro", "Catálogo preparado para compras por volumen y requerimientos específicos."],
              [ShieldCheck, "Enfoque confiable", "Comunicación corporativa, claridad comercial y seguimiento con asesor."]
            ].map(([Icon, title, text]) => (
              <div key={String(title)} className="rounded-lg bg-white p-6 shadow-sm">
                <Icon className="h-8 w-8 text-camhe-yellow" />
                <h2 className="mt-4 text-xl font-black">{String(title)}</h2>
                <p className="mt-2 text-neutral-600">{String(text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
