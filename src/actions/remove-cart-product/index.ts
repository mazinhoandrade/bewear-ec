"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { protectedActionClient } from "@/lib/next-safe-action";

import { removeProductFromCartSchema } from "./schema";

export const removeProductFromCart = protectedActionClient
  .schema(removeProductFromCartSchema)
  .action(async ({ parsedInput: data, ctx }) => {
    const cartItem = await db.query.cartItemTable.findFirst({
      where: (cartItem, { eq }) => eq(cartItem.id, data.cartItemId),
      with: {
        cart: true,
      },
    });

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    const cartDoesNotBelongToUser = cartItem.cart.userId !== ctx.user.id;
    if (cartDoesNotBelongToUser) {
      throw new Error("Unauthorized");
    }

    await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
  });
