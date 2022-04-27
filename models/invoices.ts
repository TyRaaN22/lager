import Invoices from "../components/invoice/Invoices";
import config from "../config/config.json";
import Invoice from '../interfaces/invoice.ts';
import storage from './storage.ts';

const invoiceModel = {
    getInvoices: async function getInvoices(): Promise<Invoice[]> {
        const tokenAndDate = await storage.readToken();
        const onlyToken = tokenAndDate.token;
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': onlyToken,
            },
        });
        const result = await response.json();
        return result.data;
    },

    addInvoice: async function addInvoice(invoice: Partial<Invoice>) {
        const tokenAndDate = await storage.readToken();
        const onlyToken = tokenAndDate.token;
        invoice.api_key = config.api_key
        try {
            await fetch(`${config.base_url}/invoices`, {
                body:JSON.stringify(invoice),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': onlyToken,

                },
                method: 'POST'
            });
        
        } catch (error) {
            console.log("Could not add invoice");
        }
    }
};



export default invoiceModel;