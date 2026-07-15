import styles from "./page.module.css";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// Next.js params typing
type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostDetail({ params }: Props) {
  // Wait for the params promise to resolve
  const { id } = await params;

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <article className="container" style={{ maxWidth: '900px' }}>
      <Link href="/" style={{ display: 'inline-block', marginBottom: '30px', color: 'var(--primary)', fontWeight: 500 }}>
        &larr; Back to Home
      </Link>
      
      <header className={styles.postHeader}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.date}>
          {new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
        </p>
      </header>

      {post.image_url && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img 
          src={post.image_url} 
          alt="Cover" 
          className={styles.coverImage} 
        />
      )}

      <div className={styles.content}>
        {post.content.split('\n').map((paragraph: string, idx: number) => (
          paragraph.trim() ? <p key={idx}>{paragraph}</p> : <br key={idx} />
        ))}
      </div>
    </article>
  );
}
