// Displays a single PC part card with add-to-cart button
export default function PartCard({ part, onAdd, inCart }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow flex flex-col justify-between h-full">
      <div>
        <div className="font-semibold text-lg">{part.name}</div>
        <div className="text-xs text-gray-400 mb-2">{part.type}</div>
        <div className="text-blue-700 font-bold mb-2">₱{part.price}</div>
      </div>
      <button
        className="mt-auto px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={() => onAdd(part)}
        disabled={inCart}
      >
        {inCart ? 'Added' : 'Add to Cart'}
      </button>
    </div>
  );
}
