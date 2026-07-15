"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import styles from "../../write/page.module.css";

export default function EditPost() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!postId) return;
      const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();
      if (data) {
        setTitle(data.title);
        setContent(data.content);
        setExistingImageUrl(data.image_url || "");
      } else if (error) {
        alert("Failed to load post data");
      }
      setIsFetching(false);
    }
    fetchPost();
  }, [postId]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalImageUrl = existingImageUrl;

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);
        finalImageUrl = data.publicUrl;
      }

      const excerpt = content.length > 100 ? content.substring(0, 100) + '...' : content;

      const { error: dbError } = await supabase
        .from('posts')
        .update({ 
          title, 
          content, 
          excerpt,
          image_url: finalImageUrl 
        })
        .eq('id', postId);

      if (dbError) throw dbError;

      alert("Post updated successfully!");
      router.push(`/post/${postId}`);
      router.refresh();

    } catch (error: any) {
      alert("Error updating post: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading post data...</div>;
  }

  return (
    <div className="container">
      <div className={styles.writeContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.header}>
            <h1 className={styles.title}>Edit Post</h1>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => router.back()} className={styles.submitBtn} style={{ backgroundColor: 'transparent', color: 'var(--foreground)', border: '1px solid var(--border)' }}>Cancel</button>
              <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
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
            <label className={styles.label}>Cover Image (Leave empty to keep existing)</label>
            {existingImageUrl && !file && (
              <div style={{ marginBottom: '10px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={existingImageUrl} alt="Current cover" style={{ height: '100px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
              </div>
            )}
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
