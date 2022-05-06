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
            const response = await fetch(`${config.base_url}/deliveries`, {
                body:JSON.stringify(delivery),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            });

            const result = await response.json();

            if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
                return {
                    title: result.errors.title,
                    message: result.errors.detail,
                    type: "danger",
                };
            }
    
            return {
                title: "Fakturering",
                message: "Ny faktura skapad!",
                type: "success",
            } 
        
        } catch (error) {
            console.log("Could not add delivery");
        }
    }
};



export default deliveryModel;