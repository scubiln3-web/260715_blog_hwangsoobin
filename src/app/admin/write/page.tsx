"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import styles from "./page.module.css";

export default function WritePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let thumbnailUrl = "";

      // 1. Upload Image to Supabase Storage
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from('blog-images')
          .getPublicUrl(filePath);
          
        thumbnailUrl = data.publicUrl;
      }

      // 2. Extract excerpt from content
      const excerpt = content.length > 100 ? content.substring(0, 100) + '...' : content;

      // 3. Insert Post into Supabase DB
      const { data: postData, error: dbError } = await supabase
        .from('posts')
        .insert([
          { 
            title, 
            content, 
            excerpt,
            image_url: thumbnailUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200"
          }
        ])
        .select()
        .single();

      if (dbError) {
        throw dbError;
      }

      alert("Post created successfully!");
      router.push('/');
      router.refresh();

    } catch (error: any) {
      alert("Error saving post: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className={`${styles.writeContainer} glass`}>
        <form onSubmit={handleSubmit}>
          <div className={styles.header}>
            <h1 className={styles.title}>Create New Post</h1>
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? "Publishing..." : "Publish Post"}
            </button>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Post title..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Cover Image</label>
            <input 
              type="file" 
              className={styles.fileInput} 
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Content (Markdown)</label>
            <textarea 
              className={styles.textarea} 
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
}
