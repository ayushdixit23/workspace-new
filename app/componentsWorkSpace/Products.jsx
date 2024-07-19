import React from "react";
// import { FaAngleDown } from "react-icons/fa";

const Products = ({ data }) => {
  return (
    <>
      {data?.length ? (
        <div className="w-full  ">
          <div className="flex justify-between w-full p-2 items-center "></div>

          <div className="">
            <table className="w-full  rounded-xl border-collapse">
              <thead>
                <tr className="border-b border-[#f1f1f1]">
                  {/* <th className=" text-center text-xs leading-4 py-2 px-3 text-[#ABABAB] font-medium uppercase tracking-wider">
                  No.
                </th> */}
                  <th
                    colSpan="2"
                    className=" text-left text-xs leading-4 px-3 text-[#ABABAB] font-medium uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th className=" text-center text-xs leading-4 px-3 text-[#ABABAB] font-medium uppercase tracking-wider ">
                    Price
                  </th>
                  <th className=" text-center text-xs leading-4 px-3 text-[#ABABAB] font-medium uppercase tracking-wider ">
                    Item Sold
                  </th>
                </tr>
              </thead>
              <tbody className="gap-10">
                {data?.map((d, i) => (
                  <tr key={i}>
                    {/* <td className=" text-sm leading-5 py-2 px-3 text-center">
                    {i + 1}
                  </td> */}
                    <td
                      colSpan="2"
                      className="text-center text-sm py-2 px-3 leading-5 font-medium text-gray-900 col-span-3"
                    >
                      <div className="flex gap-2 items-center">
                        <div>
                          <img
                            src={d?.dps}
                            className="w-[45px] rounded-xl object-cover h-[45px] "
                            alt="image"
                          />
                        </div>
                        <div className="flex flex-col items-start text-xs font-medium gap-1">
                          <div className="font-semibold dark:text-white text-[14px] sm:text-sm">
                            {d?.name.length > 10
                              ? `${d?.name.slice(0, 10)}...`
                              : d?.name}
                          </div>
                          {/* <div>{d?.brandname}</div> */}
                        </div>
                      </div>
                    </td>
                    <td className="min-w-[60px] text-sm text-[#3276E8] font-medium leading-5 py-2 px-3 text-center">
                      ₹{" "}
                      {d?.isvariant
                        ? d.variants[0].category[0].discountedprice
                        : d?.discountedprice}
                    </td>
                    <td className=" text-sm leading-5 py-2 px-3 text-center">
                      {d?.itemsold}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center flex justify-center h-[200px] font-semibold text-xl items-center text-gray-600 my-4">
          No top products available at the moment.
        </div>
      )}
    </>
  );
};

export default Products;
