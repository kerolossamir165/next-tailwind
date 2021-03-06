import React, { useState, useContext } from "react";
import { formater } from "../utils/helpers";
import ProductOptions from "./ProductOptions";
import { CartContext } from "../context/shopContext";
function ProductForm({ product }) {
  const { addToChart } = useContext(CartContext);

  let allVariantOptions = product.variants.edges?.map((variant) => {
    let allOptions = {};
    variant.node.selectedOptions.map(
      (item) => (allOptions[item.name] = item.value)
    );

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.originalSrc,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 1,
    };
  });

  let defaultValue = {};
  product.options.map((item) => {
    defaultValue[item.name] = item.values[0];
  });

  const [selectedVariants, setSelectedVariants] = useState(
    allVariantOptions[0]
  );
  const [selectedOptions, setSelectedOptions] = useState(defaultValue);

  function setOptionsValue(name, value) {
    setSelectedOptions((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });

    let selctions = {
      ...selectedOptions,
      [name]: value,
    };

    allVariantOptions.map((item) => {
      if (JSON.stringify(item.options) === JSON.stringify(selctions)) {
        setSelectedVariants(item);
      }
    });
  }

  return (
    <div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <span className="p-6">
        {formater.format(product.variants.edges[0].node.priceV2.amount)}
      </span>
      {product.options.map(({ name, values }) => (
        <ProductOptions
          key={`key-${name}`}
          name={name}
          values={values}
          selectedOptions={selectedOptions}
          selectedVariants={selectedVariants}
          setOptionsValue={setOptionsValue}
        />
      ))}
      <button
        onClick={() => addToChart(selectedVariants)}
        className="bg-black rounded-lg mt-5 text-white px-2 py-3 hover:bg-gray-800 "
      >
        Add To Chart
      </button>
    </div>
  );
}

export default ProductForm;
