"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

export default function PostActions({ postId }: { postId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      const { error } = await supabase.from("posts").delete().eq("id", postId);
      if (error) {
        alert("Failed to delete post: " + error.message);
      } else {
        alert("Post deleted successfully.");
        router.push("/");
        router.refresh();
      }
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <button 
        onClick={() => router.push(`/admin/edit/${postId}`)}
        style={{
          padding: '6px 14px',
          backgroundColor: 'transparent',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--foreground)',
          fontSize: '0.9rem'
        }}
      >
        Edit
      </button>
      <button 
        onClick={handleDelete}
        style={{
          padding: '6px 14px',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.9rem'
        }}
      >
        Delete
      </button>
    </div>
  );
}
