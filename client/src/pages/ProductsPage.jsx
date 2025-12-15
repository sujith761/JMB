import { useEffect, useState } from 'react';
import api from '../services/api';

export default function ProductsPage() {
  const [bleachingProducts, setBleachingProducts] = useState([]);
  const [dyeingProducts, setDyeingProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const bleach = await api.get('/products?processType=bleaching');
      const dye = await api.get('/products?processType=dyeing');
      setBleachingProducts(bleach.data);
      setDyeingProducts(dye.data);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>

        <section id="bleaching" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-blue-700">Bleaching Chemicals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bleachingProducts.map((p) => (
              <div key={p._id} className="bg-white rounded shadow p-4">
                {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-32 object-cover rounded mb-3" />}
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-sm text-gray-600 my-2">{p.description}</p>
                <p className="text-green-700 font-semibold">₹{p.ratePerMeter}/meter</p>
              </div>
            ))}
          </div>
        </section>

        <section id="dyeing">
          <h2 className="text-3xl font-semibold mb-6 text-green-700">Dyeing Chemicals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dyeingProducts.map((p) => (
              <div key={p._id} className="bg-white rounded shadow p-4">
                {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-32 object-cover rounded mb-3" />}
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-sm text-gray-600 my-2">{p.description}</p>
                <p className="text-green-700 font-semibold">₹{p.ratePerMeter}/meter</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
