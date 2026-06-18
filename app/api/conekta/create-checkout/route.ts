import { NextResponse } from "next/server";
import { getProductById, toCents } from "@/lib/products";

type CheckoutItem = {
  productId: string;
  quantity: number;
};

type CheckoutCustomer = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  projectLocation?: string;
  cityState?: string;
  comments?: string;
};

const conektaApiUrl = "https://api.conekta.io/orders";

export async function POST(request: Request) {
  const privateKey = process.env.CONEKTA_PRIVATE_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

  if (!privateKey) {
    return NextResponse.json({
      status: "pending_integration",
      message: "Solicitud recibida. Un asesor de CAMHE Infraestructura se comunicará contigo para confirmar disponibilidad, envío y forma de pago."
    });
  }

  let payload: { items?: CheckoutItem[]; customer?: CheckoutCustomer };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const customer = payload.customer ?? {};
  const items = Array.isArray(payload.items) ? payload.items : [];
  const lineItems = items
    .map((item) => {
      const product = getProductById(item.productId);
      const quantity = Number.isFinite(item.quantity) ? Math.max(1, Math.floor(item.quantity)) : 1;

      if (!product?.price) return null;

      return {
        name: product.name,
        description: product.description,
        unit_price: toCents(product.price),
        quantity,
        sku: product.id,
        metadata: {
          category: product.category,
          price_type: product.priceType ?? "fixed"
        }
      };
    })
    .filter(Boolean);

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "Agrega al menos un producto con precio para crear un link de pago." }, { status: 400 });
  }

  const orderPayload = {
    currency: "MXN",
    customer_info: {
      name: customer.name || "Cliente CAMHE Infraestructura",
      email: customer.email || "info@camheinfraestructura.com.mx",
      phone: customer.phone || "5545174522"
    },
    line_items: lineItems,
    needs_shipping_contact: true,
    three_ds_mode: "smart",
    metadata: {
      source: "camhe-infraestructura-web",
      company: customer.company || "",
      project_location: customer.projectLocation || customer.cityState || "",
      city_state: customer.cityState || "",
      comments: customer.comments || ""
    },
    checkout: {
      type: "HostedPayment",
      name: "CAMHE Infraestructura",
      allowed_payment_methods: ["card", "cash", "bank_transfer"],
      success_url: `${siteUrl}/checkout/success`,
      failure_url: `${siteUrl}/checkout/cancel`,
      monthly_installments_enabled: false
    }
  };

  const response = await fetch(conektaApiUrl, {
    method: "POST",
    headers: {
      Accept: "application/vnd.conekta-v2.2.0+json",
      "Accept-Language": "es",
      "Content-Type": "application/json",
      Authorization: `Bearer ${privateKey}`
    },
    body: JSON.stringify(orderPayload)
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json({ error: "No fue posible crear el checkout de Conekta.", details: data }, { status: response.status });
  }

  const checkoutUrl = data?.checkout?.url;

  return NextResponse.json({
    status: "created",
    orderId: data?.id,
    checkoutUrl,
    data
  });
}
