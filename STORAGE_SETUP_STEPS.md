# Storage Setup - Steps 2-5

## Step 2: Create Storage Buckets

1. In your Supabase dashboard, click **Storage** in the left sidebar
2. Click **New bucket** button
3. Create each bucket with these settings:

### Bucket 1: `books`

- **Name**: `books`
- **Public bucket**: ❌ Unchecked (Private)
- Click **Create bucket**

### Bucket 2: `notes`

- **Name**: `notes`
- **Public bucket**: ❌ Unchecked (Private)
- Click **Create bucket**

### Bucket 3: `highlights`

- **Name**: `highlights`
- **Public bucket**: ❌ Unchecked (Private)
- Click **Create bucket**

### Bucket 4: `maps`

- **Name**: `maps`
- **Public bucket**: ❌ Unchecked (Private)
- Click **Create bucket**

### Bucket 5: `puzzles`

- **Name**: `puzzles`
- **Public bucket**: ❌ Unchecked (Private)
- Click **Create bucket**

### Bucket 6: `userdata`

- **Name**: `userdata`
- **Public bucket**: ❌ Unchecked (Private)
- Click **Create bucket**

---

## Step 3: Environment Variables

1. In your project root, create or edit `.env.local` file
2. Get your Supabase credentials:
   - Go to your Supabase project dashboard
   - Click **Settings** (gear icon) → **API**
   - Copy the **Project URL**
   - Copy the **anon/public** key (not the service_role key)
3. Add these lines to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**:

- Replace `your-project-id` with your actual project ID
- Replace `your-anon-key-here` with your actual anon key
- Never commit `.env.local` to git (it should be in `.gitignore`)

---

## Step 4: Install Dependencies ✅

You mentioned you already installed the package. Verify it's in your `package.json`:

```bash
npm list @supabase/supabase-js
```

If not installed, run:

```bash
npm install @supabase/supabase-js
```

---

## Step 5: Storage Policies

For each bucket you created, you need to set up Row Level Security policies.

### Quick Method (Recommended):

1. Go to **Storage** → Click on a bucket (e.g., `books`)
2. Click **Policies** tab
3. Click **New Policy**
4. Select **For full customization** → **Create policy from scratch**
5. Use this template for each bucket:

#### Policy Name: `Users can upload own files`

```sql
(bucket_id = 'books'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])
```

**Policy definition:**

```sql
CREATE POLICY "Users can upload own files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'books' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

#### Policy Name: `Users can read own files`

```sql
CREATE POLICY "Users can read own files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'books' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

#### Policy Name: `Users can delete own files`

```sql
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'books' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

### Alternative: SQL Editor Method

1. Go to **SQL Editor** in Supabase dashboard
2. Click **New query**
3. Copy and paste this complete policy set (replace `books` with each bucket name):

```sql
-- Books bucket policies
CREATE POLICY "Users can upload own books"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'books' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read own books"
ON storage.objects FOR SELECT
USING (bucket_id = 'books' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own books"
ON storage.objects FOR DELETE
USING (bucket_id = 'books' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Notes bucket policies
CREATE POLICY "Users can upload own notes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'notes' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read own notes"
ON storage.objects FOR SELECT
USING (bucket_id = 'notes' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own notes"
ON storage.objects FOR DELETE
USING (bucket_id = 'notes' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Highlights bucket policies
CREATE POLICY "Users can upload own highlights"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'highlights' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read own highlights"
ON storage.objects FOR SELECT
USING (bucket_id = 'highlights' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own highlights"
ON storage.objects FOR DELETE
USING (bucket_id = 'highlights' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Maps bucket policies
CREATE POLICY "Users can upload own maps"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'maps' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read own maps"
ON storage.objects FOR SELECT
USING (bucket_id = 'maps' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own maps"
ON storage.objects FOR DELETE
USING (bucket_id = 'maps' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Puzzles bucket policies
CREATE POLICY "Users can upload own puzzles"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'puzzles' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read own puzzles"
ON storage.objects FOR SELECT
USING (bucket_id = 'puzzles' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own puzzles"
ON storage.objects FOR DELETE
USING (bucket_id = 'puzzles' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Userdata bucket policies
CREATE POLICY "Users can upload own userdata"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'userdata' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read own userdata"
ON storage.objects FOR SELECT
USING (bucket_id = 'userdata' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own userdata"
ON storage.objects FOR DELETE
USING (bucket_id = 'userdata' AND auth.uid()::text = (storage.foldername(name))[1]);
```

4. Click **Run** to execute all policies

---

## Verification

After completing all steps, verify everything works:

1. **Check environment variables are loaded:**

   ```bash
   # In your terminal, restart your dev server
   npm run dev
   ```

   Check the console - there should be no Supabase warnings

2. **Test authentication:**

   - The app should be able to connect to Supabase
   - Check browser console for any errors

3. **Test storage:**
   - Try uploading a file via `/bibliotheca/upload`
   - Check Supabase Storage dashboard to see if file appears

---

## Troubleshooting

### "Supabase not configured" warning

- Check `.env.local` exists and has correct values
- Restart your dev server after adding env variables
- Verify variable names start with `NEXT_PUBLIC_`

### "Bucket not found" error

- Go to Supabase Storage dashboard
- Verify all 6 buckets exist
- Check bucket names match exactly (case-sensitive)

### "Permission denied" errors

- Verify RLS policies are created
- Check policies use correct bucket names
- Ensure user is authenticated before accessing storage

### Policies not working

- Go to Storage → Bucket → Policies tab
- Verify 3 policies exist per bucket (INSERT, SELECT, DELETE)
- Check policy conditions match the SQL above

---

## Next Steps

Once setup is complete:

1. Test the upload page: `/bibliotheca/upload`
2. Check storage management: `/scholarivm/storage`
3. Verify sync status appears in the UI
4. Test backup/restore functionality
