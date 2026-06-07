import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { error: "Brak STRIPE_SECRET_KEY w tym środowisku Vercel. Dodaj klucz dla Production + Preview i wykonaj nowy deploy." },
        { status: 503 },
      );
    }
    if (!/^sk_(test|live)_/.test(secretKey)) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY ma zły format — musi zaczynać się od sk_test_ lub sk_live_ (nie pk_)." },
        { status: 503 },
      );
    }

    const stripe = new Stripe(secretKey);
    const { variantId, colorId, qty, currency, unitAmount } = await req.json();

    if (!unitAmount || unitAmount < 1) {
      return NextResponse.json({ error: "Nieprawidłowa kwota." }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: unitAmount * (qty ?? 1),
      currency: currency ?? "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        variantId: variantId ?? "",
        colorId: colorId ?? "",
        qty: String(qty ?? 1),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
