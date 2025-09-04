import { parts } from '../utils/partsData';

export default function BuildPC() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Build Your PC</h2>
      <p className="mb-4 text-gray-700">Select your parts and check compatibility. (Prototype: uses mock data)</p>
      <div className="border rounded p-4 bg-white shadow">
        <h3 className="font-semibold mb-2">Available Parts</h3>
        <ul className="space-y-2">
          {parts.map(part => (
            <li key={part.id} className="flex justify-between items-center border-b pb-2">
              <span>{part.name} <span className="text-xs text-gray-400">({part.type})</span></span>
              <span className="text-blue-700 font-bold">₱{part.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
