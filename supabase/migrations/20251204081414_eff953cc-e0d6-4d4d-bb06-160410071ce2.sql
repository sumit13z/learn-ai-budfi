-- Create purchases table to store buyer information
CREATE TABLE public.purchases (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    product_name TEXT NOT NULL DEFAULT 'AI Masterclass Materials',
    amount INTEGER NOT NULL DEFAULT 99,
    payment_id TEXT,
    payment_status TEXT NOT NULL DEFAULT 'pending',
    download_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Allow insert for anyone (to create purchase records)
CREATE POLICY "Anyone can create purchases" 
ON public.purchases 
FOR INSERT 
WITH CHECK (true);

-- Allow users to read their own purchase by email
CREATE POLICY "Users can view their purchases by email" 
ON public.purchases 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_purchases_updated_at
BEFORE UPDATE ON public.purchases
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();