import { parts } from '../utils/partsData';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PartsList from '../components/partsList/PartsList';
import PartCard from '../components/partsList/PartCard';

export default function Home() {
  const [cart, setCart] = useState([]);
  const [featuredBuilds, setFeaturedBuilds] = useState([]);
  const [trendingParts, setTrendingParts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured builds
  useEffect(() => {
    setLoading(true);
    fetch('/mockData/builds.json')
      .then(res => res.json())
      .then(data => {
        // Sort by popularity to get the most popular ones
        const sortedBuilds = [...data].sort((a, b) => b.popularity - a.popularity);
        setFeaturedBuilds(sortedBuilds.slice(0, 3)); // Take top 3 builds
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading builds:", err);
        setLoading(false);
      });
  }, []);

  // Generate trending parts from local data
  useEffect(() => {
    // Sort by rating to get the highest rated parts
    const sortedParts = [...parts].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    setTrendingParts(sortedParts.slice(0, 6)); // Take top 6 components
  }, []);

  const addToCart = (part) => {
    setCart((prev) => [...prev, part]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Build Your Dream PC</h1>
              <p className="text-blue-100 text-lg mb-6">
                Find the perfect components, compare prices, and check compatibility all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/part-selector" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
                  Build Your PC
                </Link>
                <Link to="/build-guide" className="px-6 py-3 bg-white hover:bg-gray-100 text-blue-800 font-medium rounded-md transition-colors">
                  View Build Guides
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6 max-w-md">
                <h2 className="text-xl font-semibold mb-3">Simplified PC Building</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Compare prices across local retailers</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Check component compatibility</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Follow expert PC build guides</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Featured PC Builds */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-3xl font-bold text-blue-800">Featured PC Builds</h2>
              <p className="text-gray-600 mt-1">Pre-designed builds for different needs and budgets</p>
            </div>
            <Link to="/build-guide" className="text-blue-600 hover:text-blue-800 font-medium">
              View All Builds →
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredBuilds.map(build => (
                <Link 
                  to={`/build-guide?build=${build.id}`} 
                  key={build.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    {build.image ? (
                      <img 
                        src={build.image} 
                        alt={build.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">No image</div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4">
                      <h3 className="font-bold text-lg">{build.name}</h3>
                      <div className="flex justify-between">
                        <span>₱{build.price?.toLocaleString()}</span>
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">{build.purpose}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm line-clamp-2">{build.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(build.popularity) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-sm text-gray-600">{build.popularity?.toFixed(1)}</span>
                      </div>
                      <span className="text-blue-700 font-bold text-sm">View Details</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Trending Components */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-3xl font-bold text-blue-800">Trending Components</h2>
              <p className="text-gray-600 mt-1">Most popular PC parts right now</p>
            </div>
            <Link to="/compare" className="text-blue-600 hover:text-blue-800 font-medium">
              Compare All Components →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingParts.map(part => (
              <div key={part.id} className="h-full">
                <PartCard part={part} onAdd={addToCart} inCart={cart.some(item => item.id === part.id)} />
              </div>
            ))}
          </div>
        </section>
        
        {/* Shop All Components */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-3xl font-bold text-blue-800">Shop Components</h2>
              <p className="text-gray-600 mt-1">Browse all available PC parts</p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:flex-1">
              <PartsList parts={parts} cart={cart} onAdd={addToCart} />
            </div>
            
            {/* Cart */}
            <div className="w-full lg:w-96 bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-blue-700">Shopping Cart</h2>
              {cart.length === 0 ? (
                <div className="text-center py-6">
                  <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-gray-500 mt-2">Your cart is empty.</p>
                  <p className="text-sm text-gray-400">Add components to build your PC.</p>
                </div>
              ) : (
                <>
                  <ul className="space-y-3 mb-4 max-h-80 overflow-auto">
                    {cart.map((item) => (
                      <li key={item.id} className="flex justify-between items-center border-b pb-2">
                        <div className="flex items-center">
                          {item.image && (
                            <img src={item.image} alt={item.name} className="w-10 h-10 object-contain mr-3" />
                          )}
                          <div>
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.type}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-blue-700 font-medium">₱{item.price.toLocaleString()}</span>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium mb-2">
                      <span>Subtotal</span>
                      <span>₱{cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</span>
                    </div>
                    <button className="w-full py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors">
                      Checkout
                    </button>
                    <button 
                      className="w-full mt-2 py-2 bg-transparent border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors"
                      onClick={() => setCart([])}
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
