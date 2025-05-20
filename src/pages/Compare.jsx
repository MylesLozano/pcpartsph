import { useState } from 'react';
import { parts } from '../utils/partsData';
import PriceComparisonTable from '../components/priceComparison/PriceComparisonTable';

export default function Compare() {
  const [selectedPartId, setSelectedPartId] = useState(null);
  const selectedPart = parts.find((p) => p.id === selectedPartId);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Compare Prices</h2>
      <p className="mb-4 text-gray-700">See which local retailer has the best price for your chosen part. (Prototype: uses mock data)</p>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Select a part:</label>
        <select
          className="border rounded px-3 py-2 w-full"
          value={selectedPartId || ''}
          onChange={e => setSelectedPartId(Number(e.target.value))}
        >
          <option value="" disabled>Select a part...</option>
          {parts.map(part => (
            <option key={part.id} value={part.id}>{part.name} ({part.type})</option>
          ))}
        </select>
      </div>
      <PriceComparisonTable part={selectedPart} />
    </div>
  );
}
