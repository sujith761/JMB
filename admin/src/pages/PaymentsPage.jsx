import { useEffect, useState } from 'react';
import api from '../services/api';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const res = await api.get('/admin/payments');
      setPayments(res.data);
    } catch (err) {
      console.error('Failed to load payments', err);
    }
  };

  const downloadPDF = async (range = 'daily') => {
    try {
      const res = await api.get(`/reports/transactions?range=${range}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transactions_${range}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error('Failed to download PDF', err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Transactions</h1>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => downloadPDF('daily')}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Download Daily PDF
        </button>
        <button
          onClick={() => downloadPDF('monthly')}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Download Monthly PDF
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-4">{p.user?.name || 'N/A'}</td>
                <td className="p-4">₹{p.amount}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded text-white text-sm ${
                    p.status === 'success' ? 'bg-green-600' :
                    p.status === 'failed' ? 'bg-red-600' :
                    'bg-yellow-600'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="p-4 text-sm">{p.razorpayOrderId || 'N/A'}</td>
                <td className="p-4 text-sm">{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
