import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { Base, Typography } from '../styles';
import deliveryModel from '../models/deliveries.ts';

export default function DeliveriesList({ route, navigation }) {

    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState([]);
    const hasDeliveries = false;

    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        setAllDeliveries(await deliveryModel.getDeliveries());
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    const listOfDeliveries = allDeliveries
        .map((delivery, index) => {
            return <View style={Base.sectionContainer}>
                <Text>{delivery.amount}st {delivery.product_name}</Text>
                <Text>Levererad: {delivery.delivery_date}</Text>
                <Text>Kommentar: {delivery.comment}</Text>
            </View>
        });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
            {listOfDeliveries.length ? listOfDeliveries : <Text>Det finns inga deliveries</Text>}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </ScrollView>
    );
}