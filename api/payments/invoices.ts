import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-04-30.basil',
});

export async function POST(req: Request) {
  try {
    const { customerId, orderId, amount, currency } = await req.json();

    const invoiceItem = await stripe.invoiceItems.create({
      customer: customerId,
      amount,
      currency,
      description: `Invoice for Order ID: ${orderId}`,
    });

    const invoice = await stripe.invoices.create({
      customer: customerId,
      auto_advance: true, // Automatically finalize the invoice
    });

    return NextResponse.json({ invoiceId: invoice.id });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 },
    );
  }
}
