import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccess() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <CheckCircle2 className="mx-auto h-16 w-16 text-camhe-yellow" />
      <h1 className="mt-6 text-4xl font-black text-camhe-black">Pago recibido</h1>
      <p className="mt-4 text-lg leading-8 text-neutral-700">
        Pago recibido. Gracias por tu compra. Un asesor de CAMHE Infraestructura dará seguimiento a tu pedido.
      </p>
      <Link href="/catalogo" className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-camhe-yellow px-6 font-black text-camhe-black">
        Volver al catálogo
      </Link>
    </section>
  );
}
