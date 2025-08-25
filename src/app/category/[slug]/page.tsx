import { notFound } from "next/navigation";
import React from "react";

import ProductItem from "@/components/common/product-item";
import { getCategory } from "@/data/categories/get";
import { getLikelyProducts } from "@/data/products/get";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return notFound();
  const products = await getLikelyProducts(category.id);
  return (
    <>
      <div className="px-5 space-y-6">
        <h2 className="font-semibold text-xl">{category?.name}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
