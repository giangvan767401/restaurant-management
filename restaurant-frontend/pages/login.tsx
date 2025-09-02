'use client';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import { authService } from '../services/authService';
import type { LoginPayload } from '../types/auth';
import { useRouter } from 'next/navigation';

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
      // on success authService saved token via saveAuth
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-md p-6">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <h1 className="mb-4 text-xl font-semibold">Đăng nhập</h1>
          <input
            className="mb-3 w-full rounded-md border p-2"
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <input
            className="mb-3 w-full rounded-md border p-2"
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {error && (
            <div className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700">
              {error}
            </div>
          )}
          <button
            className="w-full rounded-md bg-gray-900 px-4 py-2 text-white"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Login'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
