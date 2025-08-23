"use client";
import { PanelRightClose, ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
const Perfil = ({ user }: Props) => {
  return (
    <>
      <div className="hidden lg:flex">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="text-black cursor-pointer">
                Olá, {user.name.split(" ")[0]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link className="flex items-center gap-2" href="/my-orders">
                  <ShoppingBasketIcon /> Meus Pedidos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => authClient.signOut()}>
                <PanelRightClose /> Sair
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
    </>
  );
};

export default Perfil;
