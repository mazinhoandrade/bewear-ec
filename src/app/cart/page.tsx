import { desc } from "drizzle-orm";
import { Clock } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import CartItem from "@/components/common/cart-item";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { auth } from "@/lib/auth";

import Cart from "./components/cart";
import CartSummary from "./components/cart-summary";

const CartPage = async () => {
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
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0
  );

  const newlyCreatedProducts = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
    limit: 4,
    orderBy: [desc(productTable.createdAt)],
  });
  return (
    <>
      <Header />
      <div className="px-5 flex gap-2 w-full flex-col lg:flex-row">
        <div className="lg:w-full">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-xl">Meu carrinho</h2>
            </CardHeader>
            <CardContent>
              <Cart />
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2 text-sm">
              <p className="text-yellow-600 gap-1 flex items-center">
                <Clock size={14} /> Apenas algumas restantes. Compre logo
              </p>
              <Link className="underline cursor-pointer" href="/">
                Continuar comprando
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:w-2/3">
          <CartSummary
            subtotalInCents={cartTotalInCents}
            totalInCents={cartTotalInCents}
          />
        </div>
      </div>
      <ProductList
        title="Produtos relacionados"
        products={newlyCreatedProducts}
      />
      <Footer />
    </>
  );
};

export default CartPage;
