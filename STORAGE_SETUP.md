# Ratio Cloud Storage Setup Guide

This guide will help you set up Supabase for Ratio's cloud storage and sync features.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A new Supabase project

## Step 1: Database Setup

1. Open your Supabase project dashboard
2. Go to SQL Editor
3. Run the schema from `lib/supabase/schema.sql`
4. This creates all necessary tables with Row Level Security (RLS)

## Step 2: Storage Buckets

1. Go to Storage in your Supabase dashboard
2. Create the following buckets (make them private):

   - `books` - For PDF files
   - `notes` - For user notes
   - `highlights` - For book highlights
   - `maps` - For logic maps
   - `puzzles` - For puzzle data
   - `userdata` - For backups and user data

3. For each bucket, set up policies:
   - Users can upload files to their own folder: `{user_id}/*`
   - Users can read their own files
   - Users can delete their own files

## Step 3: Environment Variables

Add these to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 4: Install Dependencies

```bash
npm install @supabase/supabase-js
```

## Step 5: Storage Policies

In Supabase Storage, create policies for each bucket:

### Books Bucket Policy

```sql
-- Allow users to upload to their own folder
CREATE POLICY "Users can upload own books"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'books' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to read their own books
CREATE POLICY "Users can read own books"
ON storage.objects FOR SELECT
USING (bucket_id = 'books' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own books
CREATE POLICY "Users can delete own books"
ON storage.objects FOR DELETE
USING (bucket_id = 'books' AND auth.uid()::text = (storage.foldername(name))[1]);
```

Repeat similar policies for other buckets.

## Features

### Automatic Sync

- All memoria cards sync automatically
- Notes and highlights sync on save
- Progress updates sync in real-time
- Puzzle results sync after completion

### Offline Support

- Actions are queued when offline
- Data is cached locally
- Automatic sync when connection is restored

### Backup & Restore

- Manual backup from Storage page
- Automatic backups on schedule
- Full restore to any device
- Export all data as JSON

### Cloud Storage

- PDF books stored in cloud
- Processed chapters in storage
- All user data backed up
- Cross-device access

## Usage

### Upload a Book

1. Go to `/bibliotheca/upload`
2. Select a PDF file
3. Upload to cloud
4. Processing pipeline runs automatically

### Manage Storage

1. Go to `/scholarivm/storage`
2. View storage statistics
3. Backup all data
4. Restore from cloud
5. Export data

### Sync Status

The `SyncStatus` component shows:

- Syncing: Currently uploading/downloading
- Synced: All data is up to date
- Offline: No connection, using local cache
- Error: Sync failed, retrying

## Troubleshooting

### Sync not working

- Check environment variables are set
- Verify Supabase project is active
- Check browser console for errors
- Verify RLS policies are correct

### Upload fails

- Check file size (max 100MB)
- Verify bucket exists
- Check storage policies
- Verify authentication

### Restore fails

- Check backup exists in cloud
- Verify user is authenticated
- Check network connection
- Review error messages in console
