// src/components/priceComparison/PriceComparisonTable.jsx
export default function PriceComparisonTable({ part }) {
  if (!part) {
    return <div className="text-gray-500">Select a part to compare prices.</div>;
  }
  return (
    <div className="mt-4 p-4 border rounded bg-gray-50">
      <h3 className="font-semibold mb-2">Price Comparison</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-1">Retailer</th>
            <th className="py-1">Price</th>
            <th className="py-1">Link</th>
          </tr>
        </thead>
        <tbody>
          {part.retailers.map((r, i) => (
            <tr key={i} className="border-b">
              <td className="py-1">{r.name}</td>
              <td className="py-1 text-blue-700 font-semibold">₱{r.price}</td>
              <td className="py-1">
                <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Visit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
