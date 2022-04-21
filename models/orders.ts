import config from "../config/config.json";
import { Order } from '../interfaces/order.ts';
import { OrderItem } from "../interfaces/order_item.ts";
import productModel from "./products.ts";

const orderModel = {
    getOrders: async function getOrders(): Promise<Order[]> {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder( order: Partial<Order>) {
        await Promise.all(order.order_items.map(async (order_item:
            Partial<OrderItem>) => {
                let updatedProduct = {
                    id: order_item.product_id,
                    name: order_item.name,
                    stock: order_item.stock - order_item.amount,
                    api_key: config.api_key,
                };

                await productModel.updateProduct(updatedProduct);
            }));

        let changedOrder = {
            id: order.id,
            name: order.name,
            status_id: 200,
            api_key: config.api_key,
        };

        await orderModel.updateOrder(changedOrder);
    },
    updateOrder: async function updateOrder(order: Partial<Order>) {
        try {
            await fetch(`${config.base_url}/orders?api_key=${config.api_key}`, {
                body:JSON.stringify(order),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            });
        } catch (error) {
            console.log("Could not update order");
        }
    }
};

export default orderModel;