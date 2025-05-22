// src/utils/priceUtils.js

/**
 * Get the best price from retailer data
 * For parts using the old data model with retailers array
 * @param {Object} part - The part object with retailers array
 * @returns {Object|null} - The retailer with the best price or null
 */
export function getBestPrice(part) {
  if (!part || !part.retailers || part.retailers.length === 0) return null;
  return part.retailers.reduce(
    (best, r) => (r.price < best.price ? r : best),
    part.retailers[0]
  );
}

/**
 * Get the best price from retailerPrices array
 * For parts using the new data model with retailerPrices array
 * @param {Object} part - The part object with retailerPrices array
 * @returns {Object|null} - The retailer price object with the best price or null
 */
export function getBestRetailerPrice(part) {
  if (!part || !part.retailerPrices || part.retailerPrices.length === 0)
    return null;
  return part.retailerPrices.reduce(
    (best, r) => (r.price < best.price ? r : best),
    part.retailerPrices[0]
  );
}

/**
 * Calculate price differences between retailers as percentages
 * @param {Array} retailerPrices - Array of retailer price objects
 * @returns {Array} - Same array with added priceDiffPercent property
 */
export function calculatePriceDifferences(retailerPrices) {
  if (!retailerPrices || retailerPrices.length <= 1) return retailerPrices;

  // Find the lowest price
  const lowestPrice = retailerPrices.reduce(
    (min, r) => (r.price < min ? r.price : min),
    retailerPrices[0].price
  );

  // Calculate difference percentages
  return retailerPrices.map((r) => ({
    ...r,
    priceDiffPercent:
      r.price > lowestPrice
        ? Math.round(((r.price - lowestPrice) / lowestPrice) * 100)
        : 0,
  }));
}

/**
 * Format price in Philippine Peso with options
 * @param {number} price - Price to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted price
 */
export function formatPrice(price, options = {}) {
  const {
    showCurrency = true,
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options;

  if (price === undefined || price === null) return "N/A";

  const formatted = price.toLocaleString("en-PH", {
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return showCurrency ? `₱${formatted}` : formatted;
}

/**
 * Calculate the total price of selected parts
 * @param {Array} parts - Array of part objects with price property
 * @returns {number} - Total price
 */
export function calculateTotalPrice(parts) {
  if (!parts || parts.length === 0) return 0;
  return parts.reduce((total, part) => total + (part.price || 0), 0);
}
