import type { Food } from '../types/food';


export default function ProductCard({ food, onEdit, onDelete }:{ food: Food; onEdit?: ()=>void; onDelete?: ()=>void }){
return (
<div className="rounded-2xl border bg-white p-4 shadow-sm">
{food.imageUrl && <img src={food.imageUrl} alt={food.name} className="mb-3 h-40 w-full rounded-xl object-cover"/>}
<div className="flex items-start justify-between">
<div>
<h3 className="text-lg font-semibold">{food.name}</h3>
<p className="text-sm text-gray-500">{food.category}</p>
</div>
<span className="text-base font-bold">{food.price?.toLocaleString()}₫</span>
</div>
{food.description && <p className="mt-2 text-sm text-gray-600">{food.description}</p>}
{(onEdit || onDelete) && (
<div className="mt-3 flex gap-2">
{onEdit && <button onClick={onEdit} className="rounded-md border px-3 py-1.5 text-sm">Sửa</button>}
{onDelete && <button onClick={onDelete} className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white">Xóa</button>}
</div>
)}
</div>
);
}