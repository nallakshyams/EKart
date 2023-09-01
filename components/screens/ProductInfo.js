import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLOURS } from "../data/data";
import { StatusBar } from "expo-status-bar";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useProductContext } from "../data/products";
//import { Toast } from "react-native-toast-message/lib/src/Toast";

const ProductInfo = ({ route, navigation }) => {
  const { productList } = useProductContext();
  const screenWidth = Dimensions.get("screen").width;
  const address = "Gachibowli Street 55,\n1/71-3, Hyderabad";
  const { productID } = route.params;
  const [product, setProduct] = useState({});
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);
  const getData = async () => {
    for (let index = 0; index < productList.length; index++) {
      const element = productList[index];
      if (element.id === productID) {
        await setProduct(element);
        return;
      }
    }
  };
  const renderProduct = ({ item, index }) => {
    console.log("item is ", item);
    return (
      <View
        style={{
          width: screenWidth,
          height: 180,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={item}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
    );
  };
  const addToCart = async (productID) => {
    try {
      let cartItems = await AsyncStorage.getItem("CartItems");
      console.log("before cartItems", cartItems);
      let itemArray = JSON.parse(cartItems);
      if (!itemArray) {
        itemArray = [];
      }
      if (!itemArray.includes(productID)) {
        itemArray.push(productID);
        await AsyncStorage.setItem("CartItems", JSON.stringify(itemArray));
        console.log("after cartItems", cartItems);
      }
    } catch (err) {
      console.log("err", err);
    }

    ToastAndroid.show("Item Added Successfully to cart", ToastAndroid.SHORT);
    navigation.navigate("Home");
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLOURS.backgroundLight}
      ></StatusBar>
      <ScrollView>
        <View
          style={{
            width: "100%",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: COLOURS.backgroundLight,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
            marginBottom: 4,
            paddingBottom: 4,
          }}
        >
          <View
            style={{
              backgroundColor: COLOURS.backgroundLight,
              width: "100%",
              flexDirection: "row",
              paddingTop: 16,
              paddingLeft: 16,
            }}
          >
            <Pressable
              onPress={() => {
                navigation.goBack("Home");
              }}
            >
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  backgroundColor: COLOURS.white,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  borderRadius: 10,
                }}
              />
            </Pressable>
          </View>
          <FlatList
            data={product.productImageList ? product.productImageList : null}
            renderItem={renderProduct}
            horizontal
            decelerationRate={0.8}
            snapToInterval={screenWidth}
            bounces={false}
          />
        </View>
        <View style={{ marginTop: 6, paddingHorizontal: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 14,
            }}
          >
            <Entypo
              name={"shopping-cart"}
              style={{ fontSize: 18, color: COLOURS.blue, marginRight: 6 }}
            />
            <Text style={{ fontSize: 12, color: COLOURS.blue }}>Shopping</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 4,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                maxWidth: "84%",
                fontSize: 20,
                color: COLOURS.black,
                fontWeight: "600",
                letterSpacing: 0.5,
                paddingVertical: 8,
              }}
            >
              {product.productName}
            </Text>
            <Ionicons
              name="link-outline"
              style={{
                fontSize: 24,
                color: COLOURS.blue,
                backgroundColor: COLOURS.blue + 10,
                borderRadius: 100,
                padding: 8,
              }}
            ></Ionicons>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: COLOURS.black,
              letterSpacing: 1,
              fontWeight: "400",
              opacity: 0.5,
              lineHeight: 20,
              maxWidth: "85%",
              maxHeight: 44,
              marginBottom: 8,
            }}
          >
            {product.description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: COLOURS.backgroundLight,
              paddingBottom: 20,
              marginVertical: 14,
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
                  borderRadius: 100,
                  padding: 12,
                  marginRight: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo
                  name="location-pin"
                  style={{ fontSize: 16, color: COLOURS.blue }}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.black,
                  letterSpacing: 1,
                  fontWeight: "400",
                  opacity: 0.5,
                  lineHeight: 20,
                  alignSelf: "flex-start",
                }}
              >
                {address}
              </Text>
            </View>
            <View>
              <Entypo
                name="chevron-right"
                style={{ fontSize: 22, color: COLOURS.backgroundDark }}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                color: COLOURS.black,
                fontWeight: "500",
                maxWidth: "85%",
                marginBottom: 4,
              }}
            >
              ₹{product.productPrice}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.black,
                letterSpacing: 1,
                fontWeight: "400",
                opacity: 0.5,
                lineHeight: 20,
                maxWidth: "85%",
                maxHeight: 44,
              }}
            >
              Tax rate 2% ~₹{Math.round(product.productPrice * 0.02)} (~₹
              {product.productPrice + Math.round(product.productPrice * 0.02)})
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "8%",
        }}
      >
        <Pressable
          onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
          style={{
            backgroundColor: COLOURS.blue,
            width: "86%",
            paddingVertical: 16,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              color: COLOURS.white,
              alignSelf: "center",
              letterSpacing: 1,
            }}
          >
            {product.isAvailable ? "ADD TO CART" : "NOT AVAILABLE"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProductInfo;
