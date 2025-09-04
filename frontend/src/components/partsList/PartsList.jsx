import { useState, useEffect } from "react";
import axios from "axios";
import PartCard from "./PartCard";

export default function PartsList({ type, cart, onAdd }) {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        setLoading(true);
        const url = type ? `/api/parts/type/${type}` : "/api/parts";
        const response = await axios.get(url);
        setParts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching parts");
        setLoading(false);
        console.error(err);
      }
    };

    fetchParts();
  }, [type]);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-error max-w-lg mx-auto my-10">
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

  if (parts.length === 0)
    return (
      <div className="alert alert-info max-w-lg mx-auto my-10">
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
        <span>No parts found</span>
      </div>
    );

  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold mb-4">
        {type ? `${type} Parts` : "All Parts"}
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {parts.map((part) => (
          <li key={part.id}>
            <PartCard
              part={part}
              onAdd={onAdd}
              inCart={cart && cart.some((item) => item.id === part.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
