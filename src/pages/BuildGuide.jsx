// src/pages/BuildGuide.jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function BuildGuide() {
  const [builds, setBuilds] = useState([]);
  const [selectedBuild, setSelectedBuild] = useState(null);
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    purpose: '',
    priceRange: '',
    sort: 'popularity'
  });

  useEffect(() => {
    document.title = 'PCPartsPH | Build Guide';
  }, []);

  useEffect(() => {
    fetch('/mockData/builds.json')
      .then(res => res.json())
      .then(data => {
        setBuilds(data);
        // Check if build ID is in URL params
        const buildId = searchParams.get('build');
        if (buildId) {
          const buildIdNum = parseInt(buildId);
          const build = data.find(b => b.id === buildIdNum);
          if (build) {
            setSelectedBuild(buildIdNum);
          }
        }
      });
  }, [searchParams]);

  // Filter and sort builds
  const filteredBuilds = builds.filter(build => {
    // Filter by purpose
    if (filter.purpose && build.purpose !== filter.purpose) return false;
    
    // Filter by price range
    if (filter.priceRange) {
      const [min, max] = filter.priceRange.split('-').map(Number);
      if (build.price < min || (max && build.price > max)) return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort builds
    switch (filter.sort) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'performance':
        return b.performanceScore - a.performanceScore;
      case 'popularity':
      default:
        return b.popularity - a.popularity;
    }
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Build Guide</h2>
      <p className="mb-6 text-gray-700">Explore sample PC builds for different needs and budgets.</p>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Purpose:</label>
          <select
            className="border rounded px-3 py-2 w-full bg-white text-gray-800"
            value={filter.purpose}
            onChange={e => setFilter({...filter, purpose: e.target.value})}
          >
            <option value="">All Purposes</option>
            <option value="Gaming">Gaming</option>
            <option value="Everyday/Light Gaming">Everyday/Light Gaming</option>
            <option value="Workstation">Workstation</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Price Range:</label>
          <select
            className="border rounded px-3 py-2 w-full bg-white text-gray-800"
            value={filter.priceRange}
            onChange={e => setFilter({...filter, priceRange: e.target.value})}
          >
            <option value="">Any Price</option>
            <option value="0-30000">Below ₱30,000</option>
            <option value="30000-50000">₱30,000 - ₱50,000</option>
            <option value="50000-80000">₱50,000 - ₱80,000</option>
            <option value="80000-">Above ₱80,000</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Sort By:</label>
          <select
            className="border rounded px-3 py-2 w-full bg-white text-gray-800"
            value={filter.sort}
            onChange={e => setFilter({...filter, sort: e.target.value})}
          >
            <option value="popularity">Popularity</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
            <option value="performance">Performance</option>
          </select>
        </div>
      </div>

      {/* Build Selection - Card View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
        {filteredBuilds.map(build => (
          <div 
            key={build.id} 
            className={`border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow cursor-pointer ${selectedBuild === build.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedBuild(build.id)}
          >
            <div className="h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
              {build.image ? (
                <img src={build.image} alt={build.name} className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400">No image</div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg text-gray-800">{build.name}</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {build.purpose}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1 mb-2">{build.description}</p>
              <div className="flex justify-between items-center pt-2 border-t">
                <div>
                  <div className="text-gray-700 font-medium">₱{build.price.toLocaleString()}</div>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3 h-3 ${i < Math.floor(build.popularity) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">{build.popularity.toFixed(1)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-600">Performance</div>
                  <div className="text-blue-700 font-bold">{build.performanceScore}/100</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Build Details */}
      {selectedBuild && (
        <BuildDetails buildId={selectedBuild} />
      )}
    </div>
  );
}

