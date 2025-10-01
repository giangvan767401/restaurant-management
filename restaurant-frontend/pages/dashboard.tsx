'use client';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import { customerService } from '../services/customerService';
import { orderService } from '../services/orderService';
import { paymentService } from '../services/paymentService';
import { getRole } from '../utils/auth';

// 👉 Import CSS Modules
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const role = typeof window !== 'undefined' ? getRole() : '';
  const canView = ['QUANLI'].includes(role);
  const [loading, setLoading] = useState(true);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    if (!canView) return;
    setLoading(true);
    Promise.all([
      customerService.list().catch(() => []),
      orderService.list().catch(() => []),
      paymentService.list().catch(() => []),
    ])
      .then(([customers, orders, payments]) => {
        setTotalCustomers(customers.length);
        setTotalOrders(orders.length);
        setRevenue(payments.reduce((s, p) => s + (p.amount || 0), 0));
      })
      .finally(() => setLoading(false));
  }, [canView]);

  if (!canView) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className="mx-auto max-w-6xl">
          <div className={`${styles.card} text-center text-gray-700`}>
            Bạn không có quyền xem Dashboard.
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className="mx-auto max-w-6xl">
        <h1 className={styles.pageTitle}>Tổng quan</h1>
        {loading ? <Spinner /> : (
          <div className={styles.grid}>
            <div className={`${styles.card} ${styles.statCard}`}>
              <div className={styles.statLabel}>Khách hàng</div>
              <div className={styles.statValue}>{totalCustomers}</div>
            </div>
            <div className={`${styles.card} ${styles.statCard}`}>
              <div className={styles.statLabel}>Đơn hàng</div>
              <div className={styles.statValue}>{totalOrders}</div>
            </div>
            <div className={`${styles.card} ${styles.statCard}`}>
              <div className={styles.statLabel}>Doanh thu</div>
              <div className={styles.statValue}>
                {revenue.toLocaleString()}₫
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
