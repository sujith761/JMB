import { useParams, Link, useNavigate } from 'react-router-dom';
import services from '../data/services';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const svc = services.find((s) => s.slug === slug);

  if (!svc) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="mb-4 text-red-600">Service not found.</p>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-600 text-white rounded">Go Back</button>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-12 relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1558769132-cb1aea9c4e9e?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-purple-900/70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white rounded shadow overflow-hidden">
          <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${svc.image})` }} />
          <div className="p-8">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Service</p>
            <h1 className="text-3xl font-bold mb-4">{svc.title}</h1>
            <p className="text-gray-700 leading-7 mb-6">{svc.summary}</p>
            <ul className="space-y-2 mb-8 list-disc list-inside text-gray-800">
              {svc.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <Link to="/booking" className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700">Book this service</Link>
              <Link to="/services" className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200">Back to services</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
