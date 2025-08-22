"use server";
import "server-only";

import { db } from "@/db";
import { categoryTable } from "@/db/schema";

export const getCategories = async (): Promise<
  (typeof categoryTable.$inferSelect)[]
> => {
  const categories = await db.query.categoryTable.findMany();
  return categories;
};
