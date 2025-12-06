import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHmac } from "node:crypto";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, purchaseId, currency } = await req.json();
    
    console.log('Creating source code order for:', { name, email, purchaseId, currency });

    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID');
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error('Razorpay credentials not configured');
    }

    // Determine amount based on currency (INR: 2999, USD: 34.99)
    const amount = currency === 'INR' ? 299900 : 3499; // Amount in smallest currency unit
    const orderCurrency = currency === 'INR' ? 'INR' : 'USD';

    // Create Razorpay order
    const orderResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${razorpayKeyId}:${razorpayKeySecret}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: orderCurrency,
        receipt: purchaseId,
        notes: {
          name,
          email,
          phone,
          product: 'Source Code Bundle'
        }
      }),
    });

    const orderData = await orderResponse.json();
    console.log('Razorpay order created:', orderData.id);

    if (!orderData.id) {
      throw new Error(orderData.error?.description || 'Failed to create order');
    }

    return new Response(JSON.stringify({
      orderId: orderData.id,
      amount: amount,
      currency: orderCurrency,
      keyId: razorpayKeyId,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error creating source code order:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
