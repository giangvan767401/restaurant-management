'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import { authService } from '../services/authService';
import type { LoginPayload } from '../types/auth';
import { useRouter } from 'next/navigation';

// import CSS Module
import styles from './Login.module.css';

export default function Login() {
  const [form, setForm] = useState<LoginPayload>({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.login(form);
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Đăng nhập thất bại');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.formCard}>
          <h1 className={styles.title}>Đăng nhập</h1>
          <input
            className={styles.input}
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.submitBtn} disabled={loading}>
            {loading ? <Spinner /> : 'Login'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
