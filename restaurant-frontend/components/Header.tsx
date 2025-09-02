'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRole, getUsername, isLoggedIn, logout } from '../utils/auth';

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
    // tránh mismatch, render skeleton hoặc gì đó nhẹ
    return (
      <header className="w-full border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link href="/" className="text-xl font-bold">🍽 Restaurant App</Link>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">🍽 Restaurant App</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/products">Menu</Link>
          {['PHUCVU','DAUBEP','QUANLI'].includes(role) && <Link href="/orders">Orders</Link>}
          {['DAUBEP','QUANLI'].includes(role) && <Link href="/products">Foods</Link>}
          {['QUANLI'].includes(role) && <Link href="/customers">Customers</Link>}
          {['QUANLI'].includes(role) && <Link href="/dashboard">Dashboard</Link>}
          {logged ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-gray-600">
                Hi, {username} ({role || 'GUEST'})
              </span>
              <button
                className="rounded-md bg-gray-900 px-3 py-1.5 text-white"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="rounded-md border px-3 py-1.5">Login</Link>
              <Link href="/register" className="rounded-md bg-gray-900 px-3 py-1.5 text-white">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
