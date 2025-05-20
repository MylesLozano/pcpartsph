import { parts } from '../utils/partsData';
import { useState } from 'react';
import PartsList from '../components/partsList/PartsList';

export default function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = (part) => {
    setCart((prev) => [...prev, part]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Parts List */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">PCPartsPH Shop</h1>
        <p className="mb-6 text-gray-700">Browse and add PC parts to your cart. (Prototype: mock data only)</p>
        <PartsList parts={parts} cart={cart} onAdd={addToCart} />
      </div>
      {/* Cart */}
      <div className="w-full md:w-80 bg-white rounded-lg shadow p-6 h-fit">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-2 mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-1">
                <span>{item.name}</span>
                <button
                  className="text-xs text-red-500 hover:underline"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="font-semibold text-right text-blue-700">
          Total: ₱{cart.reduce((sum, item) => sum + item.price, 0)}
        </div>
      </div>
    </div>
  );
}
