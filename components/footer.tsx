import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { contact } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-camhe-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-black uppercase">CAMHE Infraestructura</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-neutral-300">
            Equipamiento urbano, vial y modular para constructoras, municipios, fraccionamientos, parques industriales y desarrollos urbanos.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase text-camhe-yellow">Contacto</p>
          <div className="mt-4 space-y-3 text-sm text-neutral-300">
            <p className="flex gap-2"><Phone className="h-4 w-4 text-camhe-yellow" /> {contact.phone}</p>
            <p className="flex gap-2"><Mail className="h-4 w-4 text-camhe-yellow" /> {contact.email}</p>
            <p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-camhe-yellow" /> {contact.address}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase text-camhe-yellow">Legal</p>
          <div className="mt-4 grid gap-2 text-sm text-neutral-300">
            <Link href="/terminos-y-condiciones" className="hover:text-camhe-yellow">Términos y condiciones</Link>
            <Link href="/aviso-de-privacidad" className="hover:text-camhe-yellow">Aviso de privacidad</Link>
            <Link href="/politica-de-devoluciones" className="hover:text-camhe-yellow">Política de devoluciones</Link>
            <Link href="/politica-de-envios" className="hover:text-camhe-yellow">Política de envíos</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-800 px-4 py-4 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} CAMHE Infraestructura. Todos los derechos reservados.
      </div>
    </footer>
  );
}
