import { parts } from "../utils/partsData";
import { useState } from "react";
import PartsList from "../components/partsList/PartsList";

export default function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = (part) => {
    setCart((prev) => [...prev, part]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Parts List */}
        <div className="flex-1">
          <div className="hero bg-base-200 rounded-lg p-6 mb-8">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-4xl font-bold">PCPartsPH Shop</h1>
                <p className="py-6">
                  Browse and add PC parts to your cart. (Prototype: mock data
                  only)
                </p>
              </div>
            </div>
          </div>
          <PartsList parts={parts} cart={cart} onAdd={addToCart} />
        </div>

        {/* Cart */}
        <div className="w-full md:w-80">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Your Cart</h2>

              {cart.length === 0 ? (
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
                  <span>Your cart is empty.</span>
                </div>
              ) : (
                <>
                  <ul className="menu bg-base-100 w-full rounded-box">
                    {cart.map((item) => (
                      <li key={item.id} className="border-b">
                        <div className="flex justify-between items-center w-full">
                          <span>{item.name}</span>
                          <button
                            className="btn btn-xs btn-error"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="divider"></div>

                  <div className="stats shadow">
                    <div className="stat">
                      <div className="stat-title">Total</div>
                      <div className="stat-value text-primary">
                        ₱
                        {cart
                          .reduce(
                            (sum, item) => sum + parseFloat(item.price),
                            0
                          )
                          .toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary">Checkout</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
