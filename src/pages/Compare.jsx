import { parts } from '../utils/partsData';

export default function Compare() {
  // For demo, just show all parts and their retailer prices
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Compare Prices</h2>
      <p className="mb-4 text-gray-700">See which local retailer has the best price for your chosen part. (Prototype: uses mock data)</p>
      <div className="border rounded p-4 bg-white shadow">
        <h3 className="font-semibold mb-2">Parts & Prices</h3>
        <ul className="space-y-4">
          {parts.map(part => (
            <li key={part.id}>
              <div className="font-medium">{part.name} <span className="text-xs text-gray-400">({part.type})</span></div>
              <ul className="ml-4 mt-1">
                {part.retailers.map((r, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{r.name}</span>
                    <span className="text-blue-700">₱{r.price}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
