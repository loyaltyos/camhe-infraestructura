import { NextResponse } from "next/server";

const paidEvents = new Set(["charge.paid", "order.paid"]);
const failedEvents = new Set(["charge.payment_failed", "order.payment_failed"]);

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-conekta-signature") || request.headers.get("conekta-signature");
  const webhookSecret = process.env.CONEKTA_WEBHOOK_SECRET;

  // Configure this endpoint in production as:
  // https://your-domain.com/api/conekta/webhook
  // Keep CONEKTA_WEBHOOK_SECRET in Vercel when signature verification is enabled in Conekta.
  if (webhookSecret && !signature) {
    console.warn("Conekta webhook received without signature header.");
  }

  let event: { type?: string; data?: { object?: { id?: string; order_id?: string } } };

  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ received: true, ignored: "invalid_json" });
  }

  const eventType = event.type ?? "unknown";
  const objectId = event.data?.object?.id;
  const orderId = event.data?.object?.order_id ?? objectId;

  if (paidEvents.has(eventType)) {
    console.info("Conekta payment successful", { eventType, orderId });
  } else if (failedEvents.has(eventType)) {
    console.warn("Conekta payment failed", { eventType, orderId });
  }

  return NextResponse.json({ received: true });
}
