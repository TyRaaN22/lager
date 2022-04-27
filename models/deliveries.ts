import config from "../config/config.json";
import { Delivery } from '../interfaces/delivery.ts';

const deliveryModel = {
    getDeliveries: async function getDeliveries(): Promise<Delivery[]> {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    addDelivery: async function addDelivery(delivery: Partial<Delivery>) {
        delivery.api_key = config.api_key
        try {
            await fetch(`${config.base_url}/deliveries`, {
                body:JSON.stringify(delivery),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            });
        
        } catch (error) {
            console.log("Could not add delivery");
        }
    }
};



export default deliveryModel;