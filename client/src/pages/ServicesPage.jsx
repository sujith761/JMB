import { Link } from 'react-router-dom';
import services from '../data/services';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((svc) => (
            <div key={svc.slug} className="bg-white rounded shadow hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center rounded-t" style={{ backgroundImage: `url(${svc.image})` }} />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{svc.title}</h2>
                <p className="text-gray-700 mb-4">{svc.summary}</p>
                <ul className="list-disc list-inside text-sm text-gray-700 mb-4 space-y-1">
                  {svc.bullets.slice(0, 2).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <Link to={`/services/${svc.slug}`} className="text-blue-600 font-medium hover:underline">
                  View details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
