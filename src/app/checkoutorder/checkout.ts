import Stripe from "stripe";

export const checkoutOrder = async (order: Order): Promise<void> => {
  const liveUrl: string = process.env.NEXT_PUBLIC_LIVE_URL || "";
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20", // Specify API version if needed
  });
  const price = Math.round(Number(order.eventPrice) * 100); // Ensure price is in cents
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: order.eventName,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyer: order.buyer,
      },
      mode: "payment",
      success_url: `${liveUrl}/profile`,
      cancel_url: `${liveUrl}/`,
    });
    
    // Assuming this code runs in a browser environment (React component, etc.)
    if (session && session.url) {
      window.location.href = session.url; // Redirect to Stripe checkout page
    } else {
      console.error('Session URL not found in session object:', session);
    }
  } catch (error) {
    console.error("Stripe error:", error);
    // Handle error (e.g., show user a message)
    throw new Error("Failed to create Stripe checkout session");
  }
};

type Order = {
  eventId: string;
  eventName: string;
  eventPrice: number;
  buyer: string;
};
