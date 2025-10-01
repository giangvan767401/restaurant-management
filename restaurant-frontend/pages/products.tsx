'use client';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import { foodService } from '../services/foodService';
import type { ProductDTO } from '../types/product';
import { getRole } from '../utils/auth';
import styles from './Products.module.css';  // 👈 import css riêng

export default function Products() {
  const [foods, setFoods] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ProductDTO | undefined>();
  const role = typeof window !== 'undefined' ? getRole() : '';
  const canManage = ['DAUBEP', 'QUANLI'].includes(role);

  const load = async () => {
    setLoading(true);
    try {
      const data = await foodService.list();
      setFoods(data);
    } catch (e) {
      console.error('Load foods error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSave = async (f: ProductDTO) => {
    if (f.id) await foodService.update(f.id, f);
    else await foodService.create(f);
    setEditing(undefined);
    await load();
    alert('Lưu món ăn thành công');
  };

  const onDelete = async (id: number) => {
    if (confirm('Xóa món?')) {
      await foodService.remove(id);
      await load();
      alert('Đã xóa (soft-delete)');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.content}>
        <div className={styles.topBar}>
          <h1 className={styles.pageTitle}>Menu</h1>
          {canManage && (
            <button
              onClick={() => setEditing({} as ProductDTO)}
              className={styles.btnPrimary}
            >
              + Thêm món
            </button>
          )}
        </div>

        {editing && (
          <div className={styles.formWrapper}>
            <ProductForm
              initial={editing}
              onSubmit={onSave}
              onCancel={() => setEditing(undefined)}
            />
          </div>
        )}

        {loading ? (
          <Spinner />
        ) : (
          <div className={styles.grid}>
            {foods.map(f => (
              <ProductCard
                key={f.id}
                food={f}
                onEdit={canManage ? () => setEditing(f) : undefined}
                onDelete={canManage ? () => onDelete(f.id!) : undefined}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
