# Fix Storage RLS Policies

The error "new row violates row-level security policy" means your storage policies aren't set up correctly. Here's how to fix it:

## Quick Fix: Use SQL Editor

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Click **New query**
3. Copy and paste this complete policy set:

```sql
-- ============================================
-- STORAGE POLICIES FOR ALL BUCKETS
-- ============================================

-- Books bucket policies
CREATE POLICY IF NOT EXISTS "Users can upload own books"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'books' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can read own books"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'books' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can delete own books"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'books' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Notes bucket policies
CREATE POLICY IF NOT EXISTS "Users can upload own notes"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'notes' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can read own notes"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'notes' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can delete own notes"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'notes' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Highlights bucket policies
CREATE POLICY IF NOT EXISTS "Users can upload own highlights"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'highlights' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can read own highlights"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'highlights' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can delete own highlights"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'highlights' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Maps bucket policies
CREATE POLICY IF NOT EXISTS "Users can upload own maps"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'maps' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can read own maps"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'maps' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can delete own maps"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'maps' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Puzzles bucket policies
CREATE POLICY IF NOT EXISTS "Users can upload own puzzles"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'puzzles' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can read own puzzles"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'puzzles' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can delete own puzzles"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'puzzles' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Userdata bucket policies
CREATE POLICY IF NOT EXISTS "Users can upload own userdata"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'userdata' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can read own userdata"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'userdata' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY IF NOT EXISTS "Users can delete own userdata"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'userdata' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

4. Click **Run** to execute

## Verify Policies

After running the SQL:

1. Go to **Storage** → Click on a bucket (e.g., `userdata`)
2. Click **Policies** tab
3. You should see 3 policies:
   - "Users can upload own [bucket]"
   - "Users can read own [bucket]"
   - "Users can delete own [bucket]"

Repeat for all 6 buckets.

## Test Again

1. Make sure you're **authenticated** (sign in if needed)
2. Go to `/test-supabase`
3. Click **Run Tests** again

The storage test should now pass!

## If Still Getting Errors

### "Cannot list buckets"

- This is OK! The test will try accessing a bucket directly instead
- As long as you can upload to `userdata`, storage is working

### "Not authenticated"

- You need to sign in first
- Storage policies require authentication
- Create a simple auth page or use Supabase Auth

### "Policy violation" persists

- Check that policies use `(storage.foldername(name))[1]` syntax
- Verify bucket names match exactly (case-sensitive)
- Make sure you're authenticated before testing
