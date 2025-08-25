import Image from "next/image";
import { notFound } from "next/navigation";

import ProductList from "@/components/common/product-list";
import { getLikelyProducts, getProductVariant } from "@/data/products/get";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "../components/product-actions";
import VariantSelector from "../components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await getProductVariant(slug);
  if (!productVariant) {
    return notFound();
  }
  const likelyProducts = await getLikelyProducts(
    productVariant.product.categoryId
  );

  return (
    <>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col lg:flex-row lg:px-5">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            sizes="100vw"
            height={0}
            width={0}
            className="h-auto w-full object-cover lg:rounded-3xl lg:w-1/2"
          />
          <div className="space-y-3">
            <div className="px-5">
              <h2 className="text-lg font-semibold">
                {productVariant.product.name}
              </h2>
              <VariantSelector
                selectedVariantSlug={productVariant.slug}
                variants={productVariant.product.variants}
              />
            </div>
            <div className="px-5 flex flex-col">
              {/* DESCRIÇÃO */}
              <h3 className="text-muted-foreground text-sm">
                {productVariant.name}
              </h3>
              <h3 className="text-lg font-semibold">
                {formatCentsToBRL(productVariant.priceInCents)}
              </h3>
            </div>
            <ProductActions productVariantId={productVariant.id} />

            <div className="px-5">
              <p className="text-shadow-amber-600">
                {productVariant.product.description}
              </p>
            </div>
          </div>
        </div>
        <ProductList title="Talvez você goste" products={likelyProducts} />
      </div>
    </>
  );
};

export default ProductVariantPage;
