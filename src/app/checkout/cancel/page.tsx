"use client";
import { Ban } from "lucide-react";
import Link from "next/link";

import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const checkoutCancelPage = () => {
  return (
    <>
      <Header />
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <Ban className="mx-auto" color="red" size={200} />
          <DialogTitle className="mt-4 text-2xl">Pedido cancelado!</DialogTitle>
          <DialogDescription className="font-medium">
            poxa! Seu pedido foi cancelado.
          </DialogDescription>

          <DialogFooter>
            <Link href="/my-orders">
              <Button className="rounded-full" size="lg">
                Ver meus pedidos
              </Button>
            </Link>
            <Button
              className="rounded-full"
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/">Voltar para a loja</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default checkoutCancelPage;
