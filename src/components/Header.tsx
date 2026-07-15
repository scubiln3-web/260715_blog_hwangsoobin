import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={`${styles.header} glass`}>
      <div className={`container ${styles.headerContent}`}>
        <Link href="/" className={styles.logo}>
          Blog.
        </Link>
        <nav className={styles.nav}>
          <Link href="/admin/write" className={styles.writeBtn}>
            Write Post
          </Link>
        </nav>
      </div>
    </header>
  );
}
