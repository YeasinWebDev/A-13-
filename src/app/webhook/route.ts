import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
// import { connectDb } from '@/lib/connectDb';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript:true
});

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('Stripe-Signature')!;
  const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!;

  let event:Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object;

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || '',
      buyer: metadata?.buyer || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
    };

    // const db = await connectDb();
    // const ordersCollection = await db!.collection('orders');

    // const newOrder = await ordersCollection.insertOne(order);
    return NextResponse.json({ message: 'OK', order });
  }

  return new Response('', { status: 200 });
}
