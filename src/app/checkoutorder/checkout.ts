
import Stripe from "stripe";

export const checkoutOrder = async (order: Order): Promise<void> => {
  
  const liveUrl:string = process.env.NEXT_PUBLIC_Live_URL || ''; 
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
  const price = Number(order.eventPrice) * 100;
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: order?.eventName,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order?.eventId,
        buyer: order?.buyer,
      },
      mode: "payment",
      success_url: `${liveUrl}/profile`,
      cancel_url: `${liveUrl}/`,
    });
    
    
    if (session && session?.url) {
      window.location.href = session?.url;
    } else {
      console.error('Session URL not found in session object:', session);
    }
  } catch (error) {
    console.error("Stripe error:", error);
  }
};

type Order = {
  eventId: string;
  eventName: string;
  eventPrice: number;
  buyer: string;
};
