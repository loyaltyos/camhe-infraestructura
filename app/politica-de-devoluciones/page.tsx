import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de devoluciones" };

export default function PoliticaDevoluciones() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-camhe-yellow">Legal</p>
      <h1 className="mt-3 text-4xl font-black text-camhe-black">Política de devoluciones</h1>
      <div className="mt-8 space-y-5 rounded-lg bg-white p-6 text-neutral-700 shadow-sm">
        <p className="leading-7">Las devoluciones se revisan caso por caso conforme al tipo de producto, condición de entrega, estado físico, disponibilidad de proveedor y acuerdos confirmados en la cotización.</p>
        <p className="leading-7">Productos fabricados, configurados o solicitados bajo especificación especial pueden no ser sujetos a devolución salvo defecto validado o diferencia atribuible al suministro.</p>
        <p className="leading-7">Cualquier reporte debe presentarse con evidencia fotográfica, número de cotización y descripción del caso para evaluación por parte de CAMHE Infraestructura.</p>
      </div>
    </section>
  );
}
