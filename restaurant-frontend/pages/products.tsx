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
      // ignore for now
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSave = async (f: ProductDTO) => {
    if (f.id) await foodService.update(f.id, f);
    else await foodService.create(f);
    setEditing(undefined); await load(); alert('Lưu món ăn thành công');
  };

  const onDelete = async (id: number) => {
    if (confirm('Xóa món?')) {
      await foodService.remove(id);
      await load();
      alert('Đã xóa (soft-delete)');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Menu</h1>
          {canManage && <button onClick={() => setEditing({} as ProductDTO)} className="rounded-md bg-gray-900 px-3 py-1.5 text-white">+ Thêm món</button>}
        </div>
        {editing && <div className="mb-6"><ProductForm initial={editing} onSubmit={onSave} onCancel={() => setEditing(undefined)} /></div>}
        {loading ? <Spinner /> : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {foods.map(f => <ProductCard key={f.id} food={f} onEdit={canManage ? () => setEditing(f) : undefined} onDelete={canManage ? () => onDelete(f.id!) : undefined} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
