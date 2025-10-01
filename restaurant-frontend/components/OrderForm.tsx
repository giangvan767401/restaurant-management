'use client';
import { useEffect, useState } from 'react';
import type { OrderDTO } from '../types/order';
import type { CustomerDTO } from '../types/customer';
import type { Food } from '../types/food';
import { customerService } from '../services/customerService';
import { foodService } from '../services/foodService';
import styles from './OrderForm.module.css';

export default function OrderForm({ onSubmit, onCancel }: { onSubmit: (o: Omit<OrderDTO, 'id'>) => void; onCancel: () => void }) {
  const [customers, setCustomers] = useState<CustomerDTO[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [customerId, setCustomerId] = useState<number | undefined>();
  const [items, setItems] = useState<{ foodId?: number; quantity: number }[]>([{ quantity: 1 }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const customersData = await customerService.list();
        const foodsData = await foodService.list();
        setCustomers(customersData);
        setFoods(foodsData);
      } catch (e) {
        console.error('Error fetching data:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addItem = () => setItems([...items, { quantity: 1 }]);

  const updateItem = (idx: number, patch: Partial<{ foodId: number; quantity: number }>) =>
    setItems(items.map((it, i) => (i === idx ? { ...it, ...patch } : it)));

  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));

  const handleSubmit = () => {
    if (!customerId) {
      alert('Vui lòng chọn khách hàng');
      return;
    }
    if (items.length === 0 || items.some(item => !item.foodId || item.quantity <= 0)) {
      alert('Vui lòng thêm ít nhất một món ăn với số lượng hợp lệ');
      return;
    }

    const itemIds: number[] = items.map(item => item.foodId!).filter(Boolean);

    const totalAmount = items.reduce((sum, item) => {
      const food = foods.find(f => f.id === item.foodId);
      return sum + (food ? food.price * item.quantity : 0);
    }, 0);

    const payload: Omit<OrderDTO, 'id'> = {
      customerId,
      status: 'PENDING',
      totalAmount,
      itemIds,
    };

    console.log('OrderForm submitting payload:', payload);
    onSubmit(payload);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div>
        <label className={styles.label}>Khách hàng</label>
        <select
          className={styles.select}
          value={customerId}
          onChange={e => setCustomerId(Number(e.target.value) || undefined)}
        >
          <option value="">-- Chọn khách hàng --</option>
          {customers.map(c => (
            <option key={c.id} value={c.id}>
              {c.id} - {c.name}
            </option>
          ))}
        </select>

        <div>
          <div className={styles.label}>Món ăn</div>
          {items.map((it, idx) => (
            <div key={idx} className={styles.itemRow}>
              <select
                className={styles.select}
                value={it.foodId}
                onChange={e => updateItem(idx, { foodId: Number(e.target.value) })}
              >
                <option value="">-- Chọn món --</option>
                {foods.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} - {f.price?.toLocaleString()}₫
                  </option>
                ))}
              </select>
              <input
                className={styles.input}
                type="number"
                min={1}
                value={it.quantity}
                onChange={e => updateItem(idx, { quantity: Number(e.target.value) })}
              />
              <button onClick={() => removeItem(idx)} className={styles.button}>
                Xóa
              </button>
            </div>
          ))}
          <button onClick={addItem} className={styles.buttonAdd}>
            + Thêm món
          </button>
        </div>

        <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
          <button onClick={handleSubmit} className={styles.buttonPrimary}>
            Tạo đơn
          </button>
          <button onClick={onCancel} className={styles.buttonCancel}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
