-- Create table to store secure product files (not exposed to frontend)
CREATE TABLE public.product_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL UNIQUE,
  file_content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (no public access - only edge functions with service role can access)
ALTER TABLE public.product_files ENABLE ROW LEVEL SECURITY;

-- No policies = only service role can access (secure by default)

-- Add trigger for updated_at
CREATE TRIGGER update_product_files_updated_at
BEFORE UPDATE ON public.product_files
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the source code file content
INSERT INTO public.product_files (product_name, file_content) VALUES (
  'Source Code Bundle',
  'Please clone the repositories using the links below:

BEAT:  https://github.com/sumittravel25/sonic-zen-tones.git

Daily Journal:  https://github.com/SumitKSinghh/quiet-thoughts-space.git

========================================================================
             🎉 THANK YOU FOR PURCHASING THE BEAT BUNDLE 🎉
========================================================================


========================================================================
1. ACCESS YOUR REPOSITORIES
========================================================================
# Step 1: Clone the repository using the project''s Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev


========================================================================
2. ⚠️ CRITICAL CONFIGURATION (DO THIS FIRST)
========================================================================

The app is currently configured to point to the DEMO database and DEMO 
payment gateway. You must switch these to your own accounts.

--- STEP A: SUPABASE (Database & Auth) ---
1. Go to https://supabase.com and create a new project.
2. Go to Project Settings -> API.
3. Open the source code folder on your computer.
4. Look for a file named `.env` or `.env.example`.
5. Update the following lines with YOUR keys from Supabase:

   VITE_SUPABASE_URL=https://your-new-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-long-anon-key-here

--- STEP B: PAYMENT GATEWAY (Stripe / Razorpay) ---
1. Create an account on Stripe (Global) or Razorpay (India).
2. Get your "Public Key" (for Frontend) and "Secret Key" (for Backend).
3. Update the `.env` file:

   VITE_STRIPE_PUBLIC_KEY=pk_test_your_key_here
   (or)
   VITE_RAZORPAY_KEY_ID=rzp_test_your_key_here

   *IMPORTANT: If you do not change this, payments made by your users 
   will go to the original developer''s account!*

========================================================================
3. INSTALLATION & RUNNING
========================================================================

1. Open your terminal/command prompt.
2. Navigate to the project folder:
   cd beat-frontend
3. Install dependencies:
   npm install
4. Start the development server:
   npm run dev

The app should now be running at http://localhost:5173

========================================================================
4. DATABASE SETUP (SQL)
========================================================================

To make the Login and Premium check work, you need to set up the database 
tables.

1. Go to your Supabase Dashboard -> SQL Editor.
2. Open the file `database_schema.sql` found in the source code folder.
3. Copy the content and paste it into the Supabase SQL Editor.
4. Click "Run" to create the necessary tables (users, subscriptions, etc.).

========================================================================
NEED HELP?
========================================================================

If you have issues with access or setup, please contact support:
📧 info@budfi.in

Happy Coding!'
);