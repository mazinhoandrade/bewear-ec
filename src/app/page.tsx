import { desc } from "drizzle-orm";
import Image from "next/image";

import BrandsList from "@/components/common/brands-list";
import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
    orderBy: [desc(productTable.createdAt)],
  });
  const categories = await db.query.categoryTable.findMany();

  return (
    <>
      <Header />

      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner-01.png"
            alt="Leve um vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto lg:hidden"
          />
          <Image
            src="/desktop/Frame222.png"
            alt="Leve um vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto hidden lg:block"
          />
        </div>

        <BrandsList title="Marcas Parceiras" />
        <ProductList title="Mais Vendidos " products={products} />

        <div className="px-5 lg:hidden">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5 lg:hidden">
          <Image
            src="/banner-02.png"
            alt="Auténtico"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>

        <div className="px-5 hidden lg:flex flex-row w-full justify-between gap-4">
          {/* Card 1 */}
          <div className="flex w-[40%] flex-col gap-4">
            <Image
              src="/desktop/Frame222(1).png"
              alt="Auténtico"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />

            {/* Card 2 */}
            <Image
              src="/desktop/Frame223(1).png"
              alt="Auténtico"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>

          {/* Card 3 (maior) */}
          <div className="flex w-[63%] flex-col">
            <Image
              src="/desktop/Frame223.png"
              alt="Auténtico"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
        </div>

        <ProductList title="Novos Produtos" products={newlyCreatedProducts} />
        <Footer />
      </div>
    </>
  );
};

export default Home;
