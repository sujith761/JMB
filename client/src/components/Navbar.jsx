import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import services from '../data/services';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openServices, setOpenServices] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [openWhy, setOpenWhy] = useState(false);

  const whyItems = [
    { label: 'Savings', to: '/why-jmb/savings', summary: 'Cost efficiency & bulk advantages' },
    { label: 'Sustainability', to: '/why-jmb/sustainability', summary: 'Water reuse, eco-friendly chemistries' }
  ];

  const productItems = [
    { label: 'Bleaching', to: '/products/bleaching', summary: 'Hydrogen peroxide, enzymatic, ozone' },
    { label: 'Dyeing', to: '/products/dyeing', summary: 'B-Max, F-Max, Mini-Max, more' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold">
          JMB
        </Link>
        <ul className="hidden md:flex space-x-6 items-center">
          <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
          <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
          <li><Link to="/careers" className="hover:text-blue-400">Careers</Link></li>
          <li className="relative group" onMouseEnter={() => setOpenWhy(true)} onMouseLeave={() => setOpenWhy(false)}>
            <button className="hover:text-blue-400 flex items-center gap-1">
              Why JMB
              <span className="text-xs">▾</span>
            </button>
            <div className={`${openWhy ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'} absolute left-0 mt-2 w-64 bg-white text-gray-800 rounded shadow-xl transition-all duration-150 z-20`}>
              <div className="p-3 border-b text-xs uppercase text-gray-500">Explore strengths</div>
              <ul>
                {whyItems.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="block px-4 py-3 hover:bg-gray-100" onClick={() => setOpenWhy(false)}>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="text-xs text-gray-600">{item.summary}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li className="relative group" onMouseEnter={() => setOpenServices(true)} onMouseLeave={() => setOpenServices(false)}>
            <button className="hover:text-blue-400 flex items-center gap-1">
              Services
              <span className="text-xs">▾</span>
            </button>
            <div className={`${openServices ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'} absolute left-0 mt-2 w-72 bg-white text-gray-800 rounded shadow-xl transition-all duration-150 z-20`}>
              <div className="p-3 border-b text-xs uppercase text-gray-500">Choose a service</div>
              <ul className="max-h-80 overflow-y-auto">
                {services.map((svc) => (
                  <li key={svc.slug}>
                    <Link
                      to={`/services/${svc.slug}`}
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={() => setOpenServices(false)}
                    >
                      <div className="text-sm font-semibold">{svc.title}</div>
                      <div className="text-xs text-gray-600 line-clamp-2">{svc.summary}</div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t p-3 text-center text-sm">
                <Link to="/services" className="text-blue-600 hover:underline" onClick={() => setOpenServices(false)}>View all services</Link>
              </div>
            </div>
          </li>
          <li className="relative group" onMouseEnter={() => setOpenProducts(true)} onMouseLeave={() => setOpenProducts(false)}>
            <button className="hover:text-blue-400 flex items-center gap-1">
              Products
              <span className="text-xs">▾</span>
            </button>
            <div className={`${openProducts ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'} absolute left-0 mt-2 w-64 bg-white text-gray-800 rounded shadow-xl transition-all duration-150 z-20`}>
              <div className="p-3 border-b text-xs uppercase text-gray-500">Browse categories</div>
              <ul>
                {productItems.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="block px-4 py-3 hover:bg-gray-100" onClick={() => setOpenProducts(false)}>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="text-xs text-gray-600">{item.summary}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          {user && <li><Link to="/my-orders" className="hover:text-blue-400">My Orders</Link></li>}
          <li><Link to="/contact" className="hover:text-blue-400">Contact Us</Link></li>
        </ul>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm">Hi, {user.name}</span>
              <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-600 px-3 py-1 rounded">Sign In</Link>
              <Link to="/register" className="bg-green-600 px-3 py-1 rounded">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
