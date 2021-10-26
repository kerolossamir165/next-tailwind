import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/shopContext";
import MiniCart from "./MiniCart";
function Nav() {
  let { chart, chartOpen, setChartOpen } = useContext(CartContext);
  let quantity = 0;

  chart.map((item) => {
    return (quantity += item?.variantQuantity);
  });

  return (
    <header className="border-b sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <span className="text-lg pt-1 font-bold">Shopify + NextJs</span>
          </a>
        </Link>
        <div
          className="text-md font-bold cursor-pointer"
          onClick={() => setChartOpen(!chartOpen )}
        >
          Cart {quantity}
        </div>
        <MiniCart cart={chart} />
      </div>
    </header>
  );
}

export default Nav;
