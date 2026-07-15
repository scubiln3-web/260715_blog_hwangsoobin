import styles from "./page.module.css";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import { notFound } from "next/navigation";
import PostActions from "@/components/PostActions";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostDetail({ params }: Props) {
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
    <div className="container" style={{ maxWidth: '900px' }}>
      <article className={`${styles.articleContainer} glass`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <Link href="/" style={{ color: 'var(--primary)', fontWeight: 500 }}>
            &larr; Back to Home
          </Link>
          <PostActions postId={post.id} />
        </div>
        
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
    </div>
  );
}
