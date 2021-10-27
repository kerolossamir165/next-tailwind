import Head from "next/head";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import { getProductsInCollections } from "../lib/shopify";
export default function Home({ data }) {
  return (
    <div className="text-3xl">
      <Hero />
      <ProductList products={data} />
    </div>
  );
}

export async function getStaticProps() {
  let data = await getProductsInCollections();
  return {
    props: {
      data,
    },
  };
}
