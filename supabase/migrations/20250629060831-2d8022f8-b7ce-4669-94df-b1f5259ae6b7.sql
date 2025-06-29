
-- Create cafes table
CREATE TABLE public.cafes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ads_reports table for advertising reports
CREATE TABLE public.ads_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cafe_id UUID REFERENCES public.cafes(id) NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year INTEGER NOT NULL CHECK (year >= 2020),
  platform TEXT NOT NULL, -- 'meta', 'google', 'tiktok'
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  ctr DECIMAL(5,2) DEFAULT 0, -- Click Through Rate
  cpc DECIMAL(10,2) DEFAULT 0, -- Cost Per Click
  conversions INTEGER DEFAULT 0,
  roas DECIMAL(5,2) DEFAULT 0, -- Return on Ad Spend
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(cafe_id, month, year, platform)
);

-- Create content_reports table for content reports
CREATE TABLE public.content_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cafe_id UUID REFERENCES public.cafes(id) NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year INTEGER NOT NULL CHECK (year >= 2020),
  post_date DATE NOT NULL,
  caption TEXT,
  platform TEXT NOT NULL, -- 'instagram', 'facebook', 'tiktok', etc
  status TEXT NOT NULL DEFAULT 'published', -- 'published', 'draft', 'scheduled'
  image_url TEXT,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE public.cafes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ads_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_reports ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since no auth is implemented yet)
-- These policies allow all operations for now
CREATE POLICY "Allow all operations on cafes" ON public.cafes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on ads_reports" ON public.ads_reports FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on content_reports" ON public.content_reports FOR ALL USING (true) WITH CHECK (true);

-- Insert sample data
INSERT INTO public.cafes (name, address, phone, email, description, status) VALUES
('Kafe Santai', 'Jl. Merdeka No. 123, Jakarta Selatan', '021-12345678', 'info@kafesantai.com', 'Kafe cozy dengan suasana santai dan menu kopi premium', 'active'),
('Coffee Corner', 'Jl. Sudirman No. 456, Jakarta Pusat', '021-87654321', 'hello@coffeecorner.com', 'Coffee shop modern dengan konsep minimalis', 'active'),
('Warung Kopi Asik', 'Jl. Kemang Raya No. 789, Jakarta Selatan', '021-11223344', 'contact@warungkopiasik.com', 'Warung kopi tradisional dengan cita rasa autentik', 'inactive');
