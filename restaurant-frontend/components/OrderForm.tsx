'use client';
import { useEffect, useState } from 'react';
import type { Order } from '../types/order';
import type { Customer } from '../types/customer';
import type { Food } from '../types/food';
import { customerService } from '../services/customerService';
import { foodService } from '../services/foodService';


export default function OrderForm({ onSubmit, onCancel }:{ onSubmit:(o:Order)=>void; onCancel:()=>void }){
const [customers, setCustomers] = useState<Customer[]>([]);
const [foods, setFoods] = useState<Food[]>([]);
const [customerId, setCustomerId] = useState<number|undefined>();
const [items, setItems] = useState<{ foodId?: number; quantity: number }[]>([{ quantity: 1 }]);


useEffect(()=>{ (async()=>{
try { setCustomers(await customerService.list()); } catch {}
try { setFoods(await foodService.list()); } catch {}
})(); },[]);


const addItem = ()=> setItems([...items, { quantity: 1 }]);
const updateItem = (idx:number, patch: Partial<{foodId:number;quantity:number}>) => setItems(items.map((it,i)=> i===idx? {...it, ...patch}:it));
const removeItem = (idx:number) => setItems(items.filter((_,i)=>i!==idx));


return (
<div className="rounded-2xl border p-4">
<div className="grid gap-3">
<label className="text-sm">Khách hàng</label>
<select className="rounded-md border p-2" value={customerId} onChange={e=>setCustomerId(Number(e.target.value))}>
<option value="">-- Chọn khách hàng --</option>
{customers.map(c=> <option key={c.id} value={c.id}>{c.id} - {c.name}</option>)}
</select>


<div className="mt-2">
<div className="mb-2 text-sm font-medium">Món ăn</div>
{items.map((it, idx)=> (
<div key={idx} className="mb-2 grid items-center gap-2 sm:grid-cols-[1fr_120px_80px]">
<select className="rounded-md border p-2" value={it.foodId} onChange={e=>updateItem(idx,{foodId:Number(e.target.value)})}>
<option value="">-- Chọn món --</option>
{foods.map(f=> <option key={f.id} value={f.id}>{f.name} - {f.price?.toLocaleString()}₫</option>)}
</select>
<input className="rounded-md border p-2" type="number" min={1} value={it.quantity} onChange={e=>updateItem(idx,{quantity:Number(e.target.value)})}/>
<button onClick={()=>removeItem(idx)} className="rounded-md border px-3 py-1.5 text-sm">Xóa</button>
</div>
))}
<button onClick={addItem} className="rounded-md bg-gray-100 px-3 py-1.5 text-sm">+ Thêm món</button>
</div>


<div className="mt-3 flex gap-2">
<button onClick={()=> onSubmit({ customerId, orderItems: items.map(i=>({ foodId: i.foodId!, quantity: i.quantity })) } as Order)} className="rounded-md bg-gray-900 px-3 py-1.5 text-white">Tạo đơn</button>
<button onClick={onCancel} className="rounded-md border px-3 py-1.5">Hủy</button>
</div>
</div>
</div>
);
}