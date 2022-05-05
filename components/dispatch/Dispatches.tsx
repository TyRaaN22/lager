import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DispatchesList from './DispatchesList.tsx';
import DispatchInfo from './DispatchInfo.tsx';

const Stack = createNativeStackNavigator();

export default function Dispatches(props) {
    return (
        <Stack.Navigator initialRouteName="DispatchesList">
            <Stack.Screen name="List">
                {(screenProps) => <DispatchesList {...screenProps} orders={props.orders} setOrders={props.setOrders} />}
            </Stack.Screen>
            <Stack.Screen name="Info">
                {(screenProps) => <DispatchInfo {...screenProps} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};