// src/utils/partsData.js
// This is a local copy of component data for app functionality
// For complete data, see /public/mockData/components.json

export const parts = [
  {
    id: 1,
    name: "AMD Ryzen 5 5600",
    type: "CPU",
    price: 8500,
    retailers: [
      { name: "PC Express", price: 8500, link: "#" },
      { name: "DynaQuest", price: 8700, link: "#" },
    ],
    compatibility: ["AM4"],
    specs: {
      cores: 6,
      threads: 12,
      baseFrequency: "3.5 GHz",
      boostFrequency: "4.4 GHz",
      tdp: 65,
      cache: "35MB",
    },
    image: "/mockData/images/ryzen-5-5600.webp",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Intel Core i5-12400F",
    type: "CPU",
    price: 9500,
    retailers: [
      { name: "PC Hub", price: 9500, link: "#" },
      { name: "DynaQuest", price: 9800, link: "#" },
    ],
    compatibility: ["LGA1700"],
    specs: {
      cores: 6,
      threads: 12,
      baseFrequency: "2.5 GHz",
      boostFrequency: "4.4 GHz",
      tdp: 65,
      cache: "18MB",
    },
    image: "/mockData/images/intel-i5-12400f.webp",
    rating: 4.6,
  },
  {
    id: 3,
    name: "ASUS B550M-A",
    type: "Motherboard",
    price: 6500,
    retailers: [
      { name: "PC Express", price: 6500, link: "#" },
      { name: "PC Hub", price: 6650, link: "#" },
    ],
    compatibility: ["AM4"],
    specs: {
      chipset: "AMD B550",
      formFactor: "Micro-ATX",
      memorySlots: 4,
      maxMemory: "128GB",
    },
    image: "/mockData/images/asus-b550m.webp",
    rating: 4.4,
  },
  {
    id: 4,
    name: "Gigabyte B660M DS3H",
    type: "Motherboard",
    price: 7000,
    retailers: [
      { name: "DynaQuest", price: 7000, link: "#" },
      { name: "PC Express", price: 7200, link: "#" },
    ],
    compatibility: ["LGA1700"],
    specs: {
      chipset: "Intel B660",
      formFactor: "Micro-ATX",
      memorySlots: 4,
      maxMemory: "128GB",
    },
    image: "/mockData/images/gigabyte-b660m.webp",
    rating: 4.3,
  },
  {
    id: 5,
    name: "Kingston FURY Beast 16GB (2x8GB) DDR4-3200",
    type: "Memory",
    price: 3200,
    retailers: [
      { name: "PC Express", price: 3200, link: "#" },
      { name: "DynaQuest", price: 3300, link: "#" },
    ],
    compatibility: ["DDR4"],
    specs: {
      capacity: "16GB (2x8GB)",
      type: "DDR4",
      speed: "3200MHz",
      cas: "CL16",
    },
    image: "/mockData/images/kingston-fury.webp",
    rating: 4.8,
  },
  {
    id: 9,
    name: "MSI GeForce GTX 1660 Super Ventus XS OC",
    type: "GPU",
    price: 11500,
    retailers: [
      { name: "PC Express", price: 11500, link: "#" },
      { name: "DynaQuest", price: 11700, link: "#" },
    ],
    compatibility: ["PCIe"],
    specs: {
      memorySize: "6GB GDDR6",
      coreClock: "1530 MHz",
      boostClock: "1785 MHz",
      tdp: 125,
    },
    image: "/mockData/images/msi-gtx1660.webp",
    rating: 4.6,
  },
];
