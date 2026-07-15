import Link from "next/link";
import styles from "./page.module.css";

// Temporary mock data until Supabase is connected
const mockPosts = [
  {
    id: "1",
    title: "Building a Modern Blog with Next.js",
    excerpt: "Learn how to build a beautiful and fast blog using Next.js App Router and Supabase.",
    date: "July 15, 2026",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    title: "The Power of Vanilla CSS",
    excerpt: "Why returning to the basics of CSS might be the best choice for your next project's design system.",
    date: "July 14, 2026",
    thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    title: "Glassmorphism UI Trends",
    excerpt: "Exploring the frosted glass effect in modern web interfaces and how to implement it.",
    date: "July 10, 2026",
    thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Home() {
  return (
    <div className="container">
      <section className={styles.hero}>
        <h1>Welcome to My Blog</h1>
        <p>Sharing thoughts, ideas, and tutorials on web development, design, and technology.</p>
      </section>

      <section className={styles.postGrid}>
        {mockPosts.map((post) => (
          <Link href={`/post/${post.id}`} key={post.id} className={styles.postCard}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={post.thumbnail} 
              alt={post.title} 
              className={styles.thumbnail}
              loading="lazy"
            />
            <div className={styles.postContent}>
              <span className={styles.postDate}>{post.date}</span>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
