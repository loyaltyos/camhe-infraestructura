import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de devoluciones" };

export default function PoliticaDevoluciones() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-camhe-yellow">Legal</p>
      <h1 className="mt-3 text-4xl font-black text-camhe-black">Política de devoluciones</h1>
      <div className="mt-8 space-y-5 rounded-lg bg-white p-6 text-neutral-700 shadow-sm">
        <p className="leading-7">CAMHE Infraestructura revisa las devoluciones caso por caso conforme al tipo de producto, condición de entrega, estado físico, disponibilidad de proveedor y acuerdos confirmados en la compra o cotización.</p>
        <p className="leading-7">Los precios están expresados en pesos mexicanos (MXN) y pueden cambiar sin previo aviso antes de la confirmación formal del pedido. La facturación está disponible cuando el cliente proporcione datos fiscales correctos.</p>
        <p className="leading-7">Los productos están sujetos a disponibilidad y las entregas se coordinan según volumen, zona y tipo de producto. Los tiempos de entrega son variables y se confirman durante el seguimiento del pedido.</p>
        <p className="leading-7">Las devoluciones están sujetas a revisión del estado del producto. Productos especiales, voluminosos o bajo pedido pueden no aplicar a devolución automática, salvo defecto validado o diferencia atribuible al suministro.</p>
        <p className="leading-7">Si el pago se realizó mediante Conekta, cualquier devolución aprobada se gestionará conforme a los tiempos operativos de revisión y procesamiento aplicables.</p>
        <p className="leading-7">Cualquier reporte debe presentarse con evidencia fotográfica, número de pedido o cotización y descripción del caso.</p>
      </div>
    </section>
  );
}
