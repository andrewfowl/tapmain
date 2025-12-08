-- Fix infinite recursion in profiles RLS policy
-- The issue is that policies were checking profiles table to determine access,
-- which triggers the same policy check, causing infinite recursion.

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- Create fixed policies using auth.uid() directly instead of subqueries to profiles
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile  
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- For admin access, we need a different approach since we can't query profiles
-- We'll use a security definer function to check admin role

-- Create a secure function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE id = auth.uid();
  RETURN user_role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Now create admin policies using the function
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (is_admin() OR auth.uid() = id);

-- Drop the simple user view policy since admin policy covers both cases
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;

CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (is_admin() OR auth.uid() = id);

-- Drop the simple user update policy since admin policy covers both cases  
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Fix subscriptions policies
DROP POLICY IF EXISTS "Users can view own subscription" ON subscriptions;
DROP POLICY IF EXISTS "Admins can manage all subscriptions" ON subscriptions;

CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Admins can manage all subscriptions" ON subscriptions
  FOR ALL USING (is_admin());

-- Fix customer_projects policies  
DROP POLICY IF EXISTS "Users can view own projects" ON customer_projects;
DROP POLICY IF EXISTS "Users can create own projects" ON customer_projects;
DROP POLICY IF EXISTS "Admins can manage all projects" ON customer_projects;

CREATE POLICY "Users can view own projects" ON customer_projects
  FOR SELECT USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Users can create own projects" ON customer_projects
  FOR INSERT WITH CHECK (auth.uid() = user_id OR is_admin());

CREATE POLICY "Users can update own projects" ON customer_projects
  FOR UPDATE USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Admins can delete projects" ON customer_projects
  FOR DELETE USING (is_admin());

-- Fix project_files policies
DROP POLICY IF EXISTS "Users can view own project files" ON project_files;
DROP POLICY IF EXISTS "Users can upload to own projects" ON project_files;
DROP POLICY IF EXISTS "Users can delete own files" ON project_files;
DROP POLICY IF EXISTS "Admins can manage all files" ON project_files;

CREATE POLICY "Users can view own project files" ON project_files
  FOR SELECT USING (
    is_admin() OR 
    EXISTS (SELECT 1 FROM customer_projects WHERE id = project_files.project_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can upload to own projects" ON project_files
  FOR INSERT WITH CHECK (
    is_admin() OR
    EXISTS (SELECT 1 FROM customer_projects WHERE id = project_files.project_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can delete own files" ON project_files
  FOR DELETE USING (
    is_admin() OR
    EXISTS (SELECT 1 FROM customer_projects WHERE id = project_files.project_id AND user_id = auth.uid())
  );

-- Fix item_requests policies
DROP POLICY IF EXISTS "Users can view own requests" ON item_requests;
DROP POLICY IF EXISTS "Users can update own requests" ON item_requests;
DROP POLICY IF EXISTS "Admins can manage all requests" ON item_requests;

CREATE POLICY "Users can view own requests" ON item_requests
  FOR SELECT USING (
    is_admin() OR
    EXISTS (SELECT 1 FROM customer_projects WHERE id = item_requests.project_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can update own requests" ON item_requests
  FOR UPDATE USING (
    is_admin() OR
    EXISTS (SELECT 1 FROM customer_projects WHERE id = item_requests.project_id AND user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all requests" ON item_requests
  FOR ALL USING (is_admin());

-- Fix project_types policies (should be viewable by all authenticated users)
DROP POLICY IF EXISTS "Anyone can view project types" ON project_types;
DROP POLICY IF EXISTS "Admins can manage project types" ON project_types;

CREATE POLICY "Anyone can view project types" ON project_types
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage project types" ON project_types
  FOR ALL USING (is_admin());

-- Fix project_type_items policies
DROP POLICY IF EXISTS "Anyone can view project type items" ON project_type_items;
DROP POLICY IF EXISTS "Admins can manage project type items" ON project_type_items;

CREATE POLICY "Anyone can view project type items" ON project_type_items
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage project type items" ON project_type_items
  FOR ALL USING (is_admin());
