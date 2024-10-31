// pages/api/items/save.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { description, account, price, discount, vat } = req.body;

    try {
      const item = await prisma.item.create({
        data: {
          description,
          account,
          price,
          discount,
          vat,
        },
      });

      res.status(201).json(item);
    } catch (error) {
      console.error("Error saving item:", error);
      res.status(500).json({ error: "Failed to save item." });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
