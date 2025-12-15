import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const durationOptions = ['24 hours', '48 hours', '72 hours'];

export default function BookingPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [processType, setProcessType] = useState('bleaching');
  const [fabricType, setFabricType] = useState('cotton');
  const [quantity, setQuantity] = useState(100);
  const [duration, setDuration] = useState(durationOptions[0]);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await api.get(`/products?processType=${processType}`);
      setProducts(res.data);
      if (res.data[0]) setPrice(res.data[0].ratePerMeter);
    })();
  }, [processType]);

  const total = price * quantity;

  const handleCancelBooking = async () => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    if (bookingId) {
      try {
        await api.patch(`/bookings/${bookingId}`, { status: 'cancelled' });
      } catch (err) {
        console.error('Failed to cancel booking:', err);
      }
    }
    
    // Show payment failed message and redirect to home
    setMessage('Payment failed. Redirecting to home...');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('Please sign in to book.');
      return;
    }
    try {
      const booking = await api.post('/bookings', {
        processType,
        fabricType,
        costPerMeter: price,
        quantityMeters: quantity,
        duration,
        vehicleNumber,
        notes,
        totalAmount: total
      });
      setBookingId(booking.data._id);
      setMessage('Booking created. Proceeding to payment...');
      // Create Razorpay order
      const orderRes = await api.post('/payments/order', { amount: total });
      const { orderId, key, amount, currency, paymentId } = orderRes.data;

      const options = {
        key,
        amount,
        currency,
        name: 'JMB Fabric Processing',
        description: 'Bleaching/Dyeing Booking',
        order_id: orderId,
        handler: async function (response) {
          await api.post('/payments/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            paymentId,
            bookingId: booking.data._id
          });
          setMessage('Payment success! Booking confirmed.');
          setBookingId(null);
          // Reset form after successful payment
          setProcessType('bleaching');
          setFabricType('cotton');
          setQuantity(100);
          setVehicleNumber('');
          setNotes('');
        },
        modal: {
          ondismiss: async function() {
            // User closed payment modal without completing payment
            setMessage('Payment cancelled. You can retry payment or cancel the booking below.');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: '#2563eb' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Book Processing</h1>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Process Type</label>
                <select value={processType} onChange={(e) => setProcessType(e.target.value)} className="w-full border px-3 py-2 rounded">
                  <option value="bleaching">Bleaching</option>
                  <option value="dyeing">Dyeing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fabric Type</label>
                <input value={fabricType} onChange={(e) => setFabricType(e.target.value)} className="w-full border px-3 py-2 rounded" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cost per meter</label>
                <select value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full border px-3 py-2 rounded">
                  {products.map((p) => (
                    <option key={p._id} value={p.ratePerMeter}>{p.name} - ₹{p.ratePerMeter}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quantity (meters)</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full border px-3 py-2 rounded">
                  {durationOptions.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Vehicle Number</label>
              <input value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fabric Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full border px-3 py-2 rounded" />
            </div>

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700">Proceed to Payment</button>
              <button type="button" onClick={handleCancelBooking} className="px-8 bg-red-600 text-white py-3 rounded hover:bg-red-700">
                {bookingId ? 'Cancel Booking' : 'Cancel'}
              </button>
            </div>
          </form>
          {message && <p className="mt-4 text-center text-sm text-green-700">{message}</p>}
        </div>
      </div>
    </div>
  );
}
