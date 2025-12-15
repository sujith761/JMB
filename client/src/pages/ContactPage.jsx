import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function ContactPage() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadMessages = async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/contact/my');
      setMessages(res.data || []);
    } catch (e) {
      setError(e.response?.data?.message || 'Could not load replies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setStatus('Please sign in or sign up to send a message.');
      return;
    }
    
    try {
      await api.post('/contact', form);
      setStatus('Message sent successfully!');
      setForm({ name: '', email: '', phone: '', message: '' });
      loadMessages();
    } catch {
      setStatus('Error sending message. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        
        {!user && (
          <div className="max-w-2xl mx-auto bg-yellow-50 border border-yellow-200 rounded p-4 mb-6 text-center">
            <p className="text-yellow-800 mb-3">Please sign in or sign up to send us a message.</p>
            <div className="flex gap-3 justify-center">
              <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Sign In
              </Link>
              <Link to="/register" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                Sign Up
              </Link>
            </div>
          </div>
        )}
        
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
          {user ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Send Message
              </button>
            </form>
          ) : (
            <div className="text-center text-gray-600 py-8">
              <p>You need to be logged in to send a message.</p>
            </div>
          )}
          {status && (
            <p className={`mt-4 ${status.includes('Error') || status.includes('Please') ? 'text-red-600' : 'text-green-600'}`}>
              {status}
            </p>
          )}
        </div>
      </div>
      
      {user ? (
        <div className="container mx-auto px-4 mt-8">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Messages & Replies</h2>
              <button onClick={loadMessages} className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Refresh</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            {!loading && messages.length === 0 && <p className="text-gray-600 text-sm">No messages yet. Submit the form to contact us.</p>}
            {!loading && messages.length > 0 && (
              <ul className="space-y-3">
                {messages.map((m) => (
                  <li key={m._id} className="border rounded p-3 bg-gray-50">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{new Date(m.createdAt).toLocaleString()}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${m.replied ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {m.replied ? 'Replied' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-gray-800">{m.message}</p>
                    {m.reply && (
                      <div className="mt-2 text-sm text-blue-900 bg-blue-50 border border-blue-100 rounded p-2">
                        <strong>Reply:</strong> {m.reply}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 mt-8 text-center text-sm text-gray-600">
          Log in to see admin replies to your messages.
        </div>
      )}
    </div>
  );
}
