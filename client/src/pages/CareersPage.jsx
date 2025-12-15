export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Careers at JMB</h1>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
          <p className="text-gray-700 leading-7 mb-4">
            Join our team of dedicated professionals shaping the future of textile processing. 
            We are always looking for talented individuals in engineering, operations, and administration.
          </p>
          <p className="text-gray-700 leading-7">
            Send your resume to <a href="mailto:careers@jmb.com" className="text-blue-600 underline">careers@jmb.com</a> 
            or contact us via our Contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
