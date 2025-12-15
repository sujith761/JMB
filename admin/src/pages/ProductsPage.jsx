import { useEffect, useState } from 'react';
import api from '../services/api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', ratePerMeter: 0, processType: 'bleaching' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to load products', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form);
        setEditingId(null);
      } else {
        await api.post('/products', form);
      }
      setForm({ name: '', description: '', ratePerMeter: 0, processType: 'bleaching' });
      loadProducts();
    } catch (err) {
      console.error('Failed to save product', err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        loadProducts();
      } catch (err) {
        console.error('Failed to delete product', err);
      }
    }
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p._id);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Product Management</h1>

      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit' : 'Add'} Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Rate per meter"
            value={form.ratePerMeter}
            onChange={(e) => setForm({ ...form, ratePerMeter: Number(e.target.value) })}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <select
            value={form.processType}
            onChange={(e) => setForm({ ...form, processType: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="bleaching">Bleaching</option>
            <option value="dyeing">Dyeing</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            {editingId ? 'Update' : 'Add'} Product
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ name: '', description: '', ratePerMeter: 0, processType: 'bleaching' });
              }}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 ml-2"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Rate/meter</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-4">{p.name}</td>
                <td className="p-4">{p.processType}</td>
                <td className="p-4">₹{p.ratePerMeter}</td>
                <td className="p-4 space-x-2">
                  <button onClick={() => handleEdit(p)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
