"use client";

import { Clock } from "lucide-react";
import Link from "next/link";

import CartItem from "@/components/common/cart-item";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

const Cart = () => {
  const { data: cart } = useCart();
  return (
    <>
      <div className="px-5 flex gap-2 w-full flex-col lg:flex-row">
        <div className="lg:w-full">
          {/* card -> */}
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-xl">Meu carrinho</h2>
            </CardHeader>
            <CardContent>
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
                          productVariantPriceInCents={
                            item.productVariant.priceInCents
                          }
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
        {/* card summary -> */}
        <div className="lg:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <p className="text-sm">Subtotal</p>
                <p className="text-muted-foreground text-sm font-medium">
                  {formatCentsToBRL(cart?.totalPriceInCents as number)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Frete</p>
                <p className="text-muted-foreground text-sm font-medium">
                  GRÁTIS
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Total</p>
                <p className="text-muted-foreground text-sm font-medium">
                  {formatCentsToBRL(cart?.totalPriceInCents as number)}
                </p>
              </div>

              <div className="py-3">
                <Separator />
                <Link href="/cart/identification">
                  <Button className="w-full my-3">Continuar</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Cart;
