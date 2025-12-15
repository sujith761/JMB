import { Link } from 'react-router-dom';

export default function AdminSidebar() {
  return (
    <div className="bg-gray-900 text-white w-64 h-screen p-6 shadow-lg flex flex-col">
      <h2 className="text-lg font-bold mb-6">Menu</h2>
      <nav className="flex-1 space-y-4">
        <Link to="/admin/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to="/admin/products" className="block px-4 py-2 rounded hover:bg-gray-700">
          Products
        </Link>
        <Link to="/admin/bookings" className="block px-4 py-2 rounded hover:bg-gray-700">
          Bookings
        </Link>
        <Link to="/admin/payments" className="block px-4 py-2 rounded hover:bg-gray-700">
          Transactions
        </Link>
        <Link to="/admin/messages" className="block px-4 py-2 rounded hover:bg-gray-700">
          Messages
        </Link>
      </nav>
    </div>
  );
}
