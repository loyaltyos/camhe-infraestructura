import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a CAMHE Infraestructura para cotizar equipamiento urbano, vial y modular."
};

export default function Contacto() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-camhe-yellow">Contacto</p>
      <h1 className="mt-3 text-4xl font-black text-camhe-black">Cotiza tu proyecto</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg bg-camhe-black p-6 text-white">
          <h2 className="text-2xl font-black">Datos de atención</h2>
          <div className="mt-6 space-y-5 text-neutral-200">
            <p className="flex gap-3"><Phone className="h-5 w-5 text-camhe-yellow" /> {contact.phone}</p>
            <p className="flex gap-3"><Mail className="h-5 w-5 text-camhe-yellow" /> {contact.email}</p>
            <p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-camhe-yellow" /> {contact.address}</p>
          </div>
        </div>
        <form className="grid gap-5 rounded-lg bg-white p-6 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              Nombre
              <input className="h-11 rounded-md border border-neutral-300 px-3 font-normal" />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Empresa
              <input className="h-11 rounded-md border border-neutral-300 px-3 font-normal" />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-bold">
            Correo
            <input type="email" className="h-11 rounded-md border border-neutral-300 px-3 font-normal" />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Mensaje
            <textarea rows={6} className="rounded-md border border-neutral-300 p-3 font-normal" />
          </label>
          <button type="button" className="h-12 rounded-md bg-camhe-yellow px-6 font-black text-camhe-black">
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}
