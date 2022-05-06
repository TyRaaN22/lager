import { render } from '@testing-library/react-native';
import DeliveriesList from '../components/DeliveriesList';

const navigation = () => false;
const route = () => false;

test('As no deliveries are read the component should contain a title, a message and a button', async () => {
    const { getByText, getByA11yLabel } = render(<DeliveriesList
        route={route}
        navigation = {navigation}
    />);

    const title = await getByText('Inleveranser');

    const message = await getByText("Det finns inga deliveries");
    
    const addDeliveryButton = await getByA11yLabel('Lägg till en inleverans genom att klicka');
    
    expect(title).toBeDefined();
    expect(message).toBeDefined();
    expect(addDeliveryButton).toBeDefined();
});