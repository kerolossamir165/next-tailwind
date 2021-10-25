import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formater } from "../utils/helpers.js";
function ProductCard({ product }) {
  let { handle, title } = product.node;
  let { altText, originalSrc } = product.node.images.edges[0].node;
  let { amount } = product.node.priceRange.minVariantPrice;

  return (
    <Link href={`/product/${handle}`}>
      <a className="group">
        <div className="w-full bg-gray-200 rounded-3xl overflow-hidden">
          <div className="relative group-hover:opacity-75 h-72">
            <Image
              src={originalSrc}
              alt={altText}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <h3 className="mt-4 text-lg font-medim text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-700">{formater.format(amount)}</p>
      </a>
    </Link>
  );
}

export default ProductCard;
