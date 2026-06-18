import type { Metadata } from "next";

export const metadata: Metadata = { title: "Términos y condiciones" };

export default function Terminos() {
  return <LegalPage title="Términos y condiciones" paragraphs={[
    "El sitio de CAMHE Infraestructura funciona como catálogo y medio de solicitud de cotización para productos de equipamiento urbano, vial, pluvial y modular.",
    "Los precios publicados, cuando existan, son estimados y pueden cambiar por volumen, especificación, disponibilidad, ubicación de entrega, vigencia de proveedor o condiciones del proyecto.",
    "Enviar una solicitud no constituye una compra confirmada. Un asesor validará productos, cantidades, fichas técnicas, tiempos de entrega y condiciones comerciales antes de confirmar la cotización.",
    "Las imágenes son referencias visuales. Las características finales pueden variar según medidas, materiales, acabados y disponibilidad al momento de cotizar."
  ]} />;
}

function LegalPage({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-camhe-yellow">Legal</p>
      <h1 className="mt-3 text-4xl font-black text-camhe-black">{title}</h1>
      <div className="mt-8 space-y-5 rounded-lg bg-white p-6 text-neutral-700 shadow-sm">
        {paragraphs.map((paragraph) => <p key={paragraph} className="leading-7">{paragraph}</p>)}
      </div>
    </section>
  );
}
