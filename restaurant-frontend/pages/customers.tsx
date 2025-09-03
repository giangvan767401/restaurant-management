'use client';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import CustomerForm from '../components/CustomerForm';
import { customerService } from '../services/customerService';
import type { CustomerDTO } from '../types/customer';
import { useRouter } from 'next/navigation';
import { getRole } from '../utils/auth';

export default function Customers() {
  const role = typeof window !== 'undefined' ? getRole() : '';
  const canManage = ['QUANLI'].includes(role);
  const [list, setList] = useState<CustomerDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CustomerDTO | undefined>();
  const router = useRouter();

  const load = async () => {
    console.log('Role:', role, 'Can manage:', canManage); // Debug
    setLoading(true);
    try {
      const data = await customerService.list();
      console.log('Customers data:', data); // Debug
      setList(data);
    } catch (e) {
      console.error('Load customers error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSave = async (c: CustomerDTO) => {
    if (c.id) await customerService.update(c.id, c);
    else await customerService.create(c);
    setEditing(undefined);
    await load();
    alert('Lưu khách hàng thành công');
  };

  const onDelete = async (id: number) => {
    if (confirm('Xóa khách hàng?')) {
      await customerService.remove(id);
      await load();
      alert('Đã xóa');
    }
  };

  if (!canManage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-6xl p-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">Bạn không có quyền xem danh sách khách hàng.</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Khách hàng</h1>
          {canManage && <button onClick={() => setEditing({} as CustomerDTO)} className="rounded-md bg-gray-900 px-3 py-1.5 text-white">+ Thêm</button>}
        </div>
        {editing && <div className="mb-6"><CustomerForm initial={editing} onSubmit={onSave} onCancel={() => setEditing(undefined)} /></div>}
        {loading ? <Spinner /> : (
          <div className="overflow-x-auto rounded-xl border bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Tên</th>
                  <th className="p-3 text-left">SĐT</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Cấp độ</th>
                  <th className="p-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {list.map(c => (
                  <tr key={c.id} className="border-t">
                    <td className="p-3">{c.id}</td>
                    <td className="p-3">{c.name}</td>
                    <td className="p-3">{c.phone}</td>
                    <td className="p-3">{c.email}</td>
                    <td className="p-3">{c.level}</td>
                    <td className="p-3 text-right">
                      {canManage && <>
                        <button onClick={() => setEditing(c)} className="mr-2 rounded-md border px-3 py-1.5">Sửa</button>
                        <button onClick={() => onDelete(c.id!)} className="rounded-md bg-red-600 px-3 py-1.5 text-white">Xóa</button>
                      </>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}