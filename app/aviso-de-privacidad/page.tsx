import type { Metadata } from "next";

export const metadata: Metadata = { title: "Aviso de privacidad" };

export default function AvisoPrivacidad() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-camhe-yellow">Legal</p>
      <h1 className="mt-3 text-4xl font-black text-camhe-black">Aviso de privacidad</h1>
      <div className="mt-8 space-y-5 rounded-lg bg-white p-6 text-neutral-700 shadow-sm">
        <p className="leading-7">CAMHE Infraestructura utiliza los datos enviados en formularios únicamente para atender solicitudes de información, cotización, compra, facturación, entrega y seguimiento comercial.</p>
        <p className="leading-7">Los datos pueden incluir nombre, empresa, teléfono, correo, ubicación del proyecto, datos de facturación y comentarios técnicos o comerciales relacionados con la solicitud.</p>
        <p className="leading-7">La información no se vende a terceros. Puede compartirse internamente con personal autorizado del Grupo CAMHE, asesores logísticos o proveedores de pago cuando sea necesario para atender el pedido.</p>
        <p className="leading-7">Cuando la pasarela esté activa, los pagos podrán procesarse mediante Conekta. CAMHE Infraestructura no almacena datos completos de tarjetas bancarias en este sitio.</p>
        <p className="leading-7">Para dudas o solicitudes relacionadas con datos personales, escribe a info@camheinfraestructura.com.mx.</p>
      </div>
    </section>
  );
}
