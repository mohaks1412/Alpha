// src/services/supabaseService.js
import { createClient } from "@supabase/supabase-js";

class SupabaseService {
  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase URL and Key must be set in .env");
    }

    this.client = createClient(supabaseUrl, supabaseKey);
    this.defaultBucket = "AlphaTest";
  }

  /**
   * Upload a file to Supabase Storage
   * @param {File} file - File object
   * @param {string} bucket - Storage bucket name
   * @param {string} path - Path inside bucket (optional)
   * @returns {Promise<string>} File path
   */
  async uploadFile(file, bucket = this.defaultBucket, path = "") {
    try {
      const filePath = `${path}/${Date.now()}-${file.name}`;

      const { data, error } = await this.client.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      return data.path;
    } catch (err) {
      console.error("Upload error:", err.message);
      throw err;
    }
  }

  /**
   * Get a public URL for a file
   * @param {string} path - File path in bucket
   * @param {string} bucket - Storage bucket name
   * @returns {string} Public URL
   */
  getPublicUrl(path, bucket = this.defaultBucket) {
    try {
      const { data } = this.client.storage.from(bucket).getPublicUrl(path);
      return data.publicUrl;
    } catch (err) {
      console.error("Get URL error:", err.message);
      return null;
    }
  }

  /**
   * Delete a file from storage
   * @param {string} path - File path in bucket
   * @param {string} bucket - Storage bucket name
   * @returns {Promise<boolean>} Success status
   */
  async deleteFile(path, bucket = this.defaultBucket) {
    try {
      const { error } = await this.client.storage.from(bucket).remove([path]);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error("Delete error:", err.message);
      throw err;
    }
  }
}

// 👇 Export a single instance
const supabaseService = new SupabaseService();
export default supabaseService;
