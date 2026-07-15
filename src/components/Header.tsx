import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.headerWrapper}>
      <header className={`${styles.header} glass`}>
        <div className={styles.headerContent}>
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
    </div>
  );
}
