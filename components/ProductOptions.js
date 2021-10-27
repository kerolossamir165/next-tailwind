import React from "react";

function ProductOptions({ name, values, selectedOptions, setOptionsValue }) {
  return (
    <fieldset>
      <legend className="text-xl font-semibold">{name}</legend>
      <div className="inline-flex items-center flex-wrap">
        {values.map((value) => {
          let id = `options-${name}-${value}`;
          let checked = selectedOptions[name] === value;

          return (
            <label key={id} htmlFor={id}>
              <input
                className="sr-only"
                id={id}
                name={`option-${name}`}
                type="radio"
                value={value}
                checked={checked}
                onChange={() => setOptionsValue(name, value)}
              />
              <div
                className={`p-2 mt-3 mb-1 text-lg rounded-full block cursor-pointer mr-3 ${
                  checked
                    ? "text-white bg-gray-900"
                    : "text-gray-900 bg-gray-200"
                }`}
              >
                <span className="px-2">{value}</span>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default ProductOptions;
