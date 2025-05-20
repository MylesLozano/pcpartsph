// src/components/compatibility/CompatibilityChecker.jsx

export default function CompatibilityChecker({ selectedParts }) {
  // Example: check if CPU and Motherboard sockets match
  const cpu = selectedParts.find(p => p.type === 'CPU');
  const mobo = selectedParts.find(p => p.type === 'Motherboard');
  let compatible = null;
  if (cpu && mobo) {
    compatible = cpu.compatibility.some(socket => mobo.compatibility.includes(socket));
  }

  return (
    <div className="mt-4 p-4 border rounded bg-gray-50">
      <h3 className="font-semibold mb-2">Compatibility Checker</h3>
      {cpu && mobo ? (
        compatible ? (
          <div className="text-green-600 font-bold">CPU and Motherboard are compatible!</div>
        ) : (
          <div className="text-red-600 font-bold">CPU and Motherboard are NOT compatible.</div>
        )
      ) : (
        <div className="text-gray-500">Select a CPU and a Motherboard to check compatibility.</div>
      )}
    </div>
  );
}
