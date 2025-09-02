import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';


export default function Home(){
return (
<div className="min-h-screen bg-gray-50">
<Header/>
<main className="mx-auto max-w-6xl p-6">
<div className="rounded-3xl bg-gradient-to-br from-gray-900 to-gray-700 p-10 text-white shadow-xl">
<h1 className="text-3xl font-bold">🍽 Restaurant App</h1>
<p className="mt-2 max-w-2xl text-gray-200">Quản lý nhà hàng đơn giản: menu, khách hàng, đơn hàng và thanh toán.</p>
<Link href="/products" className="mt-6 inline-block rounded-xl bg-white px-5 py-2.5 font-medium text-gray-900">Xem Menu</Link>
</div>
</main>
<Footer/>
</div>
);
}