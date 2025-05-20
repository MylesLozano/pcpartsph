// src/utils/partsData.js
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
  },
  {
    id: 2,
    name: "Intel Core i5-12400F",
    type: "CPU",
    price: 9500,
    retailers: [
      { name: "PC Hub", price: 9500, link: "#" },
      { name: "DynaQuest", price: 9700, link: "#" },
    ],
    compatibility: ["LGA1700"],
  },
  {
    id: 3,
    name: "ASUS B550M-A",
    type: "Motherboard",
    price: 6500,
    retailers: [
      { name: "PC Express", price: 6500, link: "#" },
      { name: "PC Hub", price: 6700, link: "#" },
    ],
    compatibility: ["AM4"],
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
  },
];
