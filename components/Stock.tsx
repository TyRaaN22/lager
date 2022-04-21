import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";
import productModel from "../models/products.ts";
import { Typography, Base } from '../styles';

function StockList({ products, setProducts }) {
	useEffect(async () => {
		setProducts(await productModel.getProducts());
	}, []);

	const list = products.map((product, index) => {
		return <Text
			key={index}
			style={{ ...Typography.normal }}
		>
			{product.name} - {product.stock}
		</Text>
	});
	return (
		<View>
			{list}
		</View>
	);
}

export default function Stock({ products, setProducts }) {
	return (
		<View>
			<Text style={Typography.header3}>Lagerförteckning</Text>
			<StockList products={products} setProducts={setProducts} />
		</View>
	);
}
