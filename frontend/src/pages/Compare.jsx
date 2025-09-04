import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../utils/api";
import PriceComparisonTable from "../components/priceComparison/PriceComparisonTable";

export default function Compare() {
  const { partName: initialPartName } = useParams();
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPartName, setSelectedPartName] = useState(
    initialPartName || ""
  );

  useEffect(() => {
    const fetchParts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/parts");
        setParts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching parts");
        setLoading(false);
        console.error(err);
      }
    };

    fetchParts();
  }, []);

  useEffect(() => {
    if (initialPartName) {
      setSelectedPartName(decodeURIComponent(initialPartName));
    }
  }, [initialPartName]);

  if (loading) return <div className="text-center py-10">Loading parts...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  // Group parts by type for dropdown organization
  const partsByType = parts.reduce((acc, part) => {
    if (!acc[part.type]) {
      acc[part.type] = [];
    }
    acc[part.type].push(part);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Compare Prices</h1>
      <p className="mb-6 text-gray-700">
        Compare prices from different retailers to find the best deal on PC
        parts in the Philippines.
      </p>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <label htmlFor="part-select" className="block text-lg font-medium mb-2">
          Select a part to compare:
        </label>
        <select
          id="part-select"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedPartName}
          onChange={(e) => setSelectedPartName(e.target.value)}
        >
          <option value="">-- Select a part --</option>
          {Object.entries(partsByType).map(([type, typeParts]) => (
            <optgroup key={type} label={type}>
              {typeParts.map((part) => (
                <option key={part.id} value={part.name}>
                  {part.name} - ₱{parseFloat(part.price).toLocaleString()}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <PriceComparisonTable partName={selectedPartName} />
    </div>
  );
}
