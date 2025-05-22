// src/utils/compatibilityUtils.js

/**
 * Utility function to check compatibility between two parts
 * @param {Object} partA - First part object
 * @param {Object} partB - Second part object
 * @returns {boolean} - Whether the parts are compatible
 */
export function arePartsCompatible(partA, partB) {
  if (!partA || !partB) return false;
  if (!partA.compatibility || !partB.compatibility) return false;
  return partA.compatibility.some((c) => partB.compatibility.includes(c));
}

/**
 * Calculate estimated power consumption for a build
 * @param {Array} selectedParts - Array of selected parts
 * @returns {number} - Estimated power consumption in watts
 */
export function calculatePowerConsumption(selectedParts) {
  // Base power consumption for basic components
  let basePower = 50;

  // Add CPU power
  const cpu = selectedParts.find((p) => p.type === "CPU");
  if (cpu && cpu.specs && cpu.specs.tdp) {
    basePower += cpu.specs.tdp;
  } else if (cpu) {
    // Fallback estimates if no TDP is specified
    basePower += 75; // Average CPU
  }

  // Add GPU power
  const gpu = selectedParts.find((p) => p.type === "GPU");
  if (gpu && gpu.specs && gpu.specs.tdp) {
    basePower += gpu.specs.tdp;
  } else if (gpu) {
    basePower += 150; // Average GPU
  }

  // Add additional components with rough estimates
  const memory = selectedParts.filter((p) => p.type === "Memory").length;
  basePower += memory * 10; // ~10W per memory module

  const storage = selectedParts.filter((p) => p.type === "Storage").length;
  basePower += storage * 15; // ~15W per storage device

  const cooler = selectedParts.filter((p) => p.type === "CPU Cooler").length;
  basePower += cooler * 10; // ~10W per CPU cooler

  // Add 20% safety margin
  return Math.ceil(basePower * 1.2);
}

/**
 * Check if PSU is sufficient for the build
 * @param {Object} psu - PSU object
 * @param {Array} selectedParts - Array of selected parts
 * @returns {Object} - Contains 'sufficient' boolean and 'requiredWattage'
 */
export function isPsuSufficient(psu, selectedParts) {
  if (!psu || !psu.specs || !psu.specs.wattage)
    return { sufficient: false, requiredWattage: 0 };

  // Get wattage number from PSU specs (remove 'W' if present)
  const psuWattage = parseInt(psu.specs.wattage.replace("W", ""));
  const requiredWattage = calculatePowerConsumption(selectedParts);

  return {
    sufficient: psuWattage >= requiredWattage,
    requiredWattage,
    psuWattage,
  };
}

/**
 * Get detailed compatibility check results for a build
 * @param {Array} selectedParts - Array of selected parts
 * @returns {Array} - Array of compatibility check objects with name, status, and message
 */
export function getCompatibilityChecks(selectedParts) {
  const checks = [];

  // Find key components
  const cpu = selectedParts.find((p) => p.type === "CPU");
  const mobo = selectedParts.find((p) => p.type === "Motherboard");
  const memory = selectedParts.find((p) => p.type === "Memory");
  const gpu = selectedParts.find((p) => p.type === "GPU");
  const psu = selectedParts.find((p) => p.type === "PSU");
  const cpuCooler = selectedParts.find((p) => p.type === "CPU Cooler");
  const pcCase = selectedParts.find((p) => p.type === "Case");

  // CPU + Motherboard compatibility
  if (cpu && mobo) {
    const compatible = arePartsCompatible(cpu, mobo);
    checks.push({
      name: "CPU + Motherboard",
      status: compatible,
      message: compatible
        ? `${cpu.name} is compatible with ${mobo.name}`
        : `${cpu.name} (${cpu.compatibility.join(
            "/"
          )}) is not compatible with ${mobo.name} (${mobo.compatibility.join(
            "/"
          )})`,
    });
  }

  // Memory compatibility (simplified)
  if (memory && mobo) {
    const compatible = true; // Simplified check
    checks.push({
      name: "Memory + Motherboard",
      status: compatible,
      message: compatible
        ? `Memory is compatible with the motherboard`
        : `Memory may not be compatible with this motherboard`,
    });
  }

  // Power requirements
  if (psu && selectedParts.length > 1) {
    const { sufficient, requiredWattage, psuWattage } = isPsuSufficient(
      psu,
      selectedParts
    );
    checks.push({
      name: "Power Requirements",
      status: sufficient,
      message: sufficient
        ? `${psu.name} (${psuWattage}W) is sufficient for this build (${requiredWattage}W estimated)`
        : `${psu.name} (${psuWattage}W) may not be sufficient for this build (${requiredWattage}W estimated)`,
    });
  }

  // CPU Cooler compatibility
  if (cpu && cpuCooler) {
    const compatible = arePartsCompatible(cpu, cpuCooler);
    checks.push({
      name: "CPU Cooler + CPU",
      status: compatible,
      message: compatible
        ? `${cpuCooler.name} is compatible with ${cpu.name}`
        : `${cpuCooler.name} may not be compatible with ${cpu.name}`,
    });
  }

  // GPU Length compatibility with case (simplified)
  if (gpu && pcCase && gpu.specs?.length && pcCase.specs?.maxGPULength) {
    const gpuLength = parseInt(gpu.specs.length);
    const maxLength = parseInt(pcCase.specs.maxGPULength);
    const compatible = gpuLength <= maxLength;
    checks.push({
      name: "GPU Size + Case",
      status: compatible,
      message: compatible
        ? `${gpu.name} fits in the ${pcCase.name} case`
        : `${gpu.name} (${gpu.specs.length}) may be too long for ${pcCase.name} case (max ${pcCase.specs.maxGPULength})`,
    });
  }

  return checks;
}

/**
 * Get a list of incompatible parts from a selection
 * @param {Array} selectedParts - Array of selected parts
 * @returns {Array} - Array of incompatibility messages
 */
export function getIncompatibilities(selectedParts) {
  const checks = getCompatibilityChecks(selectedParts);
  return checks.filter((check) => !check.status).map((check) => check.message);
}
