'use client';
import { useEffect, useState } from 'react';
import type { OrderDTO, OrderItemDTO } from '../types/order';
import type { CustomerDTO } from '../types/customer';
import type { Food } from '../types/food';
import { customerService } from '../services/customerService';
import { foodService } from '../services/foodService';

export default function OrderForm({ onSubmit, onCancel }: { onSubmit: (o: Omit<OrderDTO, 'id' | 'itemIds'>) => void; onCancel: () => void }) {
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
        console.log('Fetched customers:', customersData); // Debug
        console.log('Fetched foods:', foodsData); // Debug
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

    const orderItems: OrderItemDTO[] = items.map(item => {
      const food = foods.find(f => f.id === item.foodId);
      if (!food) {
        throw new Error(`Food not found for foodId: ${item.foodId}`);
      }
      return {
        foodId: item.foodId!,
        foodName: food.name,
        foodPrice: food.price,
        quantity: item.quantity,
      };
    });

    const payload: Omit<OrderDTO, 'id' | 'itemIds'> = {
      customerId,
      orderItems,
      status: 'PENDING',
      totalAmount: orderItems.reduce((sum, item) => sum + (item.foodPrice * item.quantity), 0),
    };

    console.log('OrderForm submitting payload:', payload); // Debug
    onSubmit(payload);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="rounded-2xl border p-4">
      <div className="grid gap-3">
        <label className="text-sm">Khách hàng</label>
        <select
          className="rounded-md border p-2"
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

        <div className="mt-2">
          <div className="mb-2 text-sm font-medium">Món ăn</div>
          {items.map((it, idx) => (
            <div key={idx} className="mb-2 grid items-center gap-2 sm:grid-cols-[1fr_120px_80px]">
              <select
                className="rounded-md border p-2"
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
                className="rounded-md border p-2"
                type="number"
                min={1}
                value={it.quantity}
                onChange={e => updateItem(idx, { quantity: Number(e.target.value) })}
              />
              <button
                onClick={() => removeItem(idx)}
                className="rounded-md border px-3 py-1.5 text-sm"
              >
                Xóa
              </button>
            </div>
          ))}
          <button
            onClick={addItem}
            className="rounded-md bg-gray-100 px-3 py-1.5 text-sm"
          >
            + Thêm món
          </button>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={handleSubmit}
            className="rounded-md bg-gray-900 px-3 py-1.5 text-white"
          >
            Tạo đơn
          </button>
          <button
            onClick={onCancel}
            className="rounded-md border px-3 py-1.5"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}