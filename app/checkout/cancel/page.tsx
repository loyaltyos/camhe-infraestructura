import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CheckoutCancel() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <XCircle className="mx-auto h-16 w-16 text-camhe-yellow" />
      <h1 className="mt-6 text-4xl font-black text-camhe-black">Pago no completado</h1>
      <p className="mt-4 text-lg leading-8 text-neutral-700">
        No se completó el pago. Puedes volver al carrito o solicitar apoyo de un asesor de CAMHE Infraestructura.
      </p>
      <Link href="/carrito" className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-camhe-yellow px-6 font-black text-camhe-black">
        Volver al carrito
      </Link>
    </section>
  );
}
