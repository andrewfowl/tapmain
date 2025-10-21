-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL UNIQUE,
  source TEXT, -- Where they subscribed from (footer, contact form, etc.)
  ip_address TEXT, -- For rate limiting
  user_agent TEXT, -- For bot detection
  confirmed BOOLEAN DEFAULT FALSE,
  unsubscribed BOOLEAN DEFAULT FALSE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);

-- Create index on created_at for rate limiting queries
CREATE INDEX IF NOT EXISTS idx_newsletter_created_at ON newsletter_subscriptions(created_at);

-- Enable Row Level Security
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for public subscription)
CREATE POLICY "Allow public newsletter subscriptions" ON newsletter_subscriptions
  FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated users to view all subscriptions
CREATE POLICY "Allow authenticated users to view subscriptions" ON newsletter_subscriptions
  FOR SELECT USING (auth.role() = 'authenticated');
