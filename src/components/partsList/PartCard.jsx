// Displays a single PC part card with add-to-cart button
export default function PartCard({ part, onAdd, inCart }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow flex flex-col justify-between h-full">
      {/* Part image */}
      <div className="h-32 bg-gray-100 flex items-center justify-center border-b">
        {part.image ? (
          <img src={part.image} alt={part.name} className="h-28 w-28 object-contain" />
        ) : (
          <div className="text-gray-400 text-xs text-center">{part.type}</div>
        )}
      </div>
      
      {/* Part details */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-1">
          <div className="font-semibold text-lg text-gray-800 line-clamp-2">{part.name}</div>
          {part.rating && (
            <div className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded flex items-center">
              <svg className="w-3 h-3 text-yellow-500 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {part.rating}
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 mb-2">{part.type}</div>
        
        {/* Specs preview */}
        {part.specs && (
          <ul className="text-xs text-gray-600 mb-3 space-y-1 flex-grow">
            {Object.entries(part.specs).slice(0, 3).map(([key, value]) => (
              <li key={key} className="flex items-start">
                <span className="font-medium w-20 flex-shrink-0">{key}:</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        )}
        
        {/* Price and action */}
        <div className="flex justify-between items-center mt-auto">
          <div className="text-blue-700 font-bold">₱{part.price.toLocaleString()}</div>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
            onClick={() => onAdd(part)}
            disabled={inCart}
          >
            {inCart ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
