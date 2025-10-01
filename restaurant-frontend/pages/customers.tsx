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

// 👉 Import CSS Modules
import styles from './Customers.module.css';

export default function Customers() {
  const role = typeof window !== 'undefined' ? getRole() : '';
  const canManage = ['QUANLI'].includes(role);
  const [list, setList] = useState<CustomerDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CustomerDTO | undefined>();
  const router = useRouter();

  const load = async () => {
    setLoading(true);
    try {
      const data = await customerService.list();
      setList(data);
    } catch (e) {
      console.error('Load customers error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

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
      <div className={styles.pageWrapper}>
        <Header />
        <main className="mx-auto max-w-6xl">
          <div className={`${styles.card} text-center text-gray-700`}>
            Bạn không có quyền xem danh sách khách hàng.
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
        <div className="mb-6 flex items-center justify-between">
          <h1 className={styles.pageTitle}>Danh sách khách hàng</h1>
          {canManage && (
            <button
              onClick={() => setEditing({} as CustomerDTO)}
              className={styles.btnPrimary}
            >
              + Thêm khách hàng
            </button>
          )}
        </div>

        {editing && (
          <div className={`${styles.card} mb-6`}>
            <CustomerForm
              initial={editing}
              onSubmit={onSave}
              onCancel={() => setEditing(undefined)}
            />
          </div>
        )}

        {loading ? (
          <Spinner />
        ) : (
          <div className={styles.card}>
            <table className={styles.customersTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>SĐT</th>
                  <th>Email</th>
                  <th>Cấp độ</th>
                  <th className="text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {list.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.phone}</td>
                    <td>{c.email}</td>
                    <td>{c.level}</td>
                    <td className="text-right">
                      {canManage && (
                        <>
                          <button
                            onClick={() => setEditing(c)}
                            className={`${styles.btnSecondary} mr-2`}
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => onDelete(c.id!)}
                            className={styles.btnDanger}
                          >
                            Xóa
                          </button>
                        </>
                      )}
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
