# Verify Supabase is Working

## Quick Test Methods

### Method 1: Test Page (Easiest)

1. Start your dev server:

   ```bash
   npm run dev
   ```

2. Navigate to: **http://localhost:3000/test-supabase**

3. Click **"Run Tests"** button

4. Check the results:
   - ✅ Green = Working
   - ❌ Red = Issue (see errors below)

### Method 2: Browser Console

1. Open your app in browser
2. Open Developer Console (F12)
3. Run this in the console:

```javascript
// Import and test
import("/lib/supabase/quick-test").then((m) => m.quickTest());
```

Or if you're on the test page, you can use:

```javascript
window.testSupabase();
```

### Method 3: Check Environment Variables

1. Make sure `.env.local` exists in project root
2. Verify it contains:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
   ```
3. **Restart your dev server** after adding/editing `.env.local`

### Method 4: Simple Import Test

Create a test file or run in browser console:

```javascript
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

console.log("Configured:", isSupabaseConfigured());
console.log("Supabase client:", supabase);
```

## What to Check

### ✅ Success Indicators

- No console warnings about "Supabase not configured"
- Test page shows all green checkmarks
- Can connect to Supabase (database query works)
- Storage buckets are accessible
- No errors in browser console

### ❌ Common Issues

#### "Supabase not configured"

- **Fix**: Check `.env.local` exists and has correct values
- **Fix**: Restart dev server after adding env vars
- **Fix**: Variable names must start with `NEXT_PUBLIC_`

#### "Connection failed" or "PGRST" errors

- **Fix**: Check your Supabase URL is correct
- **Fix**: Verify project is active in Supabase dashboard
- **Fix**: Check network connection

#### "Storage access failed" or "Bucket not found"

- **Fix**: Create all 6 buckets in Supabase Storage
- **Fix**: Verify bucket names match exactly (case-sensitive)
- **Fix**: Check storage policies are set up

#### "Permission denied" errors

- **Fix**: Verify RLS policies are created
- **Fix**: Check policies allow user access
- **Fix**: Make sure user is authenticated (if needed)

## Quick Verification Checklist

- [ ] `.env.local` file exists with correct values
- [ ] Dev server restarted after adding env vars
- [ ] No console warnings on page load
- [ ] Test page (`/test-supabase`) loads without errors
- [ ] All 6 storage buckets exist
- [ ] Database tables created (from schema.sql)
- [ ] Storage policies created (3 per bucket)

## Next Steps After Verification

Once everything is green:

1. ✅ Test upload: Go to `/bibliotheca/upload` and try uploading a PDF
2. ✅ Test storage page: Go to `/scholarivm/storage` and check stats
3. ✅ Test sync: Create a note or highlight and verify it syncs
4. ✅ Test backup: Use the backup button on storage page

## Still Having Issues?

1. Check browser console for specific error messages
2. Verify Supabase project is active (not paused)
3. Check Supabase dashboard → Settings → API for correct credentials
4. Make sure you're using the **anon/public** key, not service_role key
5. Verify bucket names match exactly: `books`, `notes`, `highlights`, `maps`, `puzzles`, `userdata`
