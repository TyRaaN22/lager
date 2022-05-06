import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import { useState, useEffect } from 'react';
import Home from "./components/Home.tsx";
import Pick from "./components/Pick.tsx";
import Deliveries from "./components/Deliveries.tsx"
import Invoices from "./components/invoice/Invoices.tsx"
import Dispatches from "./components/dispatch/Dispatches.tsx"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Auth from "./components/auth/Auth.tsx";
import authModel from "./models/auths.ts";

const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Leveranser": "cube",
  "Logga in": "person",
  "Faktura": "file-tray-full-outline",
  "Utleveranser": "earth",
};

const Tab = createBottomTabNavigator();

export default function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(async () => {
    setIsLoggedIn(await authModel.loggedIn());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Lager">
            {() => <Home products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Plock">
            {() => <Pick products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} />}
          </Tab.Screen>
          <Tab.Screen name="Leveranser">
            {() => <Deliveries products={products} setProducts={setProducts} />}
          </Tab.Screen>
          {isLoggedIn ?
            <Tab.Screen name="Faktura">
              {() => <Invoices setIsLoggedIn={setIsLoggedIn}/>}
            </Tab.Screen> :
            <Tab.Screen name ="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
          <Tab.Screen name="Utleveranser">
            {() => <Dispatches orders={orders} setOrders={setOrders} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top"/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
