"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";
import { protectedActionClient } from "@/lib/next-safe-action";

import { addProductToCartSchema } from "./schema";

export const addProductToCart = protectedActionClient
  .schema(addProductToCartSchema)
  .action(async ({ parsedInput: data, ctx }) => {
    const productVariant = await db.query.productVariantTable.findFirst({
      where: (productVariant, { eq }) =>
        eq(productVariant.id, data.productVariantId),
    });
    if (!productVariant) {
      throw new Error("Product variant not found");
    }
    const cart = await db.query.cartTable.findFirst({
      where: (cart, { eq }) => eq(cart.userId, ctx.user.id),
    });
    let cartId = cart?.id;
    if (!cartId) {
      const [newCart] = await db
        .insert(cartTable)
        .values({
          userId: ctx.user.id,
        })
        .returning();
      cartId = newCart.id;
    }
    const cartItem = await db.query.cartItemTable.findFirst({
      where: (cartItem, { eq }) =>
        eq(cartItem.cartId, cartId) &&
        eq(cartItem.productVariantId, data.productVariantId),
    });
    if (cartItem) {
      await db
        .update(cartItemTable)
        .set({
          quantity: cartItem.quantity + data.quantity,
        })
        .where(eq(cartItemTable.id, cartItem.id));
      return;
    }
    await db.insert(cartItemTable).values({
      cartId,
      productVariantId: data.productVariantId,
      quantity: data.quantity,
    });
  });
