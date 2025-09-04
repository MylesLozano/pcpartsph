import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function PartDetail() {
  const { id } = useParams();
  const [part, setPart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPart = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/parts/${id}`);
        setPart(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching part details");
        setLoading(false);
        console.error(err);
      }
    };

    fetchPart();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!part) return <div className="text-center py-10">Part not found</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row">
        {part.image && (
          <div className="md:w-1/3 mb-4 md:mb-0">
            <img
              src={part.image}
              alt={part.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
        <div className="md:w-2/3 md:pl-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{part.name}</h1>
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {part.type}
            </span>
            {part.retailer && (
              <span className="inline-block bg-green-100 text-green-800 text-sm font-medium ml-2 px-2.5 py-0.5 rounded">
                {part.retailer}
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-6">
            ₱{parseFloat(part.price).toLocaleString()}
          </div>

          {part.specifications && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Specifications</h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <ul className="space-y-2">
                  {Object.entries(part.specifications).map(([key, value]) => (
                    <li key={key} className="flex">
                      <span className="font-medium w-1/3">{key}:</span>
                      <span className="w-2/3">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex space-x-4 mt-6">
            <Link
              to={`/compare/${encodeURIComponent(part.name)}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Compare Prices
            </Link>
            <Link
              to="/build"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add to Build
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartDetail;
