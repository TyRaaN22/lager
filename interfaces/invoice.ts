export default interface Invoice {
    invoice_id: number,
    order_id: number,
    name: string,
    zip: string,
    city: string,
    country: string,
    total_price: number,
    creation_date: string,
    due_date: string,
}