import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InvoicesList from './InvoicesList.tsx';
import InvoiceForm from './InvoiceForm.tsx';

const Stack = createNativeStackNavigator();

export default function Invoices( props ) {
    return (
        <Stack.Navigator initialRouteName="InvoicesList">
            <Stack.Screen name="List">
                {(screenProps) => <InvoicesList {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Form" component={InvoiceForm} />
        </Stack.Navigator>
    );
};