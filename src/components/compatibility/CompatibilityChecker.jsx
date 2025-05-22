// src/components/compatibility/CompatibilityChecker.jsx

export default function CompatibilityChecker({ selectedParts }) {
  // Check if CPU and Motherboard sockets match
  const cpu = selectedParts.find(p => p.type === 'CPU');
  const mobo = selectedParts.find(p => p.type === 'Motherboard');
  const memory = selectedParts.find(p => p.type === 'Memory');
  const gpu = selectedParts.find(p => p.type === 'GPU');
  const psu = selectedParts.find(p => p.type === 'PSU');
  const cpuCooler = selectedParts.find(p => p.type === 'CPU Cooler');
  
  // CPU + Motherboard compatibility
  let cpuMoboCompatible = null;
  if (cpu && mobo) {
    cpuMoboCompatible = cpu.compatibility.some(socket => mobo.compatibility.includes(socket));
  }
  
  // Memory + Motherboard compatibility (simplified check)
  let memoryCompatible = null;
  if (memory && mobo) {
    memoryCompatible = true; // For this demo, assume all memory is compatible with all mobos
  }
  
  // Power requirements check (simplified)
  let powerSufficient = null;
  if (psu && (cpu || gpu)) {
    // This is a simplified power check - in a real app you would calculate actual power needs
    const cpuTdp = cpu?.specs?.tdp || 0;
    const gpuTdp = gpu?.specs?.tdp || 0;
    const estimatedPower = cpuTdp + gpuTdp + 150; // Add 150W for other components
    
    const psuWattage = psu.specs?.wattage ? parseInt(psu.specs.wattage) : 0;
    powerSufficient = psuWattage >= estimatedPower;
  }
  
  // CPU Cooler compatibility (simplified)
  let coolerCompatible = null;
  if (cpu && cpuCooler) {
    coolerCompatible = cpuCooler.compatibility.some(socket => cpu.compatibility.includes(socket));
  }
  
  // Count compatibility checks and determine overall status
  const checks = [
    { name: 'CPU + Motherboard', status: cpuMoboCompatible },
    { name: 'Memory + Motherboard', status: memoryCompatible },
    { name: 'Power Requirements', status: powerSufficient },
    { name: 'CPU Cooler + CPU', status: coolerCompatible }
  ].filter(check => check.status !== null);
  
  const passedChecks = checks.filter(check => check.status === true).length;
  const failedChecks = checks.filter(check => check.status === false).length;
  
  let overallStatus = 'checking';
  if (checks.length > 0) {
    overallStatus = failedChecks === 0 ? 'compatible' : 'incompatible';
  }

  return (
    <div className={`rounded-lg overflow-hidden shadow ${
      overallStatus === 'compatible' ? 'bg-green-50 border border-green-100' : 
      overallStatus === 'incompatible' ? 'bg-red-50 border border-red-100' : 
      'bg-white border'
    }`}>
      <div className={`p-3 flex justify-between items-center ${
        overallStatus === 'compatible' ? 'bg-green-600' : 
        overallStatus === 'incompatible' ? 'bg-red-600' : 
        'bg-blue-600'
      }`}>
        <h3 className="font-medium text-white">Compatibility Check</h3>
        {checks.length > 0 && (
          <span className="text-sm text-white">
            {passedChecks} of {checks.length} checks passed
          </span>
        )}
      </div>
      
      <div className="p-4">
        {checks.length > 0 ? (
          <ul className="space-y-2">
            {checks.map((check, index) => (
              <li key={index} className="flex items-center">
                {check.status ? (
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className={check.status ? 'text-gray-800' : 'text-red-700 font-medium'}>
                  {check.name}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center text-gray-500">
            <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Select components to check compatibility.</span>
          </div>
        )}
        
        {failedChecks > 0 && (
          <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-100 p-2 rounded">
            There are compatibility issues with your selected components.
          </div>
        )}
        
        {checks.length > 0 && failedChecks === 0 && (
          <div className="mt-3 text-sm text-green-600 bg-green-50 border border-green-100 p-2 rounded">
            All selected components are compatible!
          </div>
        )}
      </div>
    </div>
  );
}
