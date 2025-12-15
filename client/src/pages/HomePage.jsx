import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const getStartedTo = user ? '/booking' : '/register?redirect=/booking';
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Gradient Background */}
      <section 
        className="text-white py-24 relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container mx-auto text-center px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">JMB – Fabric Bleaching & Dyeing Excellence</h1>
          <p className="text-xl mb-8 drop-shadow-md">Eco-friendly processing, competitive pricing, trusted by textile manufacturers.</p>
          <Link to={getStartedTo} className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded text-lg font-medium shadow-lg">
            Get Started
          </Link>
        </div>
      </section>

      {/* Quick Booking Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Quick Booking</h2>
          <div className="max-w-2xl mx-auto bg-white shadow rounded p-6">
            <p className="text-gray-700 mb-4 text-center">Select your process type, fabric, and proceed to payment in minutes.</p>
            <div className="flex justify-center">
              <Link to={getStartedTo} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why JMB Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose JMB?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2 text-green-700">Savings</h3>
              <p className="text-gray-700">Reduced cost, bulk processing, optimized workflows for maximum efficiency.</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">Sustainability</h3>
              <p className="text-gray-700">Eco-friendly chemicals, water reuse, reduced carbon footprint.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-700 mb-8">We offer professional bleaching and dyeing for a wide range of fabrics.</p>
          <Link to="/services" className="text-blue-600 underline text-lg">Learn More &rarr;</Link>
        </div>
      </section>

      {/* CTA */}
      <section 
        className="py-16 text-white text-center relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Ready to Transform Your Fabrics?</h2>
          <p className="text-lg mb-6 drop-shadow-md">Book online, track progress, and download invoices instantly.</p>
          <Link to="/register" className="bg-white text-indigo-700 px-8 py-3 rounded text-lg font-medium hover:bg-gray-100 shadow-lg">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}
