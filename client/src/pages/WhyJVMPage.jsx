export default function WhyJMBPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Why Choose JMB?</h1>

        <section className="mb-12 bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">💰 Savings</h2>
          <p className="text-gray-700 leading-7">
            We pass on cost savings through bulk processing, optimized chemical usage, and reduced waste. 
            Our competitive pricing models help textile manufacturers maximize their margins while maintaining top quality.
          </p>
        </section>

        <section className="bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">🌿 Sustainability</h2>
          <p className="text-gray-700 leading-7">
            Our facility employs advanced water reuse systems, eco-friendly chemicals, and energy-efficient processes. 
            We believe in sustainable textile processing that respects the environment and meets global compliance standards.
          </p>
        </section>
      </div>
    </div>
  );
}
