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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, purchaseId } = await req.json();
    
    console.log('Verifying source code payment:', { razorpay_order_id, razorpay_payment_id, purchaseId });

    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
    if (!razorpayKeySecret) {
      throw new Error('Razorpay secret not configured');
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = createHmac('sha256', razorpayKeySecret)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      throw new Error('Invalid payment signature');
    }

    console.log('Payment signature verified');

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update purchase record
    const { error: updateError } = await supabase
      .from('purchases')
      .update({
        payment_id: razorpay_payment_id,
        payment_status: 'completed',
      })
      .eq('id', purchaseId);

    if (updateError) {
      console.error('Error updating purchase:', updateError);
      throw new Error('Failed to update purchase record');
    }

    // Fetch the source code file content from database
    const { data: fileData, error: fileError } = await supabase
      .from('product_files')
      .select('file_content')
      .eq('product_name', 'Source Code Bundle')
      .single();

    if (fileError || !fileData) {
      console.error('Error fetching file:', fileError);
      throw new Error('Failed to retrieve file');
    }

    console.log('Payment verified and file content retrieved successfully');

    return new Response(JSON.stringify({
      success: true,
      fileContent: fileData.file_content,
      fileName: 'Source_Codes.txt'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error verifying payment:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
