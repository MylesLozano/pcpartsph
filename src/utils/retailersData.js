// src/utils/retailersData.js

// Retailer data for use throughout the application
export const retailers = [
  {
    id: 1,
    name: "PC Express",
    url: "https://pcx.com.ph",
    logo: "/mockData/images/pcexpress-logo.webp",
    locations: ["SM North EDSA", "SM Megamall", "Gilmore IT Center"],
    rating: 4.7,
  },
  {
    id: 2,
    name: "DynaQuest",
    url: "https://dynaquestpc.com",
    logo: "/mockData/images/dynaquest-logo.webp",
    locations: ["Guadalupe Commercial Complex", "SM North EDSA"],
    rating: 4.8,
  },
  {
    id: 3,
    name: "PC Hub",
    url: "https://pchub.com.ph",
    logo: "/mockData/images/pchub-logo.webp",
    locations: ["Gilmore IT Center", "SM Megamall"],
    rating: 4.6,
  },
];

/**
 * Get retailer information by ID
 * @param {number} id - Retailer ID
 * @returns {object|null} Retailer information or null if not found
 */
export function getRetailerById(id) {
  return retailers.find((r) => r.id === id) || null;
}

/**
 * Get the lowest price retailer for a component
 * @param {Array} retailerPrices - Array of retailer price objects [{retailerId, price}]
 * @returns {Object|null} - {retailer, price} or null if no prices available
 */
export function getLowestPriceRetailer(retailerPrices) {
  if (!retailerPrices || retailerPrices.length === 0) return null;

  const lowest = retailerPrices.reduce(
    (min, current) => (current.price < min.price ? current : min),
    retailerPrices[0]
  );

  return {
    retailer: getRetailerById(lowest.retailerId),
    price: lowest.price,
  };
}

/**
 * Format price in Philippine Peso
 * @param {number} price - Price to format
 * @returns {string} Formatted price
 */
export function formatPrice(price) {
  return `₱${price.toLocaleString()}`;
}
