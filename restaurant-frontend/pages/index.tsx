import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <section className={styles.heroCard}>
          <h1 className={styles.title}>🍽 Restaurant App</h1>
          <p className={styles.subtitle}>
            Quản lý nhà hàng đơn giản: menu, khách hàng, đơn hàng và thanh toán.
          </p>
          <Link href="/products" className={styles.ctaBtn}>
            Xem Menu
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
