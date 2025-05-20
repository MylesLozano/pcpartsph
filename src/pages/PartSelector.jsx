// src/pages/PartSelector.jsx
import { useState } from 'react';
import { parts } from '../utils/partsData';
import CompatibilityChecker from '../components/compatibility/CompatibilityChecker';

const partTypes = Array.from(new Set(parts.map(p => p.type)));

export default function PartSelector() {
  const [selected, setSelected] = useState([]);

  const handleSelect = (type, id) => {
    setSelected(prev => {
      const filtered = prev.filter(p => p.type !== type);
      const part = parts.find(p => p.id === Number(id));
      return id ? [...filtered, part] : filtered;
    });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Part Selector</h2>
      <p className="mb-4 text-gray-700">Select one part per category to build your PC and check compatibility.</p>
      <form className="space-y-4">
        {partTypes.map(type => (
          <div key={type}>
            <label className="block mb-1 font-medium">{type}</label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={selected.find(p => p.type === type)?.id || ''}
              onChange={e => handleSelect(type, e.target.value)}
            >
              <option value="">Select a {type}...</option>
              {parts.filter(p => p.type === type).map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        ))}
      </form>
      <CompatibilityChecker selectedParts={selected} />
      {selected.length > 0 && (
        <div className="mt-4 border rounded p-4 bg-white shadow">
          <h3 className="font-semibold mb-2">Your Selected Parts</h3>
          <ul className="list-disc ml-6 text-gray-700">
            {selected.map(p => (
              <li key={p.id}>{p.name} <span className="text-xs text-gray-400">({p.type})</span></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
