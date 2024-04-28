import React, { useState } from "react";
import SubVariants from "./SubVariants";

const Variants = ({
  variant,
  prices,
  setPrices,
  discountedPrices,
  setDiscountedPrices,
  quantities,
  setQuantities,
  url,
  images,
  setImages,
}) => {
  const handlePriceChange = (index, value) => {
    const newPrices = [...prices];
    newPrices[index] = value;
    setPrices(newPrices);
  };

  const handleDiscountedPriceChange = (index, value) => {
    const newDiscountedPrices = [...discountedPrices];
    newDiscountedPrices[index] = value;
    setDiscountedPrices(newDiscountedPrices);
  };

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };


  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-black  dark:text-white  uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Variants
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Discounted Price
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {/* <SubVariants variant={variant} /> */}

          <>
            {/* size */}
            {variant.color.map((f, j) => (
              <>
                {/* color */}
                {variant.size.map((d, i) => (
                  <SubVariants
                    key={`${i}-${j}`}
                    d={d}
                    f={f}
                    j={j}
                    url={url}
                    i={i}
                    // price={prices[j * variant.color.length + i]}
                    // discountedPrice={
                    //   discountedPrices[j * variant.color.length + i]
                    // }
                    // quantity={quantities[j * variant.color.length + i]}
                    // image={images[j * variant.color.length + i]}
                    // onPriceChange={(value) =>
                    //   handlePriceChange(j * variant.color.length + i, value)
                    // }
                    // onDiscountedPriceChange={(value) =>
                    //   handleDiscountedPriceChange(
                    //     j * variant.color.length + i,
                    //     value
                    //   )
                    // }
                    // onQuantityChange={(value) =>
                    //   handleQuantityChange(j * variant.color.length + i, value)
                    // }
                    // onImageChange={(value) =>
                    //   handleImageChange(j * variant.color.length + i, value)
                    // }
                    price={prices[j * variant.size.length + i]} // Adjusted index calculation
                    discountedPrice={
                      discountedPrices[j * variant.size.length + i]
                    } // Adjusted index calculation
                    quantity={quantities[j * variant.size.length + i]} // Adjusted index calculation
                    image={images[j * variant.size.length + i]} // Adjusted index calculation
                    onPriceChange={
                      (value) =>
                        handlePriceChange(j * variant.size.length + i, value) // Adjusted index calculation
                    }
                    onDiscountedPriceChange={
                      (value) =>
                        handleDiscountedPriceChange(
                          j * variant.size.length + i,
                          value
                        ) // Adjusted index calculation
                    }
                    onQuantityChange={
                      (value) =>
                        handleQuantityChange(j * variant.size.length + i, value) // Adjusted index calculation
                    }
                    onImageChange={
                      (value) =>
                        handleImageChange(j * variant.size.length + i, value) // Adjusted index calculation
                    }
                  />
                ))}
              </>
            ))}
          </>
        </tbody>
      </table>
    </div>
  );
};

export default Variants;
