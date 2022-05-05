import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import orderModel from "../models/orders.ts";
import productModel from "../models/products.ts";

export default function PickList({ route, navigation, setProducts, setOrders }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    useEffect(async () => {
        setProductsList(await productModel.getProducts());
    }, []);

    async function pick() {
        if (orderItemPickable) {
            await orderModel.pickOrder(order);
            setProducts(await productModel.getProducts());
            setOrders(await orderModel.getOrders());
            navigation.navigate("List", {reload: true});
        }
    }

    let orderItemPickable = true;
    let orderPickableString = "Plocka order"

    const orderItemsList = order.order_items.map((item, index) => {
        if (item.stock < item.amount) {
            orderItemPickable = false;
        }
        return <Text
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    if (!orderItemPickable) {
        orderPickableString = "Slut i lager";
    }

    return (
        <View>
            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>

            <Text>Produkter:</Text>

            {orderItemsList}

            <Button title={orderPickableString} onPress={pick} />
        </View>
    )
};