import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { connectDb } from '@/lib/conectDb'
// const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export async function POST(request: Request) {
  const body = await request.text()

  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err })
  }

  // Get the ID and type
  const eventType = event.type

  // CREATE
  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || '',
      buyer: metadata?.buyer || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
    }

    // const db = await connectDb();
    // const ordersCollection = await db!.collection('orders');

    // const newOrder = await ordersCollection.insertOne(order);
    return NextResponse.json({ message: 'OK', order })
  }

  return new Response('', { status: 200 })
}