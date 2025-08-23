"use client";
import { useCategorys } from "@/hooks/queries/use-category";
import { authClient } from "@/lib/auth-client";

import Logo from "./logo";
import MenuCategory from "./menu-category";
import MenuMobile from "./menu-mobile";
import Perfil from "./perfil";

const Header = () => {
  const { data: session } = authClient.useSession();
  const { data: categories } = useCategorys();
  return (
    <>
      <header className="flex items-center justify-between p-5">
        <Perfil user={session?.user} />
        <Logo />
        <MenuMobile user={session?.user} />
      </header>
      <div className="hidden lg:flex flex-col w-full items-center  ">
        <MenuCategory categories={categories || []} />
      </div>
    </>
  );
};

export default Header;
