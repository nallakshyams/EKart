import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyCart from "./components/screens/MyCart";
import Home from "./components/screens/Home";
import ProductInfo from "./components/screens/ProductInfo";
import Login from "./components/screens/Login";
import { ProductProvider } from "./components/data/products";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ProductProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="MyCart" component={MyCart}></Stack.Screen>
          <Stack.Screen
            name="ProductInfo"
            component={ProductInfo}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
}
