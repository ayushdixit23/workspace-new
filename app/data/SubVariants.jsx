import React from "react";
import { FaCamera } from "react-icons/fa";

const SubVariants = ({
  d,
  f,
  j,
  i,
  price,
  discountedPrice,
  quantity,
  image,
  url,
  onPriceChange,
  onDiscountedPriceChange,
  onQuantityChange,
  onImageChange,
}) => {
  //   const [price, setPrice] = useState("");
  //   const [discounted, setDiscounted] = useState("");
  //   const [quantity, setQuantity] = useState("");
  //   const [image, setImage] = useState("");

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <label
            htmlFor={`variantimage-${i}-${j}`}
            className="sm:w-[55px] w-[40px] h-[40px] relative overflow-hidden mb-2 dark:bg-[#323d4e] bg-[#ECECEE] items-center justify-center sm:h-[55px] rounded-[30px] light:border-2 flex flex-col"
          >
            {image ? (
              <img
                src={
                  typeof image === "string"
                    ? url + image
                    : URL.createObjectURL(image)
                }
                alt="Variant"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex justify-center flex-col items-center">
                <FaCamera className="text-2xl" />
              </div>
            )}
            <input
              type="file"
              id={`variantimage-${i}-${j}`}
              className="hidden"
              onChange={(e) => onImageChange(e.target.files[0])}
            />
          </label>
        </th>
        <td className="px-6 py-4 font-semibold">
          {f} / {d}
        </td>
        <td className="px-6 py-4">
          <div className=" bg-transparent flex items-center border-[#3d4654] rounded-xl border w-[120px]">
            <div className="px-2 border-r border-[#3d4654]">&#8377;</div>
            <input
              type="number"
              value={price}
              className=" outline-none p-2 bg-transparent rounded-xl w-full"
              onChange={(e) => onPriceChange(e.target.value)}
              // onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className=" bg-transparent flex items-center border-[#3d4654] rounded-xl border w-[120px]">
            <div className="px-2 border-r border-[#3d4654]">&#8377;</div>
            <input
              type="number"
              value={discountedPrice}
              onChange={(e) => onDiscountedPriceChange(e.target.value)}
              className=" outline-none p-2 bg-transparent rounded-xl w-full"

              // onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={quantity}
            className=" outline-none p-2 border border-[#3d4654] bg-transparent w-[100px] rounded-xl"
            onChange={(e) => onQuantityChange(e.target.value)}
          />
        </td>
      </tr>
    </>
  );
};

export default SubVariants;
