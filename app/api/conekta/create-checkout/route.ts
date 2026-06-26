import { NextResponse } from "next/server";
import { getProductById, toCents } from "@/lib/products";

type CheckoutItem = {
  productId?: string;
  quantity?: number;
};

type CheckoutCustomer = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  cityState?: string;
  comments?: string;
};

type ConektaLineItem = {
  name: string;
  unit_price: number;
  quantity: number;
};

const conektaApiUrl = "https://api.conekta.io/orders";
const quoteMessage =
  "Solicitud recibida. Un asesor de CAMHE Infraestructura se comunicará contigo para confirmar disponibilidad, envío y forma de pago.";

const cleanText = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const cleanEmail = (value: unknown) => cleanText(value).toLowerCase();
const cleanPhone = (value: unknown) => cleanText(value).replace(/[^\d+]/g, "");

function getConektaStatus() {
  return Boolean(process.env.CONEKTA_PRIVATE_KEY);
}

function validateCustomer(customer: CheckoutCustomer) {
  const normalized = {
    name: cleanText(customer.name),
    email: cleanEmail(customer.email),
    phone: cleanPhone(customer.phone),
    company: cleanText(customer.company),
    cityState: cleanText(customer.cityState),
    comments: cleanText(customer.comments)
  };

  if (!normalized.name || !normalized.email || !normalized.phone || !normalized.cityState) {
    return { error: "Completa nombre, email, teléfono y ciudad/estado para continuar." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
    return { error: "Ingresa un email válido para continuar." };
  }

  return { customer: normalized };
}

function buildLineItems(items: CheckoutItem[]) {
  const lineItems: ConektaLineItem[] = [];
  const invalidItems: string[] = [];

  for (const item of items) {
    const productId = cleanText(item.productId);
    const product = getProductById(productId);
    const quantity = Number.isFinite(item.quantity) ? Math.max(1, Math.floor(Number(item.quantity))) : 1;

    if (!product || !product.price) {
      invalidItems.push(productId || "unknown");
      continue;
    }

    lineItems.push({
      name: product.name,
      unit_price: toCents(product.price),
      quantity
    });
  }

  return {
    lineItems,
    invalidItems,
    totalCents: lineItems.reduce((total, item) => total + item.unit_price * item.quantity, 0)
  };
}

export async function GET() {
  return NextResponse.json({ conektaConfigured: getConektaStatus() });
}

export async function POST(request: Request) {
  let payload: { items?: CheckoutItem[]; customer?: CheckoutCustomer };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const customerResult = validateCustomer(payload.customer ?? {});
  if ("error" in customerResult) {
    return NextResponse.json({ error: customerResult.error }, { status: 400 });
  }

  const items = Array.isArray(payload.items) ? payload.items : [];
  const { lineItems, invalidItems, totalCents } = buildLineItems(items);

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "Agrega al menos un producto con precio para continuar." }, { status: 400 });
  }

  if (invalidItems.length > 0) {
    return NextResponse.json({ error: "El carrito contiene productos no disponibles para pago en línea." }, { status: 400 });
  }

  const privateKey = process.env.CONEKTA_PRIVATE_KEY;
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin).replace(/\/$/, "");
  const customer = customerResult.customer;

  if (!privateKey) {
    return NextResponse.json({
      status: "quote",
      message: quoteMessage,
      cartTotalCents: totalCents
    });
  }

  const orderPayload = {
    currency: "MXN",
    customer_info: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone
    },
    line_items: lineItems,
    metadata: {
      source: "camhe_infraestructura",
      environment: "production",
      customer_phone: customer.phone,
      customer_company: customer.company,
      customer_city: customer.cityState,
      customer_comments: customer.comments,
      cart_total_cents: totalCents
    },
    checkout: {
      type: "HostedPayment",
      name: "CAMHE Infraestructura",
      allowed_payment_methods: ["card", "cash", "bank_transfer"],
      success_url: `${siteUrl}/checkout/success`,
      failure_url: `${siteUrl}/checkout/cancel`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      monthly_installments_enabled: false
    }
  };

  try {
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
      return NextResponse.json({ error: "No fue posible crear el checkout de Conekta." }, { status: response.status });
    }

    const checkoutUrl = data?.checkout?.url;

    if (!checkoutUrl) {
      return NextResponse.json({ error: "Conekta no devolvió una URL de pago." }, { status: 502 });
    }

    return NextResponse.json({
      status: "created",
      orderId: data?.id,
      checkoutUrl
    });
  } catch {
    return NextResponse.json({ error: "No fue posible conectar con Conekta. Intenta de nuevo o solicita apoyo por WhatsApp." }, { status: 502 });
  }
}
