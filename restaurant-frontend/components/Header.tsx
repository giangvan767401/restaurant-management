'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRole, getUsername, isLoggedIn, logout } from '../utils/auth';
import styles from './Header.module.css';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRole(getRole());
    setUsername(getUsername());
    setLogged(isLoggedIn());
  }, []);

  if (!mounted) {
    // tránh mismatch: render skeleton hoặc header đơn giản
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>🍽 Restaurant App</Link>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>🍽 Restaurant App</Link>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/products">Menu</Link>
          {['PHUCVU','DAUBEP','QUANLI'].includes(role) && <Link href="/orders">Orders</Link>}
          {['DAUBEP','QUANLI'].includes(role) && <Link href="/products">Foods</Link>}
          {['QUANLI'].includes(role) && <Link href="/customers">Customers</Link>}
          {['QUANLI'].includes(role) && <Link href="/dashboard">Dashboard</Link>}
          {logged ? (
            <div className={styles.userBox}>
              <span className={styles.userInfo}>
                Hi, {username} ({role || 'GUEST'})
              </span>
              <button className={styles.logoutBtn} onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className={styles.authBox}>
              <Link href="/login" className={styles.loginBtn}>Login</Link>
              <Link href="/register" className={styles.registerBtn}>Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
