'use client';
import { useState } from 'react';
import type { Food } from '../types/food';
import styles from './ProductForm.module.css';

interface ProductFormProps {
  initial?: Partial<Food>;
  onSubmit: (f: Food) => void;
  onCancel: () => void;
}

export default function ProductForm({ initial, onSubmit, onCancel }: ProductFormProps) {
  const [form, setForm] = useState<Food>({
    id: initial?.id,
    name: initial?.name || '',
    price: initial?.price || 0,
    description: initial?.description || '',
    category: initial?.category || '',
    available: initial?.available ?? true,
    imageUrl: initial?.imageUrl || '',
  });

  const handleSubmit = () => {
    if (form.imageUrl && form.imageUrl.length > 1000) {
      alert('URL ảnh quá dài, tối đa 1000 ký tự!');
      return;
    }
    try {
      onSubmit(form);
      alert('Lưu món ăn thành công!');
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error('Error saving product:', e.message);
        alert('Lỗi khi lưu món ăn: ' + e.message);
      } else {
        console.error('Unknown error:', e);
        alert('Có lỗi xảy ra, vui lòng thử lại!');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGrid}>
        <input
          className={styles.input}
          placeholder="Tên món"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Giá"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />
        <input
          className={styles.input}
          placeholder="Loại"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          className={styles.input}
          placeholder="Ảnh (URL)"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
        <textarea
          className={styles.textarea}
          placeholder="Mô tả"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) => setForm({ ...form, available: e.target.checked })}
          />
          Còn bán
        </label>
      </div>
      <div className={styles.actions}>
        <button onClick={handleSubmit} className={styles.saveBtn}>
          Lưu
        </button>
        <button onClick={onCancel} className={styles.cancelBtn}>
          Hủy
        </button>
      </div>
    </div>
  );
}
