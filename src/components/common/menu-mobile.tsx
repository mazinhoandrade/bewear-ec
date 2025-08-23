"use client";
import {
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  SearchIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";

interface Props {
  user:
    | {
        name: string;
        id: string;
        email: string;
        image?: string | undefined | null;
      }
    | null
    | undefined;
}
const MenuMobile = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="px-5">
            {user ? (
              <>
                <div className="flex justify-between space-y-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user?.image as string | undefined} />
                      <AvatarFallback>
                        {user?.name?.split(" ")?.[0]?.[0]}
                        {user?.name?.split(" ")?.[1]?.[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold">{user?.name}</h3>
                      <span className="text-muted-foreground block text-xs">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => authClient.signOut()}
                  >
                    <LogOutIcon />
                  </Button>
                </div>
                <Separator />
                <Link
                  className="flex items-center gap-2 my-2"
                  href="/my-orders"
                >
                  <ShoppingBasketIcon /> Meus Pedidos
                </Link>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
                <Button size="icon" asChild variant="outline">
                  <Link href="/authentication">
                    <LogInIcon />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <SearchIcon className="hidden lg:block" />
      <Cart />
    </div>
  );
};

export default MenuMobile;
