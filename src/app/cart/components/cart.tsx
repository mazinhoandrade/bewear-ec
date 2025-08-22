"use client";

import CartItem from "@/components/common/cart-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/hooks/queries/use-cart";

const Cart = () => {
  const { data: cart } = useCart();

  return (
    <>
      <div className="flex h-full flex-col px-5 pb-5">
        <div className="flex h-full max-h-full flex-col overflow-hidden">
          <ScrollArea className="h-full">
            <div className="flex h-full flex-col gap-8">
              {cart?.items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  productName={item.productVariant.product.name}
                  productVariantId={item.productVariant.id}
                  productVariantName={item.productVariant.name}
                  productVariantImageUrl={item.productVariant.imageUrl}
                  productVariantPriceInCents={item.productVariant.priceInCents}
                  quantity={item.quantity}
                />
              ))}
              {cart?.items.length === 0 && (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    Seu carrinho está vazio :(
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default Cart;
