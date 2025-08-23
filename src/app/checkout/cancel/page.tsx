"use client";
import Header from "@/components/common/header";

import MessageCheckout from "../components/message-checkout";

const checkoutCancelPage = () => {
  return (
    <>
      <Header />
      <MessageCheckout checkout="cancel" />
    </>
  );
};

export default checkoutCancelPage;
