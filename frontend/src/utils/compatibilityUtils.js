// Check if CPU and motherboard socket types are compatible
export function checkCpuMotherboardCompatibility(cpu, motherboard) {
  if (!cpu || !motherboard) return { compatible: true };

  // Extract specifications
  const cpuSpecs = cpu.specifications || {};
  const moboSpecs = motherboard.specifications || {};

  // Check socket compatibility
  if (cpuSpecs.socket && moboSpecs.socket) {
    const cpuSocket = cpuSpecs.socket.toLowerCase();
    const moboSocket = moboSpecs.socket.toLowerCase();

    if (cpuSocket !== moboSocket) {
      return {
        compatible: false,
        message: `CPU socket ${cpuSpecs.socket} is not compatible with motherboard socket ${moboSpecs.socket}`,
      };
    }
  }

  return { compatible: true };
}

// Check if RAM is compatible with motherboard
export function checkRamMotherboardCompatibility(ram, motherboard) {
  if (!ram || !motherboard) return { compatible: true };

  const ramSpecs = ram.specifications || {};
  const moboSpecs = motherboard.specifications || {};

  // Check RAM type compatibility (DDR4 vs DDR5)
  if (ramSpecs.type && moboSpecs.memoryType) {
    if (ramSpecs.type !== moboSpecs.memoryType) {
      return {
        compatible: false,
        message: `RAM type ${ramSpecs.type} is not compatible with motherboard memory type ${moboSpecs.memoryType}`,
      };
    }
  }

  return { compatible: true };
}

// Check if power supply has enough wattage for components
export function checkPsuCompatibility(psu, gpu, cpu) {
  if (!psu) return { compatible: true };

  const psuSpecs = psu.specifications || {};
  const psuWattage = psuSpecs.wattage ? parseInt(psuSpecs.wattage) : 0;

  let requiredWattage = 150; // Base system

  if (cpu && cpu.specifications && cpu.specifications.tdp) {
    requiredWattage += parseInt(cpu.specifications.tdp);
  }

  if (gpu && gpu.specifications && gpu.specifications.tdp) {
    requiredWattage += parseInt(gpu.specifications.tdp);
  }

  // Add 20% overhead for safety
  requiredWattage = Math.ceil(requiredWattage * 1.2);

  if (psuWattage < requiredWattage) {
    return {
      compatible: false,
      message: `PSU wattage (${psuWattage}W) is insufficient. System requires at least ${requiredWattage}W`,
    };
  }

  return { compatible: true };
}

// Get a list of all compatibility issues in a build
export function getIncompatibilities(selectedParts) {
  const issues = [];

  const cpu = selectedParts.find((p) => p.type === "CPU");
  const motherboard = selectedParts.find((p) => p.type === "Motherboard");
  const ram = selectedParts.find((p) => p.type === "RAM");
  const gpu = selectedParts.find((p) => p.type === "GPU");
  const psu = selectedParts.find((p) => p.type === "PSU");

  // CPU and Motherboard compatibility
  const cpuMoboCheck = checkCpuMotherboardCompatibility(cpu, motherboard);
  if (!cpuMoboCheck.compatible) {
    issues.push(cpuMoboCheck.message);
  }

  // RAM and Motherboard compatibility
  const ramMoboCheck = checkRamMotherboardCompatibility(ram, motherboard);
  if (!ramMoboCheck.compatible) {
    issues.push(ramMoboCheck.message);
  }

  // PSU wattage check
  const psuCheck = checkPsuCompatibility(psu, gpu, cpu);
  if (!psuCheck.compatible) {
    issues.push(psuCheck.message);
  }

  return issues;
}
