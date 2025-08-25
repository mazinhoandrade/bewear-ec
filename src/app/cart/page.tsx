import React from "react";

import ProductList from "@/components/common/product-list";
import { getNewlyCreatedProducts } from "@/data/products/get";

import Cart from "./components/cart";

const CartPage = async () => {
  const newlyCreatedProducts = await getNewlyCreatedProducts(4);
  return (
    <>
      <Cart />
      <ProductList
        title="Produtos relacionados"
        products={newlyCreatedProducts}
      />
    </>
  );
};

export default CartPage;
