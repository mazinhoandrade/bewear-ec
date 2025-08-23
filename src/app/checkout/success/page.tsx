"use client";

import Header from "@/components/common/header";

import MessageCheckout from "../components/message-checkout";
const CheckoutSuccessPage = () => {
  return (
    <>
      <Header />
      <MessageCheckout checkout="success" />
    </>
  );
};

export default CheckoutSuccessPage;
