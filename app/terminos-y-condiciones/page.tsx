import type { Metadata } from "next";

export const metadata: Metadata = { title: "Términos y condiciones" };

export default function Terminos() {
  return <LegalPage title="Términos y condiciones" paragraphs={[
    "El sitio de CAMHE Infraestructura funciona como catálogo, carrito y medio de compra o solicitud de cotización para productos de equipamiento urbano, vial, pluvial y modular.",
    "Todos los precios se muestran en pesos mexicanos (MXN) y pueden cambiar sin previo aviso por volumen, especificación, disponibilidad, ubicación de entrega, vigencia de proveedor o condiciones del proyecto.",
    "Los productos están sujetos a disponibilidad. En artículos voluminosos, prefabricados o fabricados bajo medida, la entrega puede requerir cotización especial y validación logística con un asesor.",
    "Los pagos en línea se procesan mediante Conekta. Si las credenciales de pago no están configuradas, la operación se atenderá como solicitud de cotización por CAMHE Infraestructura.",
    "La facturación está disponible cuando el cliente proporcione datos fiscales correctos y la compra o cotización haya sido confirmada por CAMHE Infraestructura.",
    "Las entregas se coordinan según volumen, zona, tipo de producto, maniobras requeridas y condiciones de recepción. Los tiempos de entrega son variables y se confirman de acuerdo con disponibilidad, ruta y preparación del pedido.",
    "Las devoluciones están sujetas a revisión del estado del producto. Productos especiales, voluminosos o bajo pedido pueden no aplicar a devolución automática."
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
