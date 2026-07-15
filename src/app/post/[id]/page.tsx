import styles from "./page.module.css";
import Link from "next/link";

export default function PostDetail({ params }: { params: { id: string } }) {
  return (
    <article className="container" style={{ maxWidth: '900px' }}>
      <Link href="/" style={{ display: 'inline-block', marginBottom: '30px', color: 'var(--primary)', fontWeight: 500 }}>
        &larr; Back to Home
      </Link>
      
      <header className={styles.postHeader}>
        <h1 className={styles.title}>Building a Modern Blog with Next.js</h1>
        <p className={styles.date}>July 15, 2026</p>
      </header>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
        alt="Cover" 
        className={styles.coverImage} 
      />

      <div className={styles.content}>
        <p>This is a mock blog post content. In a real application, this content would be fetched from Supabase based on the post ID.</p>
        <p>When creating a modern web application, typography and spacing are crucial. The goal is to create a reading experience that is both beautiful and highly readable.</p>
        <p>Next.js App Router provides excellent tools for building SEO-friendly, fast-loading web applications with React Server Components.</p>
      </div>
    </article>
  );
}
