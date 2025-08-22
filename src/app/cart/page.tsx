import { desc } from "drizzle-orm";
import React from "react";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

import Cart from "./components/cart";

const CartPage = async () => {
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
      <Cart />
      <ProductList
        title="Produtos relacionados"
        products={newlyCreatedProducts}
      />
      <Footer />
    </>
  );
};

export default CartPage;
