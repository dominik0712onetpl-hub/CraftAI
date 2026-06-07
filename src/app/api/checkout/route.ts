import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
    }

    const stripe = new Stripe(secretKey);
    const { variantId, colorId, qty, currency, unitAmount } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: unitAmount * qty,
      currency: currency ?? "eur",
      automatic_payment_methods: { enabled: true },
      metadata: { variantId, colorId, qty: String(qty) },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
