// src/pages/PartSelector.jsx
import { useState, useEffect } from 'react';
import { parts } from '../utils/partsData';
import CompatibilityChecker from '../components/compatibility/CompatibilityChecker';

// Define the order of component selection for the build process
const typeOrder = ['CPU', 'Motherboard', 'Memory', 'GPU', 'Storage', 'PSU', 'Case', 'CPU Cooler', 'Fans', 'Monitor', 'Keyboard', 'Mouse', 'Audio'];

// Get unique part types and sort them according to the defined order
const partTypes = [...new Set(parts.map(p => p.type))]
  .sort((a, b) => {
    const indexA = typeOrder.indexOf(a);
    const indexB = typeOrder.indexOf(b);
    return (indexA >= 0 ? indexA : 999) - (indexB >= 0 ? indexB : 999);
  });

export default function PartSelector() {
  const [selected, setSelected] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price when selection changes
  useEffect(() => {
    const sum = selected.reduce((total, part) => total + part.price, 0);
    setTotalPrice(sum);
  }, [selected]);

  const handleSelect = (type, id) => {
    setSelected(prev => {
      const filtered = prev.filter(p => p.type !== type);
      const part = parts.find(p => p.id === Number(id));
      return id ? [...filtered, part] : filtered;
    });
  };
  // Function to check if a part is compatible with the current selection
  const isCompatible = (part) => {
    // Skip compatibility check for empty selection
    if (selected.length === 0) return true;

    // Check CPU + Motherboard compatibility
    if (part.type === 'CPU') {
      const selectedMobo = selected.find(p => p.type === 'Motherboard');
      if (selectedMobo) {
        return part.compatibility.some(socket => selectedMobo.compatibility.includes(socket));
      }
    }

    if (part.type === 'Motherboard') {
      const selectedCpu = selected.find(p => p.type === 'CPU');
      if (selectedCpu) {
        return part.compatibility.some(socket => selectedCpu.compatibility.includes(socket));
      }
    }

    // Check Monitor + GPU compatibility (Display ports)
    if (part.type === 'Monitor') {
      const selectedGpu = selected.find(p => p.type === 'GPU');
      if (selectedGpu && selectedGpu.compatibility && part.compatibility) {
        // Simplified check - in a real app would check specific ports
        return true; // Assume compatibility for demo
      }
    }

    // Check Case + Fans compatibility (fan size)
    if (part.type === 'Fans') {
      const selectedCase = selected.find(p => p.type === 'Case');
      if (selectedCase) {
        // Simplified compatibility check - assume all cases fit 120mm fans
        return part.compatibility.includes('120mm');
      }
    }

    // For peripherals, we'll assume compatibility
    if (['Keyboard', 'Mouse', 'Audio'].includes(part.type)) {
      return true;
    }

    return true;
  };
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Build Your PC</h2>
      <p className="mb-6 text-gray-700">
        Select one component per category to create your custom PC build. The compatibility checker
        will help ensure your selected parts work together.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
        {/* Left column: Part selection form */}
        <div className="md:col-span-5 bg-white rounded-lg shadow p-4">
          <h3 className="font-medium text-lg mb-4">Select Components</h3>
          <form className="space-y-4">
            {partTypes.map(type => (
              <div key={type}>
                <label className="block mb-1 text-sm font-medium">{type}</label>
                <select
                  className="border rounded px-3 py-2 w-full bg-white"
                  value={selected.find(p => p.type === type)?.id || ''}
                  onChange={e => handleSelect(type, e.target.value)}
                >
                  <option value="">Select a {type}...</option>
                  {parts
                    .filter(p => p.type === type)
                    .map(p => (
                      <option 
                        key={p.id} 
                        value={p.id}
                        disabled={!isCompatible(p)}
                      >
                        {p.name} - ₱{p.price.toLocaleString()} 
                        {!isCompatible(p) && ' (Incompatible)'}
                      </option>
                    ))}
                </select>
              </div>
            ))}
          </form>
        </div>

        {/* Right column: Selected parts summary */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-3 px-4">
              <h3 className="text-white font-medium">Build Summary</h3>
            </div>
            <div className="p-4">
              <div className="mb-3 flex justify-between">
                <span className="font-medium text-sm text-gray-600">Components</span>
                <span className="font-medium text-sm text-gray-600">{selected.length} of {partTypes.length}</span>
              </div>
              
              {selected.length > 0 ? (
                <ul className="space-y-2 mb-4">
                  {selected.map(p => (
                    <li key={p.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <div className="font-medium text-gray-800">{p.name}</div>
                        <div className="text-xs text-gray-500">{p.type}</div>
                      </div>
                      <div className="text-blue-700 font-medium">₱{p.price.toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No components selected yet
                </div>
              )}
              
              <div className="flex justify-between border-t pt-3">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-blue-700">₱{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <CompatibilityChecker selectedParts={selected} />
        </div>
      </div>
    </div>
  );
}
