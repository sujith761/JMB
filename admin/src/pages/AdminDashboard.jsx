import { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ bookings: 0, revenue: 0, pending: 0 });

  useEffect(() => {
    (async () => {
      try {
        const bookings = await api.get('/admin/bookings');
        const payments = await api.get('/admin/payments');

        const totalBookings = bookings.data.length;
        const totalRevenue = payments.data.reduce((sum, p) => sum + (p.status === 'success' ? p.amount : 0), 0);
        const pendingBookings = bookings.data.filter(b => b.status === 'pending').length;

        setStats({ bookings: totalBookings, revenue: totalRevenue, pending: pendingBookings });
      } catch (err) {
        console.error('Failed to load stats', err);
      }
    })();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-600 text-sm">Total Bookings</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.bookings}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-600 text-sm">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">₹{stats.revenue}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-600 text-sm">Pending Orders</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
        </div>
      </div>
    </div>
  );
}
