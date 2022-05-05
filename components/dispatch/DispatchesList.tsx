import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import orderModel from '../../models/orders.ts';
import Order from '../../interfaces/order.ts';
import { Typography } from '../../styles';

export default function DispatchesList({ route, navigation, orders, setOrders}) {

    useEffect(async () => {
        setOrders(await orderModel.getOrders());
    }, []);

    const listOfOrders = orders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Info', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View>
            <Text style= {Typography.header2}>Ordrar redo att skickas</Text>
            {listOfOrders}
        </View>
    );
}