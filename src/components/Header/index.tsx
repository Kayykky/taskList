import styles from "./styles.module.scss";
import Link from "next/link";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/">
          <img src="/logo.svg" width={190} height={60} />
        </Link>
        <nav className={styles.menuNav}>
          <Link href="/contato" legacyBehavior>
            <a>Contato</a>
          </Link>

          <Link href="/sobre" legacyBehavior>
            <a>Sobre</a>
          </Link>

          <Link href="/login" legacyBehavior>
            <a className={styles.login}>Login</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
