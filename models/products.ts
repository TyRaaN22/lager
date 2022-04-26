import config from "../config/config.json";
import OrderItem from "../interfaces/order_item.ts";

const productModel = {
    getProducts: async function getProducts() {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    updateProduct: async function updateProduct(product) {
        try {
            product.api_key = config.api_key;

            await fetch(`${config.base_url}/products`, {
                body: JSON.stringify(product),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            });

        } catch (error) {
            console.log("Could not update product: " + product.name);
        }
    },
};

export default productModel;
