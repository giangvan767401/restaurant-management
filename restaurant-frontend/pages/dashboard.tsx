'use client';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import { customerService } from '../services/customerService';
import { orderService } from '../services/orderService';
import { paymentService } from '../services/paymentService';
import { getRole } from '../utils/auth';

export default function Dashboard() {
  const role = typeof window !== 'undefined' ? getRole() : '';
  const canView = ['QUANLI'].includes(role);
  const [loading, setLoading] = useState(true);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    console.log('Role:', role, 'Can view:', canView); // Debug
    if (!canView) return;
    setLoading(true);
    Promise.all([
      customerService.list().catch(e => { console.error('Customers error:', e); return []; }),
      orderService.list().catch(e => { console.error('Orders error:', e); return []; }),
      paymentService.list().catch(e => { console.error('Payments error:', e); return []; }),
    ])
      .then(([customers, orders, payments]) => {
        setTotalCustomers(customers.length);
        setTotalOrders(orders.length);
        setRevenue(payments.reduce((s, p) => s + (p.amount || 0), 0));
      })
      .catch(e => console.error('Dashboard fetch error:', e))
      .finally(() => setLoading(false));
  }, [canView]);

  if (!canView) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-6xl p-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">Bạn không có quyền xem Dashboard.</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="mb-4 text-xl font-semibold">Tổng quan</h1>
        {loading ? <Spinner /> : (
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-sm text-gray-500">Khách hàng</div>
              <div className="mt-2 text-3xl font-bold">{totalCustomers}</div>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-sm text-gray-500">Đơn hàng</div>
              <div className="mt-2 text-3xl font-bold">{totalOrders}</div>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-sm text-gray-500">Doanh thu</div>
              <div className="mt-2 text-3xl font-bold">{revenue.toLocaleString()}₫</div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
