import { useState, useEffect, useMemo } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Platform, ScrollView, Text, TextInput, Button, View } from 'react-native';
import { Base, Typography, Forms } from '../../styles';
import config from "../../config/config.json";

import Invoice from '../../interfaces/invoice.ts';
import Order from '../../interfaces/order.ts';

import invoiceModel from "../../models/invoices.ts";
import orderModel from "../../models/orders.ts";

export default function InvoiceForm({ navigation }) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});
    const [currentOrder, setCurrentOrder] = useState<Partial<Order>>({});

    function OrderDropDown(props) {
        const [orders, setOrders] = useState<Order[]>([]);
        let ordersHash: any = {};
    
        useEffect(async () => {
            setOrders(await orderModel.getOrders());
        }, []);
    
        const itemsList = orders
            .filter(order => order.status === "Packad")
            .map((order, index) => {
            ordersHash[order.id] = order;
            return <Picker.Item key={index} label={order.name} value={order.id} />;
        });
    
        return (
            <Picker
                selectedValue={props.invoice?.order_id}
                onValueChange={(itemValue) => {
                    props.setInvoice({ 
                        ...props.invoice, 
                        order_id: itemValue,
                    });
                    props.setCurrentOrder(ordersHash[itemValue]);
                }}>
                {itemsList}
            </Picker>
        );
    }

    function DateDropDown(props) {
        const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
        const [show, setShow] = useState<Boolean>(false);
    
        const showDatePicker = () => {
            setShow(true);
        };
    
        return (
            <View>
                {Platform.OS === "android" && (
                    <Button onPress={showDatePicker} title="Visa datumväljare" />
                )}
                {(show || Platform.OS === "ios") && (
                    <DateTimePicker
                        onChange={(event, date) => {
                            setDropDownDate(date);

                            props.setInvoice({
                                ...props.invoice,
                                due_date: date.toLocaleDateString('se-SV'),
                            });
                            setShow(false);
                        }}
                        value={dropDownDate}
                    />
                )}
            </View>
        );
    }

    function calcTotalPrice() {
        let totalPrice = 0;
        currentOrder.order_items.map((item) => {
            totalPrice += item.amount * item.price;
        })
        
        return totalPrice;
    }

    async function addInvoice() {
        if (invoice.order_id) {
            const addPriceInvoice = {
                ...invoice,
                total_price: calcTotalPrice(),   
            }
            await invoiceModel.addInvoice(addPriceInvoice);

            const updatedOrder = {
                id: currentOrder.id,
                name: currentOrder.name,
                api_key: config.api_key,
                status_id: 600,
            };

            await orderModel.updateOrder(updatedOrder);

            navigation.navigate("List", { reload: true });
        }
    }

    return (
        <ScrollView style={Base.base}>
            <Text style={ Typography.header2 }>Ny faktura</Text>

            <Text style={{ ...Typography.label }}>Beställare</Text>
                <OrderDropDown
                    invoice={invoice}
                    setInvoice={setInvoice}
                    setCurrentOrder={setCurrentOrder}
                />

            <Text style={Typography.label}>slutdatum</Text>
            <DateDropDown
                invoice = {invoice}
                setInvoice={setInvoice}
            />
            <Button
                title= "Lägg till faktura"
                onPress={() => {
                    addInvoice();
                }}
            />
        </ScrollView>
    );
};