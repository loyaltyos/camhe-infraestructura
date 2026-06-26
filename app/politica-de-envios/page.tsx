import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de envíos" };

export default function PoliticaEnvios() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-camhe-yellow">Legal</p>
      <h1 className="mt-3 text-4xl font-black text-camhe-black">Política de envíos</h1>
      <div className="mt-8 space-y-5 rounded-lg bg-white p-6 text-neutral-700 shadow-sm">
        <p className="leading-7">Los envíos y entregas se coordinan con un asesor de CAMHE Infraestructura de acuerdo con disponibilidad, volumen, ubicación del proyecto, maniobras requeridas y condiciones logísticas confirmadas en la compra o cotización.</p>
        <p className="leading-7">Los productos voluminosos, prefabricados o de manejo especial pueden requerir una cotización específica de envío, descarga, maniobra o entrega programada según zona y tipo de producto.</p>
        <p className="leading-7">Los tiempos de entrega son variables hasta que un asesor confirme existencias, producción o preparación de producto, así como ruta y condiciones de recepción.</p>
        <p className="leading-7">Los precios se muestran en pesos mexicanos (MXN) y pueden cambiar sin previo aviso antes de la confirmación del pedido. La facturación está disponible bajo solicitud con datos fiscales válidos.</p>
        <p className="leading-7">Los pagos en línea se procesan mediante Conekta; la entrega seguirá sujeta a validación de pago, disponibilidad y coordinación logística.</p>
        <p className="leading-7">Las devoluciones están sujetas a revisión del estado del producto. Productos especiales, voluminosos o bajo pedido pueden no aplicar a devolución automática.</p>
        <p className="leading-7">El cliente debe proporcionar datos completos de entrega, contacto en sitio y cualquier restricción de acceso para evitar retrasos o costos adicionales.</p>
      </div>
    </section>
  );
}
