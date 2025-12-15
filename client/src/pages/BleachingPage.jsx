import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function BleachingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get('/products?processType=bleaching');
      setProducts(res.data);
    })();
  }, []);

  return (
    <div 
      className="min-h-screen py-16 relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1558769132-cb1aea9c4e9e?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-indigo-900/80"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Link to="/products" className="text-blue-600 hover:underline text-lg px-4 py-2 hover:bg-blue-50 rounded transition">← Back to Products</Link>
          <Link to="/products/dyeing" className="text-blue-600 hover:underline flex items-center gap-2 text-lg px-4 py-2 hover:bg-blue-50 rounded transition">
            Dyeing →
          </Link>
        </div>

        <div className="bg-white p-8 rounded shadow mb-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">Bleaching Chemicals</h1>
          <p className="text-gray-700 leading-7 mb-6">
            Our state-of-the-art bleaching process uses eco-friendly chemicals to achieve pristine whites and neutral tones. 
            We support hydrogen peroxide, sodium hypochlorite, and enzymatic bleaching to suit different fabric requirements. 
            Ideal for cotton, linen, synthetic blends, and more.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p._id} className="bg-gray-50 rounded shadow p-4 hover:shadow-lg transition-shadow">
                {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-32 object-cover rounded mb-3" />}
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-sm text-gray-600 my-2">{p.description}</p>
                <p className="text-green-700 font-semibold mb-3">₹{p.ratePerMeter}/meter</p>
                <Link to="/booking" className="block text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                  Book Service
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">Swipe or click to explore more</p>
          <Link to="/products/dyeing" className="inline-block px-8 py-4 bg-blue-600 text-white rounded hover:bg-blue-700 text-lg font-semibold shadow-md transition">
            Next: Dyeing →
          </Link>
        </div>
      </div>
    </div>
  );
}
