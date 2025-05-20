// src/utils/compatibilityUtils.js
// Utility function to check compatibility between two parts (e.g., CPU and Motherboard)
export function arePartsCompatible(partA, partB) {
  if (!partA || !partB) return false;
  if (!partA.compatibility || !partB.compatibility) return false;
  return partA.compatibility.some((c) => partB.compatibility.includes(c));
}

// Example: get a list of incompatible parts from a selection
export function getIncompatibilities(selectedParts) {
  const cpu = selectedParts.find((p) => p.type === "CPU");
  const mobo = selectedParts.find((p) => p.type === "Motherboard");
  if (cpu && mobo && !arePartsCompatible(cpu, mobo)) {
    return [`${cpu.name} is not compatible with ${mobo.name}`];
  }
  return [];
}
