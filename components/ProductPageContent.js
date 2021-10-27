import React from "react";
import Image from "next/image";
import ProductForm from "./ProductForm";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import RecomendedList from "./RecommendedList";

function ProductPageContent({ product }) {
  let images = [];

  product.images.edges.map((image, i) => {
    images.push(
      <SwiperSlide key={`slide-${i}`}>
        <Image
          src={image.node.originalSrc}
          alt={image.node.altText}
          layout="fill"
          objectFit="cover"
        />
      </SwiperSlide>
    );
  });

  SwiperCore.use([Navigation, Pagination]);

  return (
    <div>
      <div className="flex justify-center flex-col items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
        <div className="w-full max-w-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
          <div className="relative h-96 w-full">
            {/* <Image
            src={product.images.edges[0].node.originalSrc}
            alt={product.images.edges[0].node.altText}
            layout="fill"
            objectFit="cover"
          /> */}

            <Swiper
              navigation
              pagination={{
                clickable: true,
              }}
              className="h-96 rounded-2xl"
              loop={true}
            >
              {images}
            </Swiper>
          </div>{" "}
        </div>
        <ProductForm product={product} />
      </div>
      <p
        className="
      pt-16 
      space-y-8 
      md:space-x-4
      lg:space-x-8
      max-w-3xl
      w-11/12 
      mx-auto
      font-semibold
      pb-3 
      border-b-2
      "
      >
        {product.description}
      </p>
      <RecomendedList
        current={product.id}
        products={product.collections.edges[0].node.products.edges}
      />
    </div>
  );
}

export default ProductPageContent;
