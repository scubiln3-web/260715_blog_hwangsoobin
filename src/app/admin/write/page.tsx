"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("This will save the post to Supabase!");
  };

  return (
    <div className="container">
      <div className={styles.writeContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.header}>
            <h1 className={styles.title}>Create New Post</h1>
            <button type="submit" className={styles.submitBtn}>Publish Post</button>
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
