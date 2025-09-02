'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import { authService } from '../services/authService';
import type { RegisterPayload } from '../types/auth';
import { useRouter } from 'next/navigation';

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
      setMsg('Đăng ký thành công! Bây giờ bạn có thể đăng nhập.');
      router.push('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMsg(err.message);
      } else {
        setMsg('Đăng ký thất bại');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-md p-6">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <h1 className="mb-4 text-xl font-semibold">Đăng ký</h1>
          <input
            name="username"
            className="mb-3 w-full rounded-md border p-2"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            className="mb-3 w-full rounded-md border p-2"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <input
            name="fullName"
            className="mb-3 w-full rounded-md border p-2"
            placeholder="Họ tên"
            value={form.fullName}
            onChange={handleChange}
          />
          <select
            name="role"
            className="mb-3 w-full rounded-md border p-2"
            value={form.role}
            onChange={handleChange}
          >
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="PHUCVU">PHUCVU</option>
            <option value="DAUBEP">DAUBEP</option>
            <option value="QUANLI">QUANLI</option>
          </select>
          {msg && (
            <div className="mb-3 rounded-md bg-gray-50 p-2 text-sm">{msg}</div>
          )}
          <button
            className="w-full rounded-md bg-gray-900 px-4 py-2 text-white"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Register'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
