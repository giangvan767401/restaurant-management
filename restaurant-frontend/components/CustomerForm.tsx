'use client';
import { useState } from 'react';
import type { CustomerDTO } from '../types/customer';
import styles from './CustomerForm.module.css';

export default function CustomerForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: Partial<CustomerDTO>;
  onSubmit: (c: CustomerDTO) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<CustomerDTO>({
    id: initial?.id,
    name: initial?.name || '',
    gender: initial?.gender || 'Other',
    age: initial?.age || 18,
    phone: initial?.phone || '',
    email: initial?.email || '',
    address: initial?.address || '',
    level: initial?.level || 'Bac',
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <input
          className={styles.input}
          placeholder="Tên"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className={styles.input}
          placeholder="SĐT"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          className={styles.input}
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className={styles.input}
          placeholder="Địa chỉ"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          className={styles.input}
          placeholder="Giới tính"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Tuổi"
          value={form.age}
          onChange={(e) =>
            setForm({ ...form, age: Number(e.target.value) })
          }
        />
        <input
          className={styles.input}
          placeholder="Cấp độ (Bac/Vang/Kim Cuong)"
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
        />
      </div>
      <div className={styles.actions}>
        <button onClick={() => onSubmit(form)} className={styles.saveBtn}>
          Lưu
        </button>
        <button onClick={onCancel} className={styles.cancelBtn}>
          Hủy
        </button>
      </div>
    </div>
  );
}
