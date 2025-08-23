"use server";
import { headers } from "next/headers";

import { getCategories } from "@/data/categories/get";
import { auth } from "@/lib/auth";

import Logo from "./logo";
import MenuCategory from "./menu-category";
import MenuMobile from "./menu-mobile";
import Perfil from "./perfil";

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const categories = await getCategories();

  return (
    <>
      <header className="flex items-center justify-between p-5">
        <Perfil user={session?.user} />
        <Logo />
        <MenuMobile user={session?.user} />
      </header>
      <div className="hidden lg:flex flex-col w-full items-center  ">
        <MenuCategory categories={categories} />
      </div>
    </>
  );
};

export default Header;
