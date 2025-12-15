import { Link } from 'react-router-dom';

export default function SavingsPage() {
  return (
    <div 
      className="min-h-screen py-16 relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1604871000636-074fa5117945?w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/75 to-emerald-900/75"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Link to="/why-jmb" className="text-blue-600 hover:underline">← Back to Why JMB</Link>
          <Link to="/why-jmb/sustainability" className="text-blue-600 hover:underline flex items-center gap-2">
            Sustainability →
          </Link>
        </div>

        <div className="bg-white p-8 rounded shadow">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-3 text-green-700">💰 Savings</h1>
              <p className="text-gray-700 leading-7 mb-4">
                We cut cost without cutting corners. Optimized recipes, bulk chemical procurement, and energy-aware runs
                drive lower cost-per-meter while keeping your whiteness index and shade targets consistent.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-800">
                <li>Bulk procurement & optimized liquor ratios reduce chemical spend</li>
                <li>Shorter cycle times through tuned bleaching/dyeing curves</li>
                <li>Real-time QC minimizes rework and over-processing costs</li>
                <li>Transparent pricing with predictable cost-per-meter models</li>
              </ul>
            </div>
            <div className="w-full lg:w-80 h-56 bg-cover bg-center rounded" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80')" }} />
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Swipe or click to explore more</p>
          <Link to="/why-jmb/sustainability" className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
            Next: Sustainability →
          </Link>
        </div>
      </div>
    </div>
  );
}
