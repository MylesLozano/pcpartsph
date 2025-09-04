import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PriceComparisonTable({ partName }) {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!partName) {
      setLoading(false);
      return;
    }

    const fetchPrices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/parts/compare/${encodeURIComponent(partName)}`
        );
        setPrices(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching price comparison data");
        setLoading(false);
        console.error(err);
      }
    };

    fetchPrices();
  }, [partName]);

  if (!partName) {
    return (
      <div className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Select a part to compare prices.</span>
      </div>
    );
  }

  if (loading)
    return (
      <div className="flex justify-center py-4">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{error}</span>
      </div>
    );

  if (prices.length === 0)
    return (
      <div className="alert alert-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>No price comparison data available</span>
      </div>
    );

  return (
    <div className="card bg-base-100 shadow-xl mt-4">
      <div className="card-body">
        <h3 className="card-title">Price Comparison: {partName}</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Retailer</th>
                <th>Part Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((item, index) => (
                <tr key={index}>
                  <td>{item.retailer || "Unknown"}</td>
                  <td>{item.name}</td>
                  <td className="text-primary font-bold">
                    ₱{parseFloat(item.price).toLocaleString()}
                  </td>
                  <td>
                    <Link
                      to={`/part/${item.id}`}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-sm opacity-70 mt-4">
          <p>* Prices may vary based on promotions and availability</p>
        </div>
      </div>
    </div>
  );
}
