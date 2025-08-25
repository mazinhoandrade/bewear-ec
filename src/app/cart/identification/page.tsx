import { redirect } from "next/navigation";

import { getCart } from "@/actions/get-cart";
import { getShippingAddresses } from "@/data/cart/get";

import CartSummary from "../components/cart-summary";
import Status from "../components/status";
import Addresses from "./components/addresses";

const IdentificationPage = async () => {
  const cart = await getCart();
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }
  const shippingAddresses = await getShippingAddresses();

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0
  );
  return (
    <div>
      <Status status="identification" />
      <div className="space-y-4 flex flex-col px-5 lg:flex-row lg:gap-4">
        <div className="lg:w-full">
          <Addresses
            shippingAddresses={shippingAddresses}
            defaultShippingAddressId={cart.shippingAddressId || null}
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
    </div>
  );
};

export default IdentificationPage;
