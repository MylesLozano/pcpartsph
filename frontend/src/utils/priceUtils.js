// src/utils/priceUtils.js
// Utility to get the best price for a part
export function getBestPrice(part) {
  if (!part || !part.retailers || part.retailers.length === 0) return null;
  return part.retailers.reduce(
    (best, r) => (r.price < best.price ? r : best),
    part.retailers[0]
  );
}

// Utility to format PHP prices
export function formatPrice(price) {
  return `₱${price.toLocaleString()}`;
}
