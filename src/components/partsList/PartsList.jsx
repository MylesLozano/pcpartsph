import { useState } from 'react';
import PartCard from './PartCard';

export default function PartsList({ parts, cart, onAdd }) {
  const [filter, setFilter] = useState({
    type: '',
    sort: 'popularity'
  });

  // Filter and sort parts
  const filteredParts = parts
    .filter(part => !filter.type || part.type === filter.type)
    .sort((a, b) => {
      switch (filter.sort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'popularity':
        default:
          return (b.rating || 0) - (a.rating || 0); // Default to rating sort
      }
    });

  // Get unique part types for filter
  const partTypes = [...new Set(parts.map(p => p.type))];

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex-grow max-w-xs">
          <select
            className="border rounded px-3 py-2 w-full bg-white text-gray-800"
            value={filter.type}
            onChange={e => setFilter({...filter, type: e.target.value})}
          >
            <option value="">All Part Types</option>
            {partTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="flex-grow max-w-xs">
          <select
            className="border rounded px-3 py-2 w-full bg-white text-gray-800"
            value={filter.sort}
            onChange={e => setFilter({...filter, sort: e.target.value})}
          >
            <option value="popularity">Popularity</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Parts grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredParts.length > 0 ? (
          filteredParts.map((part) => (
            <li key={part.id}>
              <PartCard 
                part={part} 
                onAdd={onAdd} 
                inCart={cart.some((item) => item.id === part.id)} 
              />
            </li>
          ))
        ) : (
          <li className="col-span-full text-center py-8 text-gray-500">
            No parts matching your filters.
          </li>
        )}
      </ul>
    </div>
  );
}
