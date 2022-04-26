interface OrderItem {
    id: number,
    article_number: string,
    name: string,
    description: string,
    specifiers: {length: string, width: string},
    stock: number,
    location: string,
    price: number,
}