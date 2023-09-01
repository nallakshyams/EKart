import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { COLOURS } from "../data/data";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import auth from "../firebase/myfirebase";
import { useProductContext } from "../data/products";
const headerText = `Electronic Shoppe`;
const subHeaderText = `Electronic shop in Hyderabad. 
This shop offers both laptops and mobiles`;

const Home = ({ navigation }) => {
  const [laptops, setLaptops] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  const { productList } = useProductContext();
  useEffect(() => {
    const unregister = navigation.addListener("focus", () => {
      getData();
    });
    return unregister;
  }, [navigation]);
  const getData = () => {
    const laps = [];
    const mobs = [];
    for (let index = 0; index < productList.length; index++) {
      const element = productList[index];
      if (element.category === "laptop") {
        laps.push(element);
      } else {
        mobs.push(element);
      }
    }
    setLaptops(laps);
    setMobiles(mobs);
  };
  const ProductCard = ({ data }) => {
    return (
      <Pressable
        style={{ marginTop: 12, width: "48%" }}
        onPress={() =>
          navigation.navigate("ProductInfo", { productID: data.id })
        }
      >
        <View
          style={{
            width: "100%",
            height: 100,
            borderRadius: 10,
            backgroundColor: COLOURS.backgroundLight,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {data.isOff && (
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: COLOURS.green,
                width: "20%",
                height: "24%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: COLOURS.white,
                  letterSpacing: 1,
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {data.offPercentage}
              </Text>
            </View>
          )}
          <Image
            src={data.productImage}
            style={{ width: "80%", height: "80%", resizeMode: "contain" }}
          />
        </View>
        <Text
          style={{
            color: COLOURS.black,
            fontSize: 12,
            fontWeight: 600,
            marginTop: 8,
          }}
        >
          {data.productName}
        </Text>
        {data.category === "mobile" && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome
              name={"circle"}
              style={{
                fontSize: 12,
                color: data.isAvailable ? COLOURS.green : COLOURS.red,
              }}
            ></FontAwesome>
            <Text
              style={{
                fontSize: 12,
                color: data.isAvailable ? COLOURS.green : COLOURS.red,
                paddingLeft: 4,
              }}
            >
              {data.isAvailable ? "Available" : "Not available"}
            </Text>
          </View>
        )}
        <Text style={{ fontSize: 12, color: "grey" }}>
          ₹{data.productPrice}
        </Text>
      </Pressable>
    );
  };

  const TotalProducts = ({ category, list }) => {
    return (
      <View style={{ padding: 16 }}>
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
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 500, letterSpacing: 1 }}>
              {category}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 400,
                marginLeft: 10,
                opacity: 0.5,
              }}
            >
              100
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.blue,
              fontWeight: 400,
              marginLeft: 10,
            }}
          >
            SeeAll
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {list.map((data) => {
            return <ProductCard data={data} key={data.id} />;
          })}
        </View>
      </View>
    );
  };
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log("signOut err", error.message);
        switch (error.code) {
          case "auth/user-not-found":
            alert("user-not-found");
            break;
          case "auth/network-request-failed":
            alert("network-request-failed");
            break;
          case "auth/too-many-requests":
            alert("too-many-requests");
            break;
          default:
            alert("Something went wrong!! Please try again!!");
            break;
        }
      });
  };
  return (
    <View
      style={{ width: "100%", height: "100%", backgroundColor: COLOURS.white }}
    >
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 12 }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
          }}
        >
          <Pressable onPress={signOut}>
            <MaterialCommunityIcons
              name="exit-to-app"
              style={{
                fontSize: 18,
                padding: 12,
                color: COLOURS.backgroundMedium,
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 10,
              }}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("MyCart")}>
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 18,
                padding: 12,
                color: COLOURS.backgroundMedium,
                backgroundColor: "rgba(0, 0, 0, 0)",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLOURS.backgroundLight,
              }}
            />
          </Pressable>
        </View>
        <View style={{ marginBottom: 10, padding: 16 }}>
          <Text
            style={{
              color: COLOURS.black,
              fontSize: 26,
              fontWeight: "500",
              letterSpacing: 1,
              marginBottom: 10,
            }}
          >
            {headerText}
          </Text>
          <Text
            style={{
              color: COLOURS.black,
              fontSize: 13,
              fontWeight: "400",
              letterSpacing: 1,
              lineHeight: 24,
            }}
          >
            {subHeaderText}
          </Text>
        </View>
        <TotalProducts category={"Laptops"} list={laptops} />
        <TotalProducts category={"Mobiles"} list={mobiles} />
      </ScrollView>
    </View>
  );
};

export default Home;
