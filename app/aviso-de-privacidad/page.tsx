import type { Metadata } from "next";

export const metadata: Metadata = { title: "Aviso de privacidad" };

export default function AvisoPrivacidad() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-camhe-yellow">Legal</p>
      <h1 className="mt-3 text-4xl font-black text-camhe-black">Aviso de privacidad</h1>
      <div className="mt-8 space-y-5 rounded-lg bg-white p-6 text-neutral-700 shadow-sm">
        <p className="leading-7">CAMHE Infraestructura utiliza los datos enviados en formularios únicamente para atender solicitudes de información, cotización y seguimiento comercial.</p>
        <p className="leading-7">Los datos pueden incluir nombre, empresa, teléfono, correo, ubicación del proyecto y comentarios técnicos o comerciales relacionados con la solicitud.</p>
        <p className="leading-7">La información no se vende a terceros. Puede compartirse internamente con personal autorizado del Grupo CAMHE para responder y coordinar la atención del proyecto.</p>
        <p className="leading-7">Para dudas o solicitudes relacionadas con datos personales, escribe a info@camheiluminacion.com como correo corporativo temporal de contacto CAMHE.</p>
      </div>
    </section>
  );
}
