-- Create combined resources table
CREATE TABLE IF NOT EXISTS resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT,
  type TEXT NOT NULL CHECK (type IN ('template', 'policy', 'framework')),
  content JSONB,
  preview_image_url TEXT,
  file_type TEXT,
  file_size BIGINT,
  "downloadUrl" TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_resources_published ON resources(published);
CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(type);
CREATE INDEX IF NOT EXISTS idx_resources_slug ON resources(slug);

-- Enable RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- RLS policy for public read access to published resources
CREATE POLICY "Anyone can view published resources" 
  ON resources 
  FOR SELECT 
  USING (published = true);

-- RLS policy for authenticated users to view all resources
CREATE POLICY "Authenticated users can view all resources" 
  ON resources 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- RLS policy for authors to manage their own resources
CREATE POLICY "Authors can manage own resources" 
  ON resources 
  FOR ALL 
  TO authenticated 
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Migrate data from templates table
INSERT INTO resources (id, title, slug, description, category, type, content, preview_image_url, file_type, file_size, "downloadUrl", published, created_at, updated_at, created_by)
SELECT 
  id,
  title,
  slug,
  description,
  category,
  'template' as type,
  content,
  preview_image_url,
  file_type,
  file_size,
  "downloadUrl",
  published,
  created_at,
  updated_at,
  created_by
FROM templates
ON CONFLICT (slug) DO NOTHING;

-- Migrate data from policies table
INSERT INTO resources (id, title, slug, description, category, type, content, "downloadUrl", published, created_at, updated_at)
SELECT 
  id,
  title,
  slug,
  description,
  NULL as category,
  'policy' as type,
  content,
  "downloadUrl",
  published,
  created_at,
  updated_at
FROM policies
ON CONFLICT (slug) DO NOTHING;
