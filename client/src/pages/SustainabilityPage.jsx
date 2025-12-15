import { Link } from 'react-router-dom';

export default function SustainabilityPage() {
  return (
    <div 
      className="min-h-screen py-16 relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/75 to-blue-900/75"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Link to="/why-jmb/savings" className="text-blue-600 hover:underline flex items-center gap-2">
            ← Savings
          </Link>
          <Link to="/why-jmb" className="text-blue-600 hover:underline">Back to Why JMB →</Link>
        </div>

        <div className="bg-white p-8 rounded shadow">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 order-2 lg:order-1">
              <h1 className="text-3xl font-bold mb-3 text-blue-700">🌿 Sustainability</h1>
              <p className="text-gray-700 leading-7 mb-4">
                Sustainability is built into every run: water reuse, low-impact chemistries, and energy-efficient machinery.
                You get compliant outputs, lower effluent load, and a greener supply chain story.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800">
                <li>Closed-loop water recovery to cut fresh water draw</li>
                <li>Formulations tuned for lower COD/BOD and minimal AOX</li>
                <li>Energy-optimized process windows (temp & dwell) per fabric</li>
                <li>Traceable batches with environmental metrics per lot</li>
              </ul>
            </div>
            <div className="w-full lg:w-80 h-56 bg-cover bg-center rounded order-1 lg:order-2" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80')" }} />
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Swipe or click to explore more</p>
          <Link to="/why-jmb/savings" className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
            ← Previous: Savings
          </Link>
        </div>
      </div>
    </div>
  );
}
