import { eq } from "drizzle-orm";
import { Check, CircleCheck } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import Addresses from "./components/addresses";

const IdentificationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/");
  }
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }
  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  });
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0
  );
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center my-5 text-shadow-zinc-500 font-semibold gap-2">
        <p className="flex items-center gap-2 ">
          <div className="bg-green-500 rounded-full w-8 h-8 font-bold flex items-center justify-center">
            <Check size={16} color="white" />
          </div>
          Carrinho
          <div className="text-muted-foreground ">
            <hr className="border-t-2 border-green-500 my-5  w-32" />
          </div>
        </p>
        <p className="flex items-center gap-2 ">
          <div className="border-2 border-green-500 rounded-full w-8 h-8 font-bold flex items-center justify-center text-green-500">
            2
          </div>
          Identificação
          <div className="text-muted-foreground ">
            <hr className="border-t-2 border-gray-300 my-5  w-32" />
          </div>
        </p>
        <p className="flex items-center gap-2 ">
          <div className="border-2 border-gray-300 rounded-full w-8 h-8 font-bold flex items-center justify-center">
            3
          </div>
          Pagamento
        </p>
      </div>
      <div className="space-y-4 flex flex-col px-5 lg:flex-row lg:gap-4">
        <div className="lg:w-full">
          <Addresses
            shippingAddresses={shippingAddresses}
            defaultShippingAddressId={cart.shippingAddress?.id || null}
          />
        </div>
        <div className="lg:w-2/3">
          <CartSummary
            subtotalInCents={cartTotalInCents}
            totalInCents={cartTotalInCents}
            products={cart.items.map((item) => ({
              id: item.productVariant.id,
              name: item.productVariant.product.name,
              variantName: item.productVariant.name,
              quantity: item.quantity,
              priceInCents: item.productVariant.priceInCents,
              imageUrl: item.productVariant.imageUrl,
            }))}
          />
        </div>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default IdentificationPage;
