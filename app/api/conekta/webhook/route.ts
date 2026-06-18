import { NextResponse } from "next/server";

const handledEvents = new Set([
  "order.paid",
  "order.pending_payment",
  "order.declined",
  "order.expired",
  "order.canceled",
  "charge.paid",
  "charge.pending_payment",
  "charge.declined"
]);

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-conekta-signature") || request.headers.get("conekta-signature");
  const webhookSecret = process.env.CONEKTA_WEBHOOK_SECRET;

  let eventType = "unknown";
  let orderId: string | undefined;

  try {
    const event = JSON.parse(rawBody);
    eventType = event?.type ?? "unknown";
    orderId = event?.data?.object?.id;
  } catch {
    return NextResponse.json({ received: true, ignored: "invalid_json" });
  }

  if (webhookSecret && !signature) {
    return NextResponse.json({ received: true, warning: "missing_signature" });
  }

  if (handledEvents.has(eventType)) {
    console.info("Conekta webhook received", { eventType, orderId });
  }

  return NextResponse.json({ received: true, eventType, orderId });
}
