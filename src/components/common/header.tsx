"use client";
import { LogInIcon, LogOutIcon, MenuIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";

const Header = () => {
  const { data: session } = authClient.useSession();
  return (
    <>
      <header className="flex items-center justify-between p-5">
        <div className="hidden lg:flex">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="text-black cursor-pointer">
                  Olá, {session.user.name.split(" ")[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => authClient.signOut()}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center justify-between">
              <Link href="/authentication">
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
              </Link>
            </div>
          )}
        </div>
        <Link href="/">
          <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
        </Link>

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
                {session?.user ? (
                  <>
                    <div className="flex justify-between space-y-6">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={session?.user?.image as string | undefined}
                          />
                          <AvatarFallback>
                            {session?.user?.name?.split(" ")?.[0]?.[0]}
                            {session?.user?.name?.split(" ")?.[1]?.[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-semibold">
                            {session?.user?.name}
                          </h3>
                          <span className="text-muted-foreground block text-xs">
                            {session?.user?.email}
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
                    <Link href="/my-orders">Meus pedidos</Link>
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
      </header>
      <div className="hidden lg:flex flex-col w-full items-center my-5 ">
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="gap-28 font-semibold">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Camisetas</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Bermudas & Shorts</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Calças</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Jaquetas & Moletons</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Tenis</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Acessórios</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
};

export default Header;
