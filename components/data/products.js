import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  console.log("children", children);
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    axios
      .get("https://nallakshyams.github.io/EcommAPI/products.json")
      .then((response) => {
        setProductList(response.data);
      })
      .catch((error) => {
        alert("Error fetching product data:", error);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ productList }}>
      {children}
    </ProductContext.Provider>
  );
};
