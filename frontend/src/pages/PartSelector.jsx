import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PartsList from "../components/partsList/PartsList";
import CompatibilityChecker from "../components/compatibility/CompatibilityChecker";

const PART_TYPES = [
  "CPU",
  "Motherboard",
  "RAM",
  "GPU",
  "Storage",
  "PSU",
  "Case",
  "CPU Cooler",
  "Monitor",
  "Keyboard",
  "Mouse",
];

export default function PartSelector() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [selectedParts, setSelectedParts] = useState([]);
  const [activeType, setActiveType] = useState(type || "CPU");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Load selected parts from localStorage on component mount
    const savedParts = localStorage.getItem("selectedParts");
    if (savedParts) {
      const parsedParts = JSON.parse(savedParts);
      setSelectedParts(parsedParts);

      // Calculate total price
      const total = parsedParts.reduce(
        (sum, part) => sum + parseFloat(part.price),
        0
      );
      setTotalPrice(total);
    }
  }, []);

  useEffect(() => {
    if (type && PART_TYPES.includes(type)) {
      setActiveType(type);
    }
  }, [type]);

  const handleTypeChange = (newType) => {
    setActiveType(newType);
    navigate(`/part-selector/${newType}`);
  };

  const handleAddPart = (part) => {
    setSelectedParts((prev) => {
      // Remove any existing part of the same type
      const filtered = prev.filter((p) => p.type !== part.type);
      const updated = [...filtered, part];

      // Save to localStorage
      localStorage.setItem("selectedParts", JSON.stringify(updated));

      // Calculate new total price
      const total = updated.reduce((sum, p) => sum + parseFloat(p.price), 0);
      setTotalPrice(total);

      return updated;
    });
  };

  const handleRemovePart = (partId) => {
    setSelectedParts((prev) => {
      const updated = prev.filter((p) => p.id !== partId);

      // Save to localStorage
      localStorage.setItem("selectedParts", JSON.stringify(updated));

      // Calculate new total price
      const total = updated.reduce((sum, p) => sum + parseFloat(p.price), 0);
      setTotalPrice(total);

      return updated;
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left sidebar with part types */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4">Component Types</h2>
            <ul className="space-y-2">
              {PART_TYPES.map((partType) => (
                <li key={partType}>
                  <button
                    onClick={() => handleTypeChange(partType)}
                    className={`w-full text-left px-4 py-2 rounded transition ${
                      activeType === partType
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {partType}
                    {selectedParts.some((p) => p.type === partType) && (
                      <span className="ml-2 text-green-600">✓</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content area */}
        <div className="w-full lg:w-2/4">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-6">Select {activeType}</h1>
            <PartsList
              type={activeType}
              cart={selectedParts}
              onAdd={handleAddPart}
            />
          </div>
        </div>

        {/* Right sidebar with selected parts */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg shadow p-4 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Your Build</h2>

            {selectedParts.length === 0 ? (
              <p className="text-gray-500">No parts selected yet</p>
            ) : (
              <>
                <ul className="divide-y">
                  {selectedParts.map((part) => (
                    <li key={part.id} className="py-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{part.name}</p>
                          <p className="text-sm text-gray-500">{part.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">
                            ₱{parseFloat(part.price).toLocaleString()}
                          </p>
                          <button
                            onClick={() => handleRemovePart(part.id)}
                            className="text-sm text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>₱{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <CompatibilityChecker selectedParts={selectedParts} />

                <div className="mt-4">
                  <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Save Build
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
