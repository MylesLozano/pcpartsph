import { sql } from "../config/db.js";

export const getParts = async (req, res) => {
  try {
    const parts = await sql`
      SELECT * FROM parts
      ORDER BY created_at DESC
    `;

    console.log("fetched parts", parts);
    res.status(200).json({ success: true, data: parts });
  } catch (error) {
    console.log("Error in getParts function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createPart = async (req, res) => {
  const { name, price, image, type, retailer, specifications } = req.body;

  if (!name || !price || !type) {
    return res
      .status(400)
      .json({ success: false, message: "Name, price and type are required" });
  }

  try {
    const newPart = await sql`
      INSERT INTO parts (name, price, image, type, retailer, specifications)
      VALUES (${name}, ${price}, ${image}, ${type}, ${retailer}, ${
      specifications || null
    })
      RETURNING *
    `;

    res.status(201).json({ success: true, data: newPart[0] });
  } catch (error) {
    console.log("Error in createPart function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getPart = async (req, res) => {
  const { id } = req.params;

  try {
    const part = await sql`
     SELECT * FROM parts WHERE id=${id}
    `;

    if (part.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Part not found",
      });
    }

    res.status(200).json({ success: true, data: part[0] });
  } catch (error) {
    console.log("Error in getPart function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getPartsByType = async (req, res) => {
  const { type } = req.params;

  try {
    const parts = await sql`
      SELECT * FROM parts WHERE type=${type}
      ORDER BY price ASC
    `;

    res.status(200).json({ success: true, data: parts });
  } catch (error) {
    console.log("Error in getPartsByType function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const comparePartPrices = async (req, res) => {
  const { partName } = req.params;

  try {
    const prices = await sql`
      SELECT name, price, retailer FROM parts 
      WHERE name ILIKE ${`%${partName}%`}
      ORDER BY price ASC
    `;

    res.status(200).json({ success: true, data: prices });
  } catch (error) {
    console.log("Error in comparePartPrices function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updatePart = async (req, res) => {
  const { id } = req.params;
  const { name, price, image, type, retailer, specifications } = req.body;

  try {
    const updatePart = await sql`
      UPDATE parts
      SET name=${name}, price=${price}, image=${image}, 
          type=${type}, retailer=${retailer}, specifications=${
      specifications || null
    }
      WHERE id=${id}
      RETURNING *
    `;

    if (updatePart.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Part not found",
      });
    }

    res.status(200).json({ success: true, data: updatePart[0] });
  } catch (error) {
    console.log("Error in updatePart function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deletePart = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPart = await sql`
      DELETE FROM parts WHERE id=${id} RETURNING *
    `;

    if (deletedPart.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Part not found",
      });
    }

    res.status(200).json({ success: true, data: deletedPart[0] });
  } catch (error) {
    console.log("Error in deletePart function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
