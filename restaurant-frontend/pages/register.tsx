'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import { authService } from '../services/authService';
import type { RegisterPayload } from '../types/auth';
import { useRouter } from 'next/navigation';
import styles from './Register.module.css';

export default function Register() {
  const [form, setForm] = useState<RegisterPayload>({
    username: '',
    password: '',
    fullName: '',
    role: 'CUSTOMER',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      await authService.register(form);
      setMsg('✅ Đăng ký thành công! Bạn có thể đăng nhập.');
      router.push('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMsg(err.message);
      } else {
        setMsg('❌ Đăng ký thất bại, vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Đăng ký tài khoản</h1>

          <div className={styles.field}>
            <label className={styles.label}>Username</label>
            <input
              name="username"
              className={styles.input}
              placeholder="Nhập username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              className={styles.input}
              placeholder="Nhập password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Họ tên</label>
            <input
              name="fullName"
              className={styles.input}
              placeholder="Nhập họ tên"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Vai trò</label>
            <select
              name="role"
              className={styles.input}
              value={form.role}
              onChange={handleChange}
            >
              <option value="CUSTOMER">Khách hàng</option>
              <option value="PHUCVU">Phục vụ</option>
              <option value="DAUBEP">Đầu bếp</option>
              <option value="QUANLI">Quản lý</option>
            </select>
          </div>

          {msg && (
            <div
              className={`${styles.message} ${
                msg.startsWith('✅') ? styles.success : styles.error
              }`}
            >
              {msg}
            </div>
          )}

          <button className={styles.button} disabled={loading}>
            {loading ? <Spinner /> : 'Đăng ký'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
