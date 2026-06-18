import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de envíos" };

export default function PoliticaEnvios() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-camhe-yellow">Legal</p>
      <h1 className="mt-3 text-4xl font-black text-camhe-black">Política de envíos</h1>
      <div className="mt-8 space-y-5 rounded-lg bg-white p-6 text-neutral-700 shadow-sm">
        <p className="leading-7">Los envíos y entregas se coordinan con un asesor de CAMHE Infraestructura de acuerdo con disponibilidad, volumen, ubicación del proyecto, maniobras requeridas y condiciones logísticas confirmadas en la cotización.</p>
        <p className="leading-7">Los productos voluminosos, prefabricados o de manejo especial pueden requerir una cotización específica de envío, descarga, maniobra o entrega programada.</p>
        <p className="leading-7">Los tiempos de entrega son estimados hasta que un asesor confirme existencias, producción o preparación de producto, así como ruta y condiciones de recepción.</p>
        <p className="leading-7">Los precios se muestran en pesos mexicanos y pueden cambiar sin previo aviso antes de la confirmación del pedido. La facturación está disponible bajo solicitud con datos fiscales válidos.</p>
        <p className="leading-7">Cuando la pasarela esté activa, los pagos podrán procesarse mediante Conekta; la entrega seguirá sujeta a validación de pago, disponibilidad y coordinación logística.</p>
        <p className="leading-7">El cliente debe proporcionar datos completos de entrega, contacto en sitio y cualquier restricción de acceso para evitar retrasos o costos adicionales.</p>
      </div>
    </section>
  );
}
