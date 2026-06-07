import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const VARIANT_NAMES: Record<string, string> = {
  standard: "Vorn Standard",
  pro: "Vorn Pro",
};

const COLOR_NAMES: Record<string, string> = {
  midnight: "Midnight Black",
  pearl: "Pearl White",
  sage: "Sage",
};

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
    }

    const stripe = new Stripe(secretKey);
    const { variantId, colorId, qty, currency, unitAmount } = await req.json();

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency ?? "eur",
            product_data: {
              name: VARIANT_NAMES[variantId] ?? "Vorn Earbuds",
              description: `Color: ${COLOR_NAMES[colorId] ?? colorId}`,
            },
            unit_amount: unitAmount,
          },
          quantity: qty,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#order`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
