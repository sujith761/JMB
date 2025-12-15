import { useEffect, useState } from 'react';
import api from '../services/api';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const res = await api.get('/admin/messages');
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to load messages', err);
    }
  };

  const handleReply = async (id) => {
    try {
      await api.post(`/admin/messages/${id}/reply`, { reply: replyText });
      setReplyingId(null);
      setReplyText('');
      loadMessages();
    } catch (err) {
      console.error('Failed to send reply', err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Customer Messages</h1>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg._id} className="bg-white p-6 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{msg.name}</h3>
                <p className="text-gray-600 text-sm">{msg.email}</p>
                {msg.phone && <p className="text-gray-600 text-sm">{msg.phone}</p>}
              </div>
              <span className={`px-3 py-1 rounded text-white text-sm ${msg.replied ? 'bg-green-600' : 'bg-orange-600'}`}>
                {msg.replied ? 'Replied' : 'New'}
              </span>
            </div>
            <p className="mt-4 text-gray-700">{msg.message}</p>
            {msg.reply && (
              <div className="mt-4 p-4 bg-blue-50 rounded">
                <p className="text-sm text-gray-600"><strong>Your Reply:</strong> {msg.reply}</p>
              </div>
            )}
            {!msg.replied && (
              <div className="mt-4">
                {replyingId === msg._id ? (
                  <div className="space-y-2">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      rows={3}
                      className="w-full border px-3 py-2 rounded"
                    />
                    <button
                      onClick={() => handleReply(msg._id)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Send Reply
                    </button>
                    <button
                      onClick={() => setReplyingId(null)}
                      className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700 ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setReplyingId(msg._id)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Reply
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
