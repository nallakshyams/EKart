import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLOURS } from "../data/data";
import { StatusBar } from "expo-status-bar";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useProductContext } from "../data/products";
const MyCart = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState();
  const { productList } = useProductContext();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });
  }, [navigation]);
  const getDataFromDB = async () => {
    const items = await AsyncStorage.getItem("CartItems");
    const cartItems = JSON.parse(items);
    const prods = [];
    if (cartItems) {
      for (let index = 0; index < productList.length; index++) {
        const element = productList[index];
        if (cartItems.includes(element.id)) {
          prods.push(element);
        }
      }
    }
    setProducts(prods);
    getTotal(prods);
  };
  const getTotal = (prods) => {
    let total = 0;
    for (let index = 0; index < prods.length; index++) {
      const element = prods[index];
      total += element.productPrice;
    }
    setTotal(total);
  };
  const removeItemFromCart = async (id) => {
    console.log("remove item clicked");
    const items = await AsyncStorage.getItem("CartItems");
    const cartItems = JSON.parse(items);
    let loc = null;
    for (let index = 0; index < cartItems.length; index++) {
      const element = cartItems[index];
      if (element === id) {
        loc = index;
        break;
      }
    }
    cartItems.splice(loc, 1);
    await AsyncStorage.setItem("CartItems", JSON.stringify(cartItems));
    getDataFromDB();
  };
  const checkOut = async () => {
    console.log("checked out");
    await AsyncStorage.removeItem("CartItems");
    ToastAndroid.show(
      "Items will be delivered to your address shortly!!",
      ToastAndroid.SHORT
    );
    navigation.navigate("Home");
  };
  const addCartProducts = (prod, index) => {
    return (
      <Pressable
        key={index}
        style={{
          marginVertical: 6,
          flexDirection: "row",
          height: 100,
          width: "100%",
        }}
        onPress={() => {
          navigation.navigate("ProductInfo", { productID: prod.id });
        }}
      >
        <View
          style={{
            backgroundColor: COLOURS.backgroundLight,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            width: "30%",
            padding: 14,
            height: 100,
            marginRight: 16,
          }}
        >
          <Image
            src={prod.productImage}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          ></Image>
        </View>
        <View
          style={{ flex: 1, justifyContent: "space-around", height: "100%" }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              letterSpacing: 1,
              color: COLOURS.black,
              maxWidth: "100%",
            }}
          >
            {prod.productName}
          </Text>
          <View style={{ flexDirection: "row", opacity: 0.6 }}>
            <Text style={{ fontSize: 14, fontWeight: "400" }}>
              {prod.productPrice}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "400" }}>
              (~₹{prod.productPrice + prod.productPrice * 0.02})
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
              }}
            >
              <View
                style={{
                  borderColor: COLOURS.backgroundMedium,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 100,
                  borderWidth: 1,
                  padding: 4,
                  opacity: 0.5,
                  marginRight: 20,
                }}
              >
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                ></MaterialCommunityIcons>
              </View>
              <Text style={{ paddingVertical: 4 }}> 1 </Text>
              <View
                style={{
                  borderColor: COLOURS.backgroundMedium,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 100,
                  borderWidth: 1,
                  padding: 4,
                  marginLeft: 20,
                  opacity: 0.5,
                }}
              >
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                ></MaterialCommunityIcons>
              </View>
            </View>
            <Pressable
              onPress={() => {
                removeItemFromCart(prod.id);
              }}
              style={{
                backgroundColor: COLOURS.backgroundLight,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
                padding: 8,
              }}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                }}
              ></MaterialCommunityIcons>
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  };
  const AddressPayment = ({ isAddress }) => {
    return (
      <>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: COLOURS.black,
            marginVertical: 10,
            letterSpacing: 1,
          }}
        >
          {isAddress ? "Delivery Location" : "Payment Method"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "80%",
            }}
          >
            <View
              style={{
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 10,
                padding: 12,
              }}
            >
              {isAddress ? (
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  style={{ color: COLOURS.blue, fontSize: 18 }}
                />
              ) : (
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: 1,
                    color: COLOURS.blue,
                  }}
                >
                  VISA
                </Text>
              )}
            </View>
            <View
              style={{
                justifyContent: "space-between",
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: COLOURS.black,
                  letterSpacing: 1,
                }}
              >
                {isAddress ? "408 MyHome HitechCity" : "Visa Platinum"}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: COLOURS.black,
                  opacity: 0.5,
                  lineHeight: 20,
                }}
              >
                {isAddress ? "block1, Daffodils" : "****-4004"}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingRight: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              style={{ fontSize: 22, color: COLOURS.black }}
            />
          </View>
        </View>
      </>
    );
  };
  const SubOrder = ({ isSubTotal }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "400",
            color: COLOURS.black,
            opacity: 0.5,
            marginBottom: 10,
          }}
        >
          {isSubTotal ? "Subtotal" : "Shipping Tax"}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
            color: COLOURS.backgroundDark,
            lineHeight: 20,
            opacity: 0.8,
            paddingRight: 6,
          }}
        >
          {isSubTotal ? `₹${total}` : `₹${(total * 0.02).toFixed(2)}`}
        </Text>
      </View>
    );
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
        position: "relative",
      }}
    >
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            height: 50,
            marginTop: 25,
          }}
        >
          <Pressable
            onPress={navigation.goBack}
            style={{
              backgroundColor: COLOURS.backgroundLight,
              borderRadius: 12,
              padding: 12,
            }}
          >
            <Entypo
              name="chevron-left"
              style={{ fontSize: 18, color: COLOURS.backgroundDark }}
            />
          </Pressable>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                color: COLOURS.black,
                fontSize: 16,
                fontWeight: "400",
              }}
            >
              Oder Details
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: COLOURS.black,
            paddingTop: 20,
            marginBottom: 10,
            letterSpacing: 1,
          }}
        >
          My Cart
        </Text>
        {products.map(addCartProducts)}
        <AddressPayment isAddress={true} />
        <AddressPayment isAddress={false} />
        <View style={{ marginTop: 40 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: COLOURS.black,
              marginBottom: 20,
              letterSpacing: 1,
            }}
          >
            Order Info
          </Text>
          <SubOrder isSubTotal={true} />
          <SubOrder isSubTotal={false} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 70,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: COLOURS.black,
                opacity: 0.5,
                marginBottom: 10,
              }}
            >
              Total
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                color: COLOURS.black,
                paddingRight: 6,
              }}
            >
              {total + total * 0.02}
            </Text>
          </View>
        </View>
      </ScrollView>
      <Pressable
        style={{
          backgroundColor: COLOURS.blue,
          position: "absolute",
          bottom: 10,
          width: "86%",
          marginHorizontal: "10%",
          padding: 14,
          borderRadius: 10,
        }}
        onPress={checkOut}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: COLOURS.white,
            alignSelf: "center",
          }}
        >
          CHECKOUT ({total + total * 0.02})
        </Text>
      </Pressable>
    </View>
  );
};

export default MyCart;
