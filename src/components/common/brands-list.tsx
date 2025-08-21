import Image from "next/image";
import React from "react";

import { Button } from "../ui/button";

interface ProductListProps {
  title: string;
}

const brands = [
  {
    id: 1,
    name: "Nike",
    imageUrl: "/partners/Nike.svg",
  },
  {
    id: 2,
    name: "Adidas",
    imageUrl: "/partners/Adidas.svg",
  },
  {
    id: 3,
    name: "Puma",
    imageUrl: "/partners/Puma.svg",
  },
  {
    id: 4,
    name: "New Balance",
    imageUrl: "/partners/New Balance.svg",
  },
  {
    id: 5,
    name: "Polo",
    imageUrl: "/partners/Polo.svg",
  },
  {
    id: 6,
    name: "Converse",
    imageUrl: "/partners/Converse.svg",
  },
  {
    id: 7,
    name: "Zara",
    imageUrl: "/partners/Zara.svg",
  },
];
const BrandsList = ({ title }: ProductListProps) => {
  return (
    <div className="space-y-6">
      <h3 className="px-5 lg:text-2xl font-semibold">{title}</h3>
      <div className="flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <div key={brand.id} className="flex flex-col items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="pointer-events-none flex h-20 w-20 lg:h-45 lg:w-45 items-center justify-center rounded-3xl"
            >
              <Image
                src={brand.imageUrl}
                alt={brand.name}
                width={35}
                height={35}
              />
            </Button>
            <p className="text-[12px] lg:text-[16px] font-semibold">
              {brand.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsList;
