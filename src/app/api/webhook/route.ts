import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export async function POST(request: Request) {
  console.log( request)
  const body = await request.text();
  const sig = headers().get("stripe-signature") as string;
  const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!;
  console.log('req headers',headers().get("stripe-signature"))
  console.log(body)

  let event: Stripe.Event;

  try {
    if (!body) return new Response("not found");
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || "",
      buyer: metadata?.buyer || "",
      totalAmount: amount_total ? (amount_total / 100).toString() : "0",
      createdAt: new Date(),
    };

    // Implement database logic or other actions here

    return NextResponse.json({ message: "OK", order });
  }

  return new Response("", { status: 200 });
}
