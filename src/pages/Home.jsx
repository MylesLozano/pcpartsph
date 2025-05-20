export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">PCPartsPH</h1>
      <p className="text-lg text-gray-700 mb-8">Find compatible PC parts and the best local prices in the Philippines.</p>
      <nav className="flex gap-4">
        <a href="/build" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Build PC</a>
        <a href="/compare" className="px-4 py-2 bg-gray-200 text-blue-700 rounded hover:bg-gray-300">Compare Prices</a>
        <a href="/about" className="px-4 py-2 bg-gray-200 text-blue-700 rounded hover:bg-gray-300">About</a>
      </nav>
    </div>
  );
}
