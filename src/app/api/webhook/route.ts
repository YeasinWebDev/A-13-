import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { connectDb } from "@/lib/conectDb";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export async function POST(request: Request) {
  const body = await request.text();
  const signatures = headers().get("stripe-signature") as string;
  const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signatures, endpointSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 200 });
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

    const db = await connectDb();
    if (!db)
      return NextResponse.json({ massage: "Database connection failed" });

    const ordersCollection = await db.collection("orders");
    const newOrder = await ordersCollection.insertOne(order);

    return NextResponse.json({ message: "OK", newOrder });
  }

  return new Response("", { status: 200 });
}
