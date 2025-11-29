/**
 * Supabase Connection Test
 * Run this to verify Supabase is configured and working
 */

import { supabase, isSupabaseConfigured } from "./client";
import { getCurrentUser, getSession } from "./auth";

/**
 * Test Supabase connection
 */
export async function testSupabaseConnection(): Promise<{
  success: boolean;
  results: {
    configured: boolean;
    connected: boolean;
    authenticated: boolean;
    database: boolean;
    storage: boolean;
  };
  errors: string[];
}> {
  const results = {
    configured: false,
    connected: false,
    authenticated: false,
    database: false,
    storage: false,
  };
  const errors: string[] = [];

  // Test 1: Configuration
  try {
    results.configured = isSupabaseConfigured();
    if (!results.configured) {
      errors.push("Supabase not configured - check environment variables");
    }
  } catch (error) {
    errors.push(`Configuration check failed: ${error}`);
  }

  if (!results.configured) {
    return { success: false, results, errors };
  }

  // Test 2: Connection
  try {
    const { data, error } = await supabase
      .from("users")
      .select("count")
      .limit(0);
    results.connected = !error;
    if (error) {
      errors.push(`Connection failed: ${error.message}`);
    }
  } catch (error) {
    errors.push(`Connection test failed: ${error}`);
    results.connected = false;
  }

  // Test 3: Authentication
  try {
    const session = await getSession();
    const user = await getCurrentUser();
    results.authenticated = !!session && !!user;
    if (!session && !user) {
      errors.push(
        "Not authenticated - this is OK if you haven't logged in yet"
      );
    }
  } catch (error) {
    errors.push(`Authentication check failed: ${error}`);
  }

  // Test 4: Database (test query)
  try {
    const { error } = await supabase.from("users").select("id").limit(1);
    results.database = !error || error.code === "PGRST116"; // PGRST116 = no rows, which is OK
    if (error && error.code !== "PGRST116") {
      errors.push(`Database query failed: ${error.message}`);
    }
  } catch (error) {
    errors.push(`Database test failed: ${error}`);
  }

  // Test 5: Storage (list buckets)
  try {
    const { data, error } = await supabase.storage.listBuckets();
    results.storage = !error;
    if (error) {
      errors.push(`Storage access failed: ${error.message}`);
    } else if (data) {
      const requiredBuckets = [
        "books",
        "notes",
        "highlights",
        "maps",
        "puzzles",
        "userdata",
      ];
      const existingBuckets = data.map((b) => b.name);
      const missing = requiredBuckets.filter(
        (b) => !existingBuckets.includes(b)
      );
      if (missing.length > 0) {
        errors.push(`Missing buckets: ${missing.join(", ")}`);
      }
    }
  } catch (error) {
    errors.push(`Storage test failed: ${error}`);
  }

  const success =
    results.configured &&
    results.connected &&
    results.database &&
    results.storage;

  return { success, results, errors };
}

/**
 * Test storage upload (small test file)
 */
export async function testStorageUpload(): Promise<{
  success: boolean;
  error?: string;
}> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Supabase not configured" };
  }

  try {
    const testContent = JSON.stringify({
      test: true,
      timestamp: new Date().toISOString(),
    });
    const blob = new Blob([testContent], { type: "application/json" });
    const testPath = `test-${Date.now()}.json`;

    const { data, error } = await supabase.storage
      .from("userdata")
      .upload(testPath, blob, {
        contentType: "application/json",
      });

    if (error) {
      return { success: false, error: error.message };
    }

    // Clean up test file
    await supabase.storage.from("userdata").remove([testPath]);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
