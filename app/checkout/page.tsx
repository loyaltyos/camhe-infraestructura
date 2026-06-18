"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatPrice, formatProductPrice } from "@/lib/products";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState(
    "Solicitud recibida. Un asesor de CAMHE Infraestructura se comunicará contigo para confirmar disponibilidad, envío y forma de pago."
  );
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const customer = {
      name: String(form.get("name") || ""),
      company: String(form.get("company") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      cityState: String(form.get("cityState") || ""),
      comments: String(form.get("comments") || "")
    };

    try {
      const response = await fetch("/api/conekta/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items: items.map((item) => ({ productId: item.product.id, quantity: item.quantity }))
        })
      });
      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      setMessage("Solicitud recibida. Un asesor de CAMHE Infraestructura se comunicará contigo para confirmar disponibilidad, envío y forma de pago.");
      setSubmitted(true);
      clearCart();
    } catch {
      setMessage("Solicitud recibida. Un asesor de CAMHE Infraestructura se comunicará contigo para confirmar disponibilidad, envío y forma de pago.");
      setSubmitted(true);
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <CheckCircle2 className="mx-auto h-16 w-16 text-camhe-yellow" />
        <h1 className="mt-6 text-4xl font-black text-camhe-black">Solicitud recibida</h1>
        <p className="mt-4 text-lg leading-8 text-neutral-700">
          {message}
        </p>
        <Link href="/catalogo" className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-camhe-yellow px-6 font-black text-camhe-black">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-black uppercase tracking-wide text-camhe-yellow">Checkout</p>
      <h1 className="mt-3 text-4xl font-black text-camhe-black">Solicitud de cotización</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={onSubmit} className="grid gap-5 rounded-lg bg-white p-6 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              Nombre completo
              <input name="name" required className="h-11 rounded-md border border-neutral-300 px-3 font-normal" />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Empresa <span className="font-normal text-neutral-500">Opcional</span>
              <input name="company" className="h-11 rounded-md border border-neutral-300 px-3 font-normal" />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Teléfono
              <input name="phone" required className="h-11 rounded-md border border-neutral-300 px-3 font-normal" />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Correo electrónico
              <input name="email" type="email" required className="h-11 rounded-md border border-neutral-300 px-3 font-normal" />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-bold">
            Ciudad / Estado
            <input name="cityState" required className="h-11 rounded-md border border-neutral-300 px-3 font-normal" />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Comentarios de proyecto
            <textarea name="comments" rows={5} className="rounded-md border border-neutral-300 p-3 font-normal" placeholder="Volumen requerido, medidas, fecha estimada, condiciones de entrega o especificaciones." />
          </label>
          <p className="rounded-md bg-neutral-100 p-4 text-sm leading-6 text-neutral-700">
            Pago en línea pendiente de integración con Conekta.
          </p>
          <button type="submit" disabled={loading} className="h-12 rounded-md bg-camhe-yellow px-6 font-black text-camhe-black disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? "Enviando..." : "Enviar solicitud"}
          </button>
        </form>

        <aside className="h-fit rounded-lg bg-camhe-black p-6 text-white">
          <h2 className="text-xl font-black">Resumen</h2>
          <div className="mt-5 space-y-4">
            {items.length === 0 ? (
              <p className="text-sm text-neutral-300">No hay productos en el carrito. Puedes enviar una solicitud general o regresar al catálogo.</p>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="border-b border-neutral-800 pb-3 text-sm">
                  <p className="font-bold">{item.product.name}</p>
                  <p className="mt-1 text-neutral-300">Cantidad: {item.quantity} · {formatProductPrice(item.product)}</p>
                </div>
              ))
            )}
          </div>
          <div className="mt-5 border-t border-neutral-800 pt-5">
            <p className="text-sm text-neutral-300">Subtotal estimado</p>
            <p className="mt-1 text-2xl font-black">{formatPrice(subtotal)} MXN</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
