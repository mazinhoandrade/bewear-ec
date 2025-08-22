import "server-only";

import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";

// DTO (Data Transfer Object)
// interface ProductDto {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   createdAt: Date;
// }

export const getProductsWithVariants = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
    limit: 8,
  });
  return products;
};

export const getNewlyCreatedProducts = async (limit = 8) => {
  const products = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
    limit,
  });
  return products;
};

export const getProductVariant = async (slug: string) => {
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  return productVariant;
};

export const getLikelyProducts = async (categoryId: string) => {
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, `${categoryId}`),
    with: {
      variants: true,
    },
  });
  return likelyProducts;
};
