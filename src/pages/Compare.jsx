import { useState, useEffect } from 'react';
import { parts } from '../utils/partsData';
import PriceComparisonTable from '../components/priceComparison/PriceComparisonTable';

export default function Compare() {
  const [selectedPartId, setSelectedPartId] = useState(null);
  const [filterType, setFilterType] = useState('');
  const selectedPart = parts.find((p) => p.id === selectedPartId);
  
  // Get unique part types
  const partTypes = [...new Set(parts.map(p => p.type))];
  
  // Filtered parts based on selected type
  const filteredParts = filterType 
    ? parts.filter(p => p.type === filterType)
    : parts;

  // Reset selection when filter changes
  useEffect(() => {
    setSelectedPartId(null);
  }, [filterType]);

  useEffect(() => {
    document.title = 'PCPartsPH | Compare';
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Compare Prices</h2>
      <p className="mb-6 text-gray-700">
        See which local retailer has the best price for your chosen component.
        <span className="text-xs text-gray-500 ml-2">(Prototype: uses mock data)</span>
      </p>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Filter by component type:</label>
            <select
              className="border rounded px-3 py-2 w-full bg-white text-gray-800"
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
            >
              <option value="">All Component Types</option>
              {partTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Select a component:</label>
            <select
              className="border rounded px-3 py-2 w-full bg-white text-gray-800"
              value={selectedPartId || ''}
              onChange={e => setSelectedPartId(Number(e.target.value))}
              disabled={filteredParts.length === 0}
            >
              <option value="" disabled>
                {filteredParts.length === 0 ? 'No components available' : 'Select a component...'}
              </option>
              {filteredParts.map(part => (
                <option key={part.id} value={part.id}>
                  {part.name} {part.rating && `(${part.rating}★)`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {selectedPart ? (
        <PriceComparisonTable part={selectedPart} />
      ) : (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-lg flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Select a component above to compare prices across retailers.</span>
        </div>
      )}
    </div>
  );
}
