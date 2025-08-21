import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { orderTable } from "@/db/schema";

export const POST = async (req: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new Response("Missing Stripe keys", { status: 400 });
  }
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing Stripe signature", { status: 400 });
  }
  const text = await req.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  if (event.type === "checkout.session.completed") {
    console.log("Checkout session completed");
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    if (!orderId) {
      return new Response("Missing order id", { status: 400 });
    }
    await db
      .update(orderTable)
      .set({ status: "paid" })
      .where(eq(orderTable.id, orderId));
  }

  return NextResponse.json({ received: true });
};