function BuildDetails({ buildId }) {
  const [build, setBuild] = useState(null);
  const [components, setComponents] = useState([]);
  const [retailers, setRetailers] = useState([]);

  useEffect(() => {
    fetch('/mockData/builds.json')
      .then(res => res.json())
      .then(builds => setBuild(builds.find(b => b.id === buildId)));
    fetch('/mockData/components.json')
      .then(res => res.json())
      .then(setComponents);
    fetch('/mockData/retailers.json')
      .then(res => res.json())
      .then(setRetailers);
  }, [buildId]);

  if (!build) return null;

  // Group components by type
  const groupedParts = build.parts.reduce((acc, pid) => {
    const part = components.find(c => c.id === pid);
    if (part) {
      if (!acc[part.type]) {
        acc[part.type] = [];
      }
      acc[part.type].push(part);
    }
    return acc;
  }, {});

  // Component type display order
  const typeOrder = ['CPU', 'Motherboard', 'Memory', 'GPU', 'Storage', 'PSU', 'Case', 'CPU Cooler'];
  
  // Calculate total price
  const totalPrice = build.parts.reduce((sum, pid) => {
    const part = components.find(c => c.id === pid);
    return part ? sum + part.price : sum;
  }, 0);

  return (
    <div className="mt-4 border rounded-lg overflow-hidden bg-white shadow">
      {/* Build header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
        <div className="flex flex-col md:flex-row md:justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-1">{build.name}</h3>
            <p className="text-blue-100">{build.description}</p>
          </div>
          <div className="mt-2 md:mt-0 flex items-center">
            <div className="px-3 py-1 bg-blue-900 rounded-full text-sm font-medium">
              {build.purpose}
            </div>
            <div className="ml-3 px-3 py-1 bg-blue-900 rounded-full text-sm font-medium">
              ₱{totalPrice.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Performance score */}
      <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-600">Performance Score</div>
          <div className="ml-2 font-bold text-blue-700">{build.performanceScore}/100</div>
        </div>
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-600">Popularity</div>
          <div className="ml-2 flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < Math.floor(build.popularity) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm text-gray-600">{build.popularity.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Components list */}
      <div className="p-4">
        <h4 className="font-semibold text-lg mb-3 text-gray-800">Components</h4>
        <div className="space-y-6">
          {typeOrder.map(type => {
            if (!groupedParts[type]) return null;
            return (
              <div key={type} className="border-b pb-4 last:border-0 last:pb-0">
                <h5 className="font-medium text-sm text-gray-500 mb-2">{type}</h5>
                <div className="space-y-3">
                  {groupedParts[type].map(part => {
                    // Find lowest price retailer
                    let lowestPrice = part.price;
                    let lowestPriceRetailer = null;
                    
                    if (part.retailerPrices && part.retailerPrices.length > 0) {
                      const lowest = part.retailerPrices.reduce((min, current) => 
                        current.price < min.price ? current : min, part.retailerPrices[0]);
                      lowestPrice = lowest.price;
                      lowestPriceRetailer = retailers.find(r => r.id === lowest.retailerId);
                    }

                    return (
                      <div key={part.id} className="flex flex-col md:flex-row md:items-center gap-3 hover:bg-gray-50 p-2 rounded-md transition-colors">
                        <div className="flex-none w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                          {part.image ? (
                            <img src={part.image} alt={part.name} className="w-10 h-10 object-contain" />
                          ) : (
                            <div className="text-gray-400 text-xs text-center">{part.type}</div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="font-medium text-gray-800">{part.name}</div>
                          <div className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1 mt-1">
                            {part.specs && Object.entries(part.specs).slice(0, 3).map(([key, value]) => (
                              <span key={key}>{key}: {value}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex-none text-right">
                          <div className="font-medium text-gray-900">₱{lowestPrice.toLocaleString()}</div>
                          {lowestPriceRetailer && (
                            <div className="text-xs text-blue-600 hover:underline cursor-pointer">
                              from {lowestPriceRetailer.name}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Build footer */}
      <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
        <div className="text-sm text-gray-500">Published by {build.author} on {new Date(build.publishDate).toLocaleDateString()}</div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
          Use This Build
        </button>
      </div>
    </div>
  );
}
