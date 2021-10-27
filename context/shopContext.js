import React, { createContext, useState, useEffect, useContext } from "react";
import { createCheckOut, updateCheckOut } from "../lib/shopify";

let CartContext = createContext();

function ShopContextProvider({ children }) {
  const [chart, setChart] = useState([]);
  const [chartOpen, setChartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");

  useEffect(() => {
    if (localStorage.checkOut_Id) {
      let cartObj = JSON.parse(localStorage.checkOut_Id);
      if (cartObj[0].id) {
        setChart(cartObj[0]);
      } else if (cartObj[0].length > 0) {
        setChart(...[cartObj[0]]);
      }
      setCheckoutId(cartObj[1].id);
      setCheckoutUrl(cartObj[1].webUrl);
    }
  }, []);

  async function addToChart(item) {
    setChartOpen(true);
    if (chart.length === 0) {
      setChart([item]);

      let checkOut = await createCheckOut(item.id, item.variantQuantity);
      setCheckoutId(checkOut.id);
      setCheckoutUrl(checkOut.webUrl);
      localStorage.setItem("checkOut_Id", JSON.stringify([item, checkOut]));
    } else {
      let newChart = [...chart];
      chart.map((el) => {
        if (el.id === item.id) {
          item.variantQuantity++;
          newChart = [...chart];
        } else {
          newChart = [...chart, item];
        }
      });
      setChart([...newChart]);
      let newCheckout = await updateCheckOut(checkoutId, chart);
      localStorage.setItem(
        "checkOut_Id",
        JSON.stringify([newChart, newCheckout])
      );
    }
  }

  async function removeFromCart(itemToRemove) {
    let updatedChart = chart.filter((item) => {
      return item.id !== itemToRemove;
    });
    setChart(updatedChart);

    let newCheckout = await updateCheckOut(checkoutId, updatedChart);
    localStorage.setItem(
      "checkOut_Id",
      JSON.stringify([updatedChart, newCheckout])
    );

    if (chart.length === 1) {
      setChartOpen(false);
    }
  }

  return (
    <CartContext.Provider
      value={{
        chart,
        chartOpen,
        setChartOpen,
        addToChart,
        checkoutUrl,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

let ShopConsumer = CartContext.Consumer;

export { ShopConsumer, ShopContextProvider, CartContext };
