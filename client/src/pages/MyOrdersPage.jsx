import { useEffect, useState } from 'react';
import api from '../services/api';

function StatusBadge({ status }) {
  const map = {
    pending: 'bg-orange-100 text-orange-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  const cls = map[status] || 'bg-gray-100 text-gray-800';
  return <span className={`px-2 py-1 rounded text-xs font-medium ${cls}`}>{status}</span>;
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setError('');
        const res = await api.get('/bookings/my');
        if (active) setOrders(res.data || []);
      } catch (e) {
        if (active) setError(e.response?.data?.message || 'Failed to load orders');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [refreshTick]);

  const refresh = () => setRefreshTick((x) => x + 1);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      await api.patch(`/bookings/${orderId}`, { status: 'cancelled' });
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel order');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <button onClick={refresh} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Refresh</button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {!loading && !orders.length && (
        <div className="bg-white rounded shadow p-6">No orders yet. Create your first booking from the Booking page.</div>
      )}

      {!loading && orders.length > 0 && (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Process</th>
                <th className="px-4 py-3">Fabric</th>
                <th className="px-4 py-3">Quantity (m)</th>
                <th className="px-4 py-3">Amount (₹)</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Notes</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-t">
                  <td className="px-4 py-3">{new Date(o.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 capitalize">{o.processType}</td>
                  <td className="px-4 py-3">{o.fabricType}</td>
                  <td className="px-4 py-3">{o.quantityMeters}</td>
                  <td className="px-4 py-3">{o.totalAmount}</td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3">{o.notes || '-'}</td>
                  <td className="px-4 py-3">
                    {o.status === 'pending' && (
                      <button
                        onClick={() => handleCancelOrder(o._id)}
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-3">Tip: Click Refresh to see updates after the admin changes your order status.</p>
    </div>
  );
}
