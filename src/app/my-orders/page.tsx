import { getOrders } from "@/data/orders/get";

import Orders from "./components/orders";

const MyOrdersPage = async () => {
  const orders = await getOrders();
  return (
    <>
      <div className="px-5">
        <h2 className="font-semibold text-xl my-3">Meus pedidos</h2>
        <Orders
          orders={orders.map((order) => ({
            id: order.id,
            totalPriceInCents: order.totalPriceInCents,
            status: order.status,
            createdAt: order.createdAt,
            items: order.items.map((item) => ({
              id: item.id,
              imageUrl: item.productVariant.imageUrl,
              productName: item.productVariant.product.name,
              productVariantName: item.productVariant.name,
              priceInCents: item.productVariant.priceInCents,
              quantity: item.quantity,
            })),
          }))}
        />
      </div>
    </>
  );
};

export default MyOrdersPage;
