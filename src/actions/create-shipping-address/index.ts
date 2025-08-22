"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { protectedActionClient } from "@/lib/next-safe-action";

import { createShippingAddressSchema } from "./schema";

export const createShippingAddress = protectedActionClient
  .schema(createShippingAddressSchema)
  .action(async ({ parsedInput: data, ctx }) => {
    const [shippingAddress] = await db
      .insert(shippingAddressTable)
      .values({
        userId: ctx.user.id,
        recipientName: data.fullName,
        street: data.address,
        number: data.number,
        complement: data.complement || null,
        city: data.city,
        state: data.state,
        neighborhood: data.neighborhood,
        zipCode: data.zipCode,
        country: "Brasil",
        phone: data.phone,
        email: data.email,
        cpfOrCnpj: data.cpf,
      })
      .returning();

    revalidatePath("/cart/identification");

    return shippingAddress;
  });
