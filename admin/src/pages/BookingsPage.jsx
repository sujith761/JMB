import { useEffect, useState } from 'react';
import api from '../services/api';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadBookings();
  }, [filter]);

  const loadBookings = async () => {
    try {
      const url = filter ? `/admin/bookings?status=${filter}` : '/admin/bookings';
      const res = await api.get(url);
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to load bookings', err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}/status`, { status });
      loadBookings();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Booking Management</h1>

      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">All Bookings</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Process</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-4">{b.user?.name || 'N/A'}</td>
                <td className="p-4 capitalize">{b.processType}</td>
                <td className="p-4">{b.quantityMeters}m</td>
                <td className="p-4">₹{b.totalAmount}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded text-white text-sm ${
                    b.status === 'completed' ? 'bg-green-600' :
                    b.status === 'processing' ? 'bg-blue-600' :
                    b.status === 'pending' ? 'bg-orange-600' :
                    'bg-red-600'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b._id, e.target.value)}
                    className="border px-2 py-1 rounded text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
