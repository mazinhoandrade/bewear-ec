"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { categoryTable } from "@/db/schema";

interface Props {
  categories: (typeof categoryTable.$inferSelect)[];
}
const MenuCategory = ({ categories }: Props) => {
  return (
    <div className="hidden lg:flex flex-col w-full items-center my-5 ">
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="gap-28 font-semibold">
          {categories.map((category) => (
            <NavigationMenuItem key={category.id}>
              <NavigationMenuLink asChild>
                <Link href={`/category/${category.slug}`}>{category.name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MenuCategory;
