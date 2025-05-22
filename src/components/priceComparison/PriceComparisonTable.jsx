// src/components/priceComparison/PriceComparisonTable.jsx
export default function PriceComparisonTable({ part }) {
  if (!part) {
    return <div className="text-gray-500">Select a part to compare prices.</div>;
  }

  // Sort retailers by price
  const sortedRetailers = [...part.retailers].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedRetailers[0]?.price;

  return (
    <div className="mt-4 border rounded-lg overflow-hidden">
      {/* Part information header */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-start gap-4">
          {part.image && (
            <div className="w-20 h-20 bg-gray-100 flex-shrink-0 rounded flex items-center justify-center">
              <img src={part.image} alt={part.name} className="w-16 h-16 object-contain" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{part.name}</h3>
            <div className="text-sm text-gray-500">{part.type}</div>
            {part.rating && (
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(part.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-sm text-gray-600">{part.rating}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Specs summary */}
        {part.specs && (
          <div className="mt-3 pt-3 border-t grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
            {Object.entries(part.specs).map(([key, value]) => (
              <div key={key} className="flex items-center text-sm">
                <span className="font-medium text-gray-700">{key}: </span>
                <span className="ml-1 text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price comparison table */}
      <div className="bg-gray-50 p-4">
        <h4 className="font-medium mb-3 text-gray-700">Price Comparison</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="py-2 px-3 rounded-l-md">Retailer</th>
              <th className="py-2 px-3">Price</th>
              <th className="py-2 px-3 rounded-r-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedRetailers.map((r, i) => (
              <tr key={i} className={`border-b ${lowestPrice === r.price ? 'bg-green-50' : ''}`}>
                <td className="py-2 px-3">
                  <div className="font-medium">{r.name}</div>
                  {lowestPrice === r.price && (
                    <div className="text-xs text-green-600 font-medium">Lowest Price</div>
                  )}
                </td>
                <td className="py-2 px-3">
                  <div className={`font-semibold ${lowestPrice === r.price ? 'text-green-700' : 'text-blue-700'}`}>
                    ₱{r.price.toLocaleString()}
                  </div>
                </td>
                <td className="py-2 px-3">
                  <a 
                    href={r.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                  >
                    Visit Store
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
