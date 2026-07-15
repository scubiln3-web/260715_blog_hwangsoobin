import Link from "next/link";
import { supabase } from "@/utils/supabase";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="container">
      <section className={styles.hero}>
        <h1>Welcome to My Blog</h1>
        <p>Sharing thoughts, ideas, and tutorials on web development, design, and technology.</p>
      </section>

      <section className={styles.postGrid}>
        {posts?.map((post) => (
          <Link href={`/post/${post.id}`} key={post.id} className={`${styles.postCard} glass`}>
            {post.image_url ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img 
                src={post.image_url} 
                alt={post.title} 
                className={styles.thumbnail}
                loading="lazy"
              />
            ) : (
              <div className={styles.thumbnail} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                No Image
              </div>
            )}
            <div className={styles.postContent}>
              <span className={styles.postDate}>
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
            </div>
          </Link>
        ))}
        {(!posts || posts.length === 0) && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
            No posts yet. Click "Write Post" to create one!
          </p>
        )}
      </section>
    </div>
  );
}
