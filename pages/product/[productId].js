import React from "react";
import { useRouter } from "next/router";
import { getAllProducts, getProduct } from "../../lib/shopify";
import ProductPageContent from "../../components/ProductPageContent";

function Product({ data }) {
  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <ProductPageContent product={data} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  let { productId } = params;
  let data = await getProduct(productId);

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  let data = await getAllProducts();
  let paths = data.map((el) => ({
    params: {
      productId: String(el.node.handle),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default Product;
