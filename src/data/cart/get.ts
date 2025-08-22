import "server-only";

import { desc } from "drizzle-orm";

import { db } from "@/db";
import { productTable } from "@/db/schema";

export const getCart = async () => {
  const newlyCreatedProducts = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
    limit: 4,
    orderBy: [desc(productTable.createdAt)],
  });
  return newlyCreatedProducts;
};
