import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuthContext';

export default function AdminTopbar() {
  const { admin, logout } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="bg-gray-800 text-white h-16 flex items-center justify-between px-6 shadow">
      <Link to="/admin/dashboard" className="text-2xl font-bold">JMB Admin</Link>
      <div className="flex items-center space-x-4">
        <span className="text-sm">{admin?.name}</span>
        <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  );
}
