import { render } from '@testing-library/react-native';
import DispatchesList from '../components/dispatch/DispatchesList';

const orders = [
    {name: "Larsa", status: "Packad"},
    {name: "Hans", status: "Ny"},
    {name: "Jögga", status: "Packad"},
    {name: "Kenta", status: "Packad"}
]

const setOrders = () => false;
const navigation = () => false;
const route = () => false;

test('Should contain a title (Ordrar redo att skickas) and list of names on orders with status: Packad', async () => {
    const { getByText } = render(<DispatchesList
        route={route}
        navigation = {navigation}
        orders = {orders}
        setOrders = {setOrders}
    />);

    const title = await getByText('Ordrar redo att skickas');

    const firstOrder = await getByText('Larsa', { exact: false });
    const secondOrder = await getByText('Jögga', { exact: false });
    const thirdOrder = await getByText('Kenta', { exact: false });
    let fourthOrder = "";
    try {
        fourthOrder = await getByText('Hans', { exact: false });
    } catch (e) {
        fourthOrder = undefined;
    }
    
    expect(title).toBeDefined();
    expect(firstOrder).toBeDefined();
    expect(secondOrder).toBeDefined();
    expect(thirdOrder).toBeDefined();
    expect(fourthOrder).toBeUndefined();
});