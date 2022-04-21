
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import warehouse from '../assets/warehouse.jpg';
import Stock from './Stock.tsx';
import { Base, Typography } from '../styles';

export default function Home({products, setProducts}) {
  return (
    <ScrollView style={styles.base}>
        <Text style={styles.header}>Lager-Appen</Text>
        <Image source={warehouse} style={styles.stdImage} />
        <Stock products={products} setProducts={setProducts}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  base: Base.base,
  stdImage: Base.standardImage,
  header: Typography.header1
});