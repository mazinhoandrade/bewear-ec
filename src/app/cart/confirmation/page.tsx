import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCart } from "@/data/cart/get";

import CartSummary from "../components/cart-summary";
import Status from "../components/status";
import { formatAddress } from "../helpers/address";
import FinishOrderButton from "./components/finish-order-button";

const ConfirmationPage = async () => {
  const cart = await getCart();
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0
  );
  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }
  return (
    <div>
      <Status status="confirmation" />
      <div className="space-y-4 px-5 flex flex-col lg:flex-row lg:gap-4">
        <div className="lg:w-full">
          <Card>
            <CardHeader>
              <CardTitle>Identificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card>
                <CardContent>
                  <p className="text-sm">
                    {formatAddress(cart.shippingAddress)}
                  </p>
                </CardContent>
              </Card>
              <FinishOrderButton />
            </CardContent>
          </Card>
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

export default ConfirmationPage;
