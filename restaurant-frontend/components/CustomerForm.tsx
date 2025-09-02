'use client';
import { useState } from 'react';
import type { Customer } from '../types/customer';


export default function CustomerForm({ initial, onSubmit, onCancel }:{ initial?: Partial<Customer>; onSubmit:(c:Customer)=>void; onCancel:()=>void }){
const [form, setForm] = useState<Customer>({
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
<div className="rounded-2xl border p-4">
<div className="grid gap-3 sm:grid-cols-2">
<input className="rounded-md border p-2" placeholder="Tên" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
<input className="rounded-md border p-2" placeholder="SĐT" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
<input className="rounded-md border p-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
<input className="rounded-md border p-2" placeholder="Địa chỉ" value={form.address} onChange={e=>setForm({...form, address:e.target.value})}/>
<input className="rounded-md border p-2" placeholder="Giới tính" value={form.gender} onChange={e=>setForm({...form, gender:e.target.value})}/>
<input className="rounded-md border p-2" type="number" placeholder="Tuổi" value={form.age} onChange={e=>setForm({...form, age:Number(e.target.value)})}/>
<input className="rounded-md border p-2" placeholder="Cấp độ (Bac/Vang/Kim Cuong)" value={form.level} onChange={e=>setForm({...form, level:e.target.value})}/>
</div>
<div className="mt-3 flex gap-2">
<button onClick={()=>onSubmit(form)} className="rounded-md bg-gray-900 px-3 py-1.5 text-white">Lưu</button>
<button onClick={onCancel} className="rounded-md border px-3 py-1.5">Hủy</button>
</div>
</div>
);
}