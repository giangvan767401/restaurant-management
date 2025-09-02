'use client';
import { useState } from 'react';
import type { Food } from '../types/food';


export default function ProductForm({ initial, onSubmit, onCancel }:{ initial?: Partial<Food>; onSubmit:(f:Food)=>void; onCancel:()=>void }){
const [form, setForm] = useState<Food>({
id: initial?.id,
name: initial?.name || '',
price: initial?.price || 0,
description: initial?.description || '',
category: initial?.category || '',
available: initial?.available ?? true,
imageUrl: initial?.imageUrl || '',
});
return (
<div className="rounded-2xl border p-4">
<div className="grid gap-3 sm:grid-cols-2">
<input className="rounded-md border p-2" placeholder="Tên món" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
<input className="rounded-md border p-2" type="number" placeholder="Giá" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})}/>
<input className="rounded-md border p-2" placeholder="Loại" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}/>
<input className="rounded-md border p-2" placeholder="Ảnh (URL)" value={form.imageUrl} onChange={e=>setForm({...form, imageUrl:e.target.value})}/>
<textarea className="sm:col-span-2 rounded-md border p-2" placeholder="Mô tả" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
<label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.available} onChange={e=>setForm({...form, available:e.target.checked})}/> Còn bán</label>
</div>
<div className="mt-3 flex gap-2">
<button onClick={()=>onSubmit(form)} className="rounded-md bg-gray-900 px-3 py-1.5 text-white">Lưu</button>
<button onClick={onCancel} className="rounded-md border px-3 py-1.5">Hủy</button>
</div>
</div>
);
}