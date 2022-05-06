import { render } from '@testing-library/react-native';
import DeliveryForm from '../components/DeliveryForm';

const setProducts = () => false;
const navigation = () => false;

test('Should contain a title (Ny leverans) and a date picker, product picker, comment field, amount filed and a button', async () => {
    const { getByText, getByTestId, getByA11yLabel } = render(<DeliveryForm
        navigation = {navigation}
        setProducts = {setProducts}
    />);

    const title = await getByText('Ny leverans');
    const productLabel = await getByText('Produkt');
    const dateLabel = await getByText('Datum');
    const commentLabel = await getByText('Kommentar (Valfri)');
    const amountLabel = await getByText('Antal');

    const addDeliveryButton = await getByA11yLabel('Lägg till en leverans genom att klicka');
    
    const productPicker = await getByTestId("product-picker");

    const datePicker = await getByTestId("date-picker");
    
    expect(title).toBeDefined();
    expect(productLabel).toBeDefined();
    expect(dateLabel).toBeDefined();
    expect(commentLabel).toBeDefined();
    expect(amountLabel).toBeDefined();
    expect(productPicker).toBeDefined();
    expect(datePicker).toBeDefined();
    expect(addDeliveryButton).toBeDefined();
});