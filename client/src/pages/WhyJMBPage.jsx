export default function WhyJMBPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Why Choose JMB?</h1>

        <section id="savings" className="mb-12 bg-white p-8 rounded shadow">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-3 text-green-700">💰 Savings</h2>
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
        </section>

        <section id="sustainability" className="bg-white p-8 rounded shadow">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 order-2 lg:order-1">
              <h2 className="text-2xl font-semibold mb-3 text-blue-700">🌿 Sustainability</h2>
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
        </section>
      </div>
    </div>
  );
}
