'use client';
import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import OrderForm from '../components/OrderForm';
import { orderService } from '../services/orderService';
import { paymentService } from '../services/paymentService';
import type { OrderDTO, OrderItemDTO } from '../types/order';
import type { PaymentDTO } from '../types/payment';
import { getRole, getUsername } from '../utils/auth';

export default function Orders() {
  const role = typeof window !== 'undefined' ? getRole() : '';
  const username = typeof window !== 'undefined' ? getUsername() : '';
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [itemsCache, setItemsCache] = useState<{ [key: number]: OrderItemDTO }>({});

  const canCreate = ['PHUCVU', 'QUANLI'].includes(role);
  const canDelete = ['QUANLI'].includes(role);

  const load = async () => {
    setLoading(true);
    try {
      const orders = await orderService.list();
      console.log('Orders data:', orders); // Debug
      setOrders(orders);
      for (const order of orders) {
        if (order.itemIds) {
          for (const itemId of order.itemIds) {
            if (!itemsCache[itemId]) {
              try {
                console.log(`Fetching item ${itemId}`); // Debug
                const item = await orderService.getItem(itemId);
                setItemsCache(prev => ({ ...prev, [itemId]: item }));
              } catch (e) {
                console.error(`Error loading item ${itemId}:`, e); // Debug
              }
            }
          }
        }
      }
      console.log('Items cache:', itemsCache); // Debug
    } catch (e) {
      console.error('Load orders error:', e); // Debug
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Role:', role, 'Username:', username); // Debug
    load();
  }, []);

  const visibleOrders = useMemo(
    () =>
      role === 'CUSTOMER'
        ? orders.filter((o) => o.customerName === username)
        : orders,
    [orders, role, username]
  );

  const createOrder = async (payload: Omit<OrderDTO, 'id' | 'itemIds'>) => {
    try {
      await orderService.create(payload);
      setCreating(false);
      await load();
      alert('Tạo đơn thành công');
    } catch (e) {
      console.error('Create order error:', e); // Debug
      alert('Lỗi khi tạo đơn hàng');
    }
  };

  const deleteOrder = async (id: number) => {
    if (confirm('Xóa đơn hàng?')) {
      try {
        await orderService.remove(id);
        await load();
        alert('Đã xóa');
      } catch (e) {
        console.error('Delete order error:', e); // Debug
        alert('Lỗi khi xóa đơn hàng');
      }
    }
  };

  const pay = async (orderId: number) => {
    try {
      const p: PaymentDTO = { method: 'CASH', orderId: orderId };
      await paymentService.create(p);
      await load();
      alert('Đã tạo thanh toán');
    } catch (e) {
      console.error('Payment error:', e); // Debug
      alert('Lỗi khi tạo thanh toán');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Đơn hàng</h1>
          {canCreate && (
            <button
              onClick={() => setCreating(true)}
              className="rounded-md bg-gray-900 px-3 py-1.5 text-white"
            >
              + Tạo đơn
            </button>
          )}
        </div>

        {creating && (
          <div className="mb-6">
            <OrderForm
              onSubmit={createOrder}
              onCancel={() => setCreating(false)}
            />
          </div>
        )}

        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto rounded-xl border bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Khách hàng</th>
                  <th className="p-3 text-left">Thời gian</th>
                  <th className="p-3 text-left">Trạng thái</th>
                  <th className="p-3 text-left">Tổng tiền</th>
                  <th className="p-3 text-left">Items</th>
                  <th className="p-3 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {visibleOrders.map((o: OrderDTO) => (
                  <tr key={o.id} className="border-t align-top">
                    <td className="p-3">{o.id}</td>
                    <td className="p-3">{o.customerName || o.customerId}</td>
                    <td className="p-3">
                      {o.orderTime
                        ? new Date(o.orderTime).toLocaleString()
                        : 'N/A'}
                    </td>
                    <td className="p-3">{o.status}</td>
                    <td className="p-3">{o.totalAmount || 0}</td>
                    <td className="p-3">
                      <ul className="list-disc pl-4">
                        {o.itemIds?.map((id) => (
                          <li key={id}>
                            {itemsCache[id]?.foodName
                              ? `${itemsCache[id].foodName} x ${itemsCache[id].quantity}`
                              : 'Loading...'}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => pay(o.id!)}
                        className="rounded bg-green-600 px-2 py-1 text-white"
                      >
                        Thanh toán
                      </button>
                      {canDelete && (
                        <button
                          onClick={() => deleteOrder(o.id!)}
                          className="rounded bg-red-600 px-2 py-1 text-white"
                        >
                          Xóa
                        </button>
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