import React from "react";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { getNewlyCreatedProducts } from "@/data/products/get";

import Cart from "./components/cart";

const CartPage = async () => {
  const newlyCreatedProducts = await getNewlyCreatedProducts(4);
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
