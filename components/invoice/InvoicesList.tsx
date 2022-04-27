import { DataTable } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { Base, Typography } from '../../styles';
import invoiceModel from '../../models/invoices.ts';
import authModel from '../../models/auths.ts';
import Invoice from '../../interfaces/invoice.ts';

export default function InvoiceList({ route, navigation, setIsLoggedIn }) {

    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState<Invoice>([]);

    if (reload) {
        reloadInvoices();
    }

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    async function logout() {
        await authModel.logout();
        setIsLoggedIn(false)
        navigation.navigate("Logga in");
    }

    const table = allInvoices.map((invoice, index) => {
        return (
            <DataTable.Row>
                <DataTable.Cell style={{flex: 4}}>{invoice.name}</DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}>{invoice.total_price}</DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}>{invoice.due_date}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Fakturor</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{flex: 4}}>Beställare</DataTable.Title>
                    <DataTable.Title style={{flex: 3}}>Kostnad</DataTable.Title>
                    <DataTable.Title style={{flex: 3}}>Slutdatum</DataTable.Title>
                </DataTable.Header>
                {allInvoices.length ? table : <Text>Det finns inga fakturor</Text>}
            </DataTable>
            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
            <Button
                title="Logga ut"
                onPress={() => {

                    logout()
                }}
            />
        </ScrollView>
    );
}