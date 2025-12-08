-- Customer Dashboard Tables
-- Run this script to create all necessary tables for the customer dashboard feature

-- 1. Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Subscriptions table (manual approval by admin)
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Project types (admin-configurable)
CREATE TABLE IF NOT EXISTS project_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- icon name or emoji
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Project type items (required items for each project type)
CREATE TABLE IF NOT EXISTS project_type_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_type_id UUID NOT NULL REFERENCES project_types(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT, -- what this item is
  why_needed TEXT, -- why we need this item
  what_we_do TEXT, -- what we will do with this item
  is_required BOOLEAN DEFAULT true,
  file_types TEXT[], -- allowed file extensions e.g. ['pdf', 'xlsx', 'csv']
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Customer projects
CREATE TABLE IF NOT EXISTS customer_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  project_type_id UUID NOT NULL REFERENCES project_types(id),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'review', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Project files (uploaded files)
CREATE TABLE IF NOT EXISTS project_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES customer_projects(id) ON DELETE CASCADE,
  item_id UUID REFERENCES project_type_items(id), -- which item this file is for
  request_id UUID, -- if uploaded in response to a request
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  file_type TEXT,
  uploaded_by UUID NOT NULL REFERENCES profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Item requests (admin requests specific items from customers)
CREATE TABLE IF NOT EXISTS item_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES customer_projects(id) ON DELETE CASCADE,
  requested_by UUID NOT NULL REFERENCES profiles(id), -- admin who requested
  title TEXT NOT NULL,
  description TEXT, -- what is needed
  why_needed TEXT, -- why this is needed
  file_types TEXT[], -- allowed file extensions
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'fulfilled', 'cancelled')),
  due_date TIMESTAMPTZ,
  fulfilled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key for project_files.request_id
ALTER TABLE project_files 
ADD CONSTRAINT fk_project_files_request 
FOREIGN KEY (request_id) REFERENCES item_requests(id) ON DELETE SET NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_project_type_items_project_type_id ON project_type_items(project_type_id);
CREATE INDEX IF NOT EXISTS idx_customer_projects_user_id ON customer_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_customer_projects_status ON customer_projects(status);
CREATE INDEX IF NOT EXISTS idx_project_files_project_id ON project_files(project_id);
CREATE INDEX IF NOT EXISTS idx_item_requests_project_id ON item_requests(project_id);
CREATE INDEX IF NOT EXISTS idx_item_requests_status ON item_requests(status);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_type_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE item_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: users can read their own profile, admins can read all
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Subscriptions: users can view their own, admins can view/update all
CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create own subscription" ON subscriptions
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all subscriptions" ON subscriptions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update subscriptions" ON subscriptions
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Project types: everyone can read active types, admins can manage
CREATE POLICY "Anyone can view active project types" ON project_types
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage project types" ON project_types
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Project type items: everyone can read, admins can manage
CREATE POLICY "Anyone can view project type items" ON project_type_items
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage project type items" ON project_type_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Customer projects: users can manage their own, admins can view all
CREATE POLICY "Users can view own projects" ON customer_projects
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create own projects" ON customer_projects
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own projects" ON customer_projects
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all projects" ON customer_projects
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update all projects" ON customer_projects
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Project files: users can manage files in their projects, admins can view all
CREATE POLICY "Users can view files in own projects" ON project_files
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM customer_projects WHERE id = project_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can upload files to own projects" ON project_files
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM customer_projects WHERE id = project_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can delete own uploaded files" ON project_files
  FOR DELETE USING (uploaded_by = auth.uid());

CREATE POLICY "Admins can view all files" ON project_files
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Item requests: users can view requests for their projects, admins can manage all
CREATE POLICY "Users can view requests for own projects" ON item_requests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM customer_projects WHERE id = project_id AND user_id = auth.uid())
  );

CREATE POLICY "Admins can manage item requests" ON item_requests
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  -- Auto-create pending subscription
  INSERT INTO public.subscriptions (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_types_updated_at BEFORE UPDATE ON project_types
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_type_items_updated_at BEFORE UPDATE ON project_type_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customer_projects_updated_at BEFORE UPDATE ON customer_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_item_requests_updated_at BEFORE UPDATE ON item_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
