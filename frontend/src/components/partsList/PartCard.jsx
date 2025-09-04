import { Link } from "react-router-dom";

export default function PartCard({ part, onAdd, inCart }) {
  const { id, name, price, type, retailer, image } = part;

  return (
    <div className="card bg-base-100 shadow-xl">
      {image && (
        <figure>
          <img src={image} alt={name} className="h-48 w-full object-cover" />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">
          {name}
          <div className="badge badge-secondary">{type}</div>
        </h2>

        {retailer && <p className="text-sm opacity-75">Retailer: {retailer}</p>}

        <div className="text-2xl font-bold mt-2">
          ₱{parseFloat(price).toLocaleString()}
        </div>

        <div className="card-actions justify-end mt-4">
          <Link to={`/part/${id}`} className="btn btn-outline btn-info">
            Details
          </Link>
          <button
            className={`btn ${inCart ? "btn-disabled" : "btn-primary"}`}
            onClick={() => onAdd && onAdd(part)}
            disabled={inCart}
          >
            {inCart ? "Added" : "Add to Build"}
          </button>
        </div>
      </div>
    </div>
  );
}
