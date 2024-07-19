"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decryptaes } from "@/app/utilsHelper/security";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useUpdateProductvariantMutation,
} from "@/app/redux/apiroutes/product";
import { getData } from "@/app/utilsHelper/Useful";
import { AiOutlineLoading3Quarters, AiOutlinePlus } from "react-icons/ai";
// import { AiOutlineLoading3Quarters, AiOutlinePlus } from "react-icons/ai";
import { FaPlus, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import Variants from "@/app/data/Variants";

function page() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    desc: "",
    price: "",
    discountedprice: "",
    quantity: "",
  });
  const [variant, setVariant] = useState({
    size: [],
    text1: "",
    text2: "",
    color: [],
  });
  const [prices, setPrices] = useState(
    Array(variant.size.length * variant.color.length).fill("")
  );
  const [discountedPrices, setDiscountedPrices] = useState(
    Array(variant.size.length * variant.color.length).fill("")
  );
  const [quantities, setQuantities] = useState(
    Array(variant.size.length * variant.color.length).fill("")
  );
  const [images, setImages] = useState(
    Array(variant.size.length * variant.color.length).fill("")
  );
  const [url, setUrl] = useState("");
  const [isvariant, setIsvariant] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [call, setCall] = useState({
    c1: false,
    c2: false,
  });
  const [productInfo, setProductInfo] = useState({
    gst: false,
    gstValue: "",
    shipping: false,
    shippingValue: "",
    weightType: "kg",
  });
  const [by, setBy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const { id } = getData();
  const a = Cookies.get("pivc");
  const pid = a ? decryptaes(a) : null;
  const b = Cookies.get("clvss");
  const cid = b ? decryptaes(b) : null;
  const {
    data: getProduct,
    isLoading,
    isError,
  } = useGetSingleProductQuery(
    { userid: id, pid: pid },
    {
      skip: !id || !pid,
    }
  );

  const handleSubmitSize = (e) => {
    e.preventDefault();
    if (variant.text1.trim() !== "") {
      setVariant((prevVariant) => ({
        ...prevVariant,
        size: [...prevVariant.size, prevVariant.text1],
        text1: "",
      }));
    }
  };

  const handleSubmitColor = (e) => {
    e.preventDefault();
    if (variant.text2.trim() !== "") {
      setVariant((prevVariant) => ({
        ...prevVariant,
        color: [...prevVariant.color, prevVariant.text2],
        text2: "",
      }));
    }
  };

  const removeSize = (indexToRemove) => {
    setVariant({
      ...variant,
      size: variant.size.filter((_, index) => index !== indexToRemove),
    });
  };
  const removeColor = (indexToRemove) => {
    setVariant({
      ...variant,
      color: variant.color.filter((_, index) => index !== indexToRemove),
    });
  };

  const [updation] = useUpdateProductMutation();
  const [updationvariant] = useUpdateProductvariantMutation();

  useEffect(() => {
    const p = getProduct?.data?.product?.variants.map((v) =>
      v.category.map((f) => f?.price)
    );
    const dp = getProduct?.data?.product?.variants.map((v) =>
      v.category.map((f) => f?.discountedprice)
    );
    const qu = getProduct?.data?.product?.variants.map((v) =>
      v.category.map((f) => f?.quantity)
    );
    const conte = getProduct?.data?.product?.variants.map((v) =>
      v.category.map((f) => f?.content)
    );

    if (!isLoading && !isError && getProduct) {
      setProduct({
        ...product,
        name: getProduct?.data?.product?.name || "",
        desc: getProduct?.data?.product?.desc || "",
        price: getProduct?.data?.product?.price || "",
        quantity: getProduct?.data?.product?.quantity || "",

        discountedprice: getProduct?.data?.product?.discountedprice || "",
      });
      setUrl(getProduct?.data?.url);
      if (p) {
        const ab = [].concat(...p);
        setPrices(ab);
      }
      setIsvariant(getProduct?.data?.product?.isvariant || false)
      if (dp) {
        const ab = [].concat(...dp);
        setDiscountedPrices(ab);
      }
      if (qu) {
        const ab = [].concat(...qu);
        setQuantities(ab);
      }
      if (conte) {
        const ab = [].concat(...conte);
        setImages(ab);
      }
      setVariant({
        ...variant,
        size:
          getProduct?.data?.product?.variants[0]?.category.map((d) => d.name) ||
          [],
        color: getProduct?.data?.product?.variants.map((d) => d.value) || [],
      });
      setType(getProduct?.data?.product?.type || "");
      setSelectedImage(getProduct?.data?.urls || []);
    }
  }, [getProduct, isLoading, isError]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);
    const combinedImages = [...selectedImage, ...newImages];
    const limitedImages = combinedImages.slice(0, 4);
    setSelectedImage(limitedImages);
  };

  const handleSubmitNormal = async (e) => {
    if (Number(product.price) < Number(product.discountedprice)) {
      toast.error("Discounted Price Should Be Less Than Selling Price");
      return;
    }
    if (
      !product.desc ||
      !product.name ||
      !product.price ||
      !product.discountedprice ||
      selectedImage.length === 0
    ) {
      toast.error("Please fill in all the required product details.");
      return;
    }
    setLoading(true);
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", product.name);
      formDataToSend.append("price", product.price);
      formDataToSend.append("desc", product.desc);
      formDataToSend.append("discountedprice", product.discountedprice);
      formDataToSend.append("isphysical", call.c2);
      formDataToSend.append(
        "weight",
        productInfo.shippingValue
          ? productInfo.shippingValue + " " + productInfo.weightType
          : null
      );
      formDataToSend.append("quantity", product.quantity);
      selectedImage.forEach((image) => {
        formDataToSend.append("image", image);
      });
      const result = await updation({
        userid: id,
        collectionid: cid,
        product: pid,
        formDataToSend,
      });

      if (result.data?.success) {
        toast.success("Changes Saved!");
        clearCookies();
        setLoading(false);
        router.push("/main/store");
      } else {
        toast.error("Something Went Wrong!");
        clearCookies();
        setLoading(false);

        router.push("/main/store");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    if (isvariant) {
      await handleSubmitVariant(e);
    } else {
      await handleSubmitNormal(e);
    }
  };

  const handleSubmitVariant = async (e) => {
    try {
      e.preventDefault();
      const formDataToSend = new FormData();
      formDataToSend.append("name", product.name);
      formDataToSend.append("prices", JSON.stringify(prices));
      formDataToSend.append(
        "variantdiscountedprice",
        JSON.stringify(discountedPrices)
      );
      images.forEach((ima, index) => {
        if (ima instanceof File) {
          formDataToSend.append(`variantimage-${index}`, ima, `image_${index}`);
        } else if (typeof ima === "string" && ima.trim() !== "") {
          // Check if URL is not empty
          formDataToSend.append(`variantimageurl${index}`, ima);
        }
      });
      // images.forEach((ima, index) => {
      //   if (ima instanceof File) {
      //     formDataToSend.append(
      //       `variantimage[${index}]`,
      //       ima,
      //       `image_${index}`
      //     );
      //   } else if (typeof ima === "string") {
      //     formDataToSend.append(`variantimageurl[${index}]`, ima);
      //   }
      // });
      formDataToSend.append("isvariant", JSON.stringify(isvariant));
      formDataToSend.append("size", JSON.stringify(variant.size));
      formDataToSend.append("color", JSON.stringify(variant.color));
      formDataToSend.append("variantquantity", JSON.stringify(quantities));
      formDataToSend.append("desc", product.desc);
      formDataToSend.append("isphysical", call.c2);
      formDataToSend.append(
        "weight",
        productInfo.shippingValue
          ? productInfo.shippingValue + " " + productInfo.weightType
          : null
      );

      const result = await updationvariant({
        userid: id,
        collectionid: cid,
        product: pid,
        formDataToSend,
      });

      if (result.data?.success) {
        toast.success("Changes Saved!");
        clearCookies();
        setLoading(false);
        router.push("/main/store");
      } else {
        toast.error("Something Went Wrong!");
        clearCookies();
        setLoading(false);

        router.push("/main/store");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageRemove = (indexToRemove) => {
    setSelectedImage((prevImages) =>
      prevImages.filter((_, i) => i !== indexToRemove)
    );
  };

  const clearCookies = () => {
    Cookies.remove("pivc");
    Cookies.remove("clvss");
  };

  useEffect(() => {
    const handlePopstate = () => {
      clearCookies();
      window.location.href = "/main/store";
    };
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = handlePopstate;
    return () => {
      window.onpopstate = null;
    };
  }, []);

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md">
          <div className="animate-spin">
            <AiOutlineLoading3Quarters className="text-2xl text-white" />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="">
      {/**popUp */}
      <Toaster />
      <div
        className={`${by
          ? "fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md"
          : "-z-50 hidden"
          }`}
      >
        <div
          className={`${by
            ? "h-48 w-80 bg-[#F9F9F9] px-2 sm:bg-white dark:bg-[#273142] shadow-xl rounded-3xl flex flex-col items-center justify-center duration-100"
            : "h-0 w-0 duration-100 text-[0px] hidden"
            }`}
        >
          <div className="font-semibold">Sure you want to Discard?</div>
          <div className="text-[12px]">
            Are you sure you want to Discard this?
          </div>
          <div className="flex gap-4 mt-4">
            <div
              onClick={() => setBy(false)}
              className="ring-1 cursor-pointer dark:border-white px-6 py-2 rounded-2xl "
            >
              No, cancel
            </div>
            <Link
              href="/main/store"
              className=" px-6 py-2 cursor-pointer rounded-2xl bg-white text-black "
            >
              Yes, Confirm
            </Link>
          </div>
        </div>
      </div>

      {/**head*/}

      <div className="flex justify-between pn:max-sm:hidden mb-1 p-2 px-4 items-center ">
        <div className="sm:font-medium sm:pl-4 text-[18px] text-[#8B8D97]  ">
          Edit Product
        </div>
        <div className="flex gap-4 pp:gap-8 cursor-pointer items-center">
          <div className="font-semibold " onClick={() => setBy(true)}>
            Discard
          </div>
          <div
            onClick={handleSubmit}
            className=" vs:max-sm:px-10 py-2 px-10 font-semibold bg-[#5570F1] text-white rounded-xl"
          >
            Save
          </div>
        </div>
      </div>

      <div
        className={`fixed flex justify-center items-center ${by ? "-z-50" : "z-50"
          } h-16 dark:bg-[#273142] bg-white dark:border-t dark:border-[#3d4654] w-full sm:hidden bottom-0 left-0`}
      >
        <div className="flex justify-center gap-3 w-full px-3 items-center">
          <div
            onClick={() => setBy(true)}
            className="w-full flex justify-center p-2 border border-[#979797] rounded-lg items-center"
          >
            Discard
          </div>
          <div
            className="w-full flex justify-center p-2 bg-[#4880FF] rounded-lg text-white items-center"
            onClick={(e) => handleSubmit(e)}
          >
            Save Changes
          </div>
        </div>
      </div>

      {/**main */}
      <div className="grid grid-cols-1 w-full dark:bg-[#1b2431] ">
        <div className="sm:px-3 gap-4 grid sm:grid-cols-2 rounded-xl pt-3">
          <div className="w-[100%] flex flex-col sm:items-center">
            <div className="bg-white dark:bg-[#273142] p-4 w-full rounded-2xl">
              <div className="font-semibold text-[20px] pt-1">
                General Information
              </div>
              <div>
                <div className="font-semibold pt-4">Product name</div>
                <input
                  className="outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] dark:bg-[#323d4e] items-center rounded-xl h-10 w-[100%]"
                  type="text"
                  placeholder="Product Name"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
                <div className="text-[#828282] text-[12px] pt-2 ">
                  Give Your Product a short and clear name.
                </div>
              </div>
              <div>
                <div className="font-semibold pt-4 flex justify-between ">
                  Description
                  <p className="font-normal text-[14px] -pl-2 ">
                    {product.desc.length}/ 500
                  </p>
                </div>
                <textarea
                  className="outline-none px-3 pt-3 mt-2 bg-[#F4F5F7] dark:bg-[#323d4e] no-scrollbar resize-y rounded-xl w-[100%] h-48 "
                  type="text"
                  placeholder="Describe the product in few words"
                  value={product.desc}
                  onChange={(e) =>
                    setProduct({ ...product, desc: e.target.value })
                  }
                  maxLength={500}
                />
                <div className="text-[#828282] text-[12px]  ">
                  Give Your Product a short and clear description.
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full">
              {isvariant ? (
                <>
                  {variant.size.length > 0 && (
                    <div className="bg-white dark:bg-[#273142] p-4 pn:max-sm:mb-8 mt-2 rounded-2xl">
                      <div className="font-semibold text-[20px]">
                        Variant Price
                      </div>
                      <div>
                        <Variants
                          variant={variant}
                          prices={prices}
                          url={url}
                          setPrices={setPrices}
                          discountedPrices={discountedPrices}
                          setDiscountedPrices={setDiscountedPrices}
                          quantities={quantities}
                          setQuantities={setQuantities}
                          images={images}
                          setImages={setImages}
                        />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white dark:bg-[#273142] p-4 w-full rounded-2xl mt-2">
                  <div className="font-semibold text-[20px] pt-1">Media</div>

                  <div className="flex flex-wrap items-center mt-3 gap-2">
                    <div className="flex sm:justify-center flex-wrap items-center gap-3">
                      {selectedImage.length > 0 &&
                        selectedImage.map((d, i) => (
                          <div key={i} className="relative w-[95px]  h-[90px]">
                            <img
                              src={
                                typeof d === "string" ? d : URL.createObjectURL(d)
                              }
                              alt={`Selected ${i}`}
                              className="w-[95px]  h-[90px] rounded-lg sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#f0f0f0]"
                            />
                            <div
                              onClick={() => handleImageRemove(i)}
                              className="absolute cursor-pointer top-0 right-0 p-1"
                            >
                              <RxCross2 />
                            </div>
                          </div>
                        ))}
                    </div>
                    {selectedImage.length < 4 && (
                      <div>
                        <label
                          htmlFor="arrayFile"
                          className="w-[95px] relative overflow-hidden rounded-xl items-center justify-center h-[90px] border-dashed dark:border-white border-2 flex flex-col"
                        >
                          <AiOutlinePlus />
                        </label>
                        <input
                          type="file"
                          id="arrayFile"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-[100%] pn:max-sm:mt-3 flex flex-col sm:items-center">
            <div className="pn:max-pp:px-2 w-full sm:w-[90%] min-w-[250px]">
              {!isvariant && (
                <div className="bg-white dark:bg-[#273142] p-4 rounded-2xl ">
                  <div className="font-semibold text-[20px] pt-1">Price</div>
                  <div className="w-full pn:max-pp:flex-col mt-1 flex gap-3 justify-center items-center">
                    <div className="flex flex-col w-full">
                      <div className="font-semibold pb-2">Selling Price</div>
                      <div className="w-full">
                        <input
                          type="number"
                          className="outline-none p-2 w-full bg-[#F4F5F7] dark:bg-[#323d4e] rounded-lg"
                          placeholder="Type base price here..."
                          value={product.price}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (!isNaN(newValue) && parseInt(newValue) >= 0) {
                              setProduct((prev) => ({
                                ...prev,
                                price: newValue,
                              }));
                            } else if (newValue === "" || newValue === "-") {
                              setProduct((prev) => ({
                                ...prev,
                                price: newValue,
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="font-semibold pb-2">Discounted Price</div>
                      <div className="w-full">
                        <input
                          type="number"
                          className="outline-none p-2 w-full bg-[#F4F5F7] dark:bg-[#323d4e] rounded-lg"
                          placeholder="Type Discounted amount..."
                          value={product.discountedprice}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            if (!isNaN(newValue) && parseInt(newValue) >= 0) {
                              setProduct((prev) => ({
                                ...prev,
                                discountedprice: newValue,
                              }));
                            } else if (newValue === "" || newValue === "-") {
                              setProduct((prev) => ({
                                ...prev,
                                discountedprice: newValue,
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="bg-white dark:bg-[#273142] pt-3 my-1 rounded-2xl">
                  <div className="flex items-center">
                    <input
                      className="p-1 m-1"
                      onClick={() => {
                        setCall({ ...call, c1: !call.c1 });
                      }}
                      type="checkbox"
                      checked={call.c1}
                    />
                    <div className="text-[#5570F1]">
                      This product includes gst
                    </div>
                  </div>


                  <div className={`${call.c1 ? "flex flex-col pt-1 w-full" : "hidden"}`}>
                    <div className="font-semibold py-1">GST</div>
                    <div className="relative w-full">
                      <div className="w-full  flex justify-between items-end p-2 sm:max-w-[250px] bg-[#F4F5F7] dark:bg-[#323d4e] rounded-lg">
                        <div>{productInfo.gstValue}</div>
                        {
                          productInfo.gst ? <IoChevronUpSharp onClick={() => setProductInfo({ ...productInfo, gst: false })} className="text-lg " /> : <IoChevronDownSharp onClick={() => setProductInfo({ ...productInfo, gst: true })} className="text-lg " />
                        }

                        <div className={`${productInfo.gst ? "absolute top-10 sm:max-w-[250px] left-0 w-full bg-white dark:bg-[#273142] rounded-lg p-3 shadow-md" : "hidden"} `}>
                          <div className="flex gap-3 font-semibold cursor-pointer flex-col">

                            <div onClick={() => setProductInfo({ ...productInfo, gst: false, gstValue: "5%" })}>5%</div>
                            <div onClick={() => setProductInfo({ ...productInfo, gst: false, gstValue: "12%" })}>12%</div>
                            <div onClick={() => setProductInfo({ ...productInfo, gst: false, gstValue: "18%" })}>18%</div>
                            <div onClick={() => setProductInfo({ ...productInfo, gst: false, gstValue: "28%" })}>28%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div> */}
                  <div className="bg-white dark:bg-[#273142] text-[#b6acac] pt-3 my-1 text-xs rounded-2xl">
                    Note:
                    <ul className="flex flex-col list-disc mt-1 px-3 gap-1">
                      <li>
                        The Discounted Price will be the actual price in which
                        your product will be sold
                      </li>
                      <li>
                        The Discounted Price should be less than that of M.R.P
                      </li>
                      <li>The Price of the product must be inclusive of GST</li>
                    </ul>
                  </div>
                </div>
              )}
              {!isvariant && (
                <div className="bg-white dark:bg-[#273142] p-4 rounded-2xl mt-2">
                  <div className="font-semibold text-[20px] pt-1">
                    Inventory
                  </div>
                  <div className="font-semibold pt-4">Quantity</div>
                  <input
                    className="outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] dark:bg-[#323d4e] items-center rounded-[12px] h-10 w-[100%]"
                    type="number"
                    placeholder="Quantity in Stock"
                    value={product.quantity}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (!isNaN(newValue) && parseInt(newValue) >= 0) {
                        setProduct({ ...product, quantity: newValue });
                      } else if (newValue === "" || newValue === "-") {
                        setProduct({ ...product, quantity: newValue });
                      }
                    }}
                  />
                </div>
              )}

              <div className="bg-white dark:bg-[#273142] p-4 rounded-2xl mt-2">
                {/* <div className="font-semibold text-[14px]">
                  Different Options
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    {isvariant ? (
                      <FaToggleOn
                        className="text-xl"
                        onClick={() => setIsvariant(!isvariant)}
                      />
                    ) : (
                      <FaToggleOff
                        className="text-xl"
                        onClick={() => setIsvariant(!isvariant)}
                      />
                    )}
                  </div>
                  <div>This product has multiple options.</div>
                </div> */}
                {isvariant && (
                  <div className="flex flex-col w-full">
                    {/* options 1*/}
                    <div>
                      <div className="text-[14px] mt-3 font-semibold">
                        Options 1
                      </div>
                      <form onSubmit={handleSubmitSize} className="w-full pn:max-pp:flex-col mt-1 flex gap-3 justify-center items-center">
                        <div className="flex flex-col w-full">
                          <div className="font-semibold text-sm pb-2">Type</div>
                          <div className="w-full">
                            <div className="relative flex justify-center items-center col-span-2 rounded-lg bg-[#F4F5F7] dark:bg-[#323d4e] w-full">
                              <div className="w-full  flex justify-between items-end p-2 sm:max-w-[250px] bg-[#F4F5F7] dark:bg-[#323d4e] rounded-lg">
                                <div>Size</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col w-full">
                          <div className="font-semibold text-sm pb-2">
                            Value
                          </div>
                          <div className="outline-none p-2 w-full dark:bg-[#323d4e] flex justify-center items-center bg-[#F4F5F7] rounded-lg max-w-[300px] overflow-x-scroll no-scrollbar">
                            <input
                              type="text"
                              className="bg-transparent outline-none w-full"
                              value={variant.text1}
                              disabled={variant.size.length > 3}
                              onChange={(e) =>
                                setVariant({
                                  ...variant,
                                  text1: e.target.value,
                                })
                              }
                            // onKeyDown={handleKeyDown}
                            />
                          </div>
                        </div>
                      </form>
                      <div className="flex w-full mt-3 items-center gap-2">
                        {variant.size.map((d, i) => (
                          <div
                            key={i}
                            className="flex justify-center items-center gap-2 bg-[#f1f1f1] p-1 dark:bg-[#323d4e] px-2 text-black rounded-xl"
                          >
                            <div>{d}</div>
                            <div onClick={() => removeSize(i)}>
                              <RxCross2 />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* options 2 */}
                    <div>
                      <div className="text-[14px] mt-3 font-semibold">
                        Options 2
                      </div>
                      <form onSubmit={handleSubmitColor} className="w-full pn:max-pp:flex-col mt-1 flex gap-3 justify-center items-center">
                        <div className="flex flex-col w-full">
                          <div className="font-semibold text-sm pb-2">Type</div>
                          <div className="w-full">
                            <div className="relative flex justify-center items-center col-span-2 rounded-lg bg-[#F4F5F7] dark:bg-[#323d4e] w-full">
                              <div className="w-full  flex justify-between items-end p-2 sm:max-w-[250px] bg-[#F4F5F7] dark:bg-[#323d4e] rounded-lg">
                                <div>Color</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col w-full">
                          <div className="font-semibold text-sm pb-2">
                            Value
                          </div>
                          <div className="outline-none p-2 w-full dark:bg-[#323d4e] flex justify-center items-center bg-[#F4F5F7] rounded-lg max-w-[300px] overflow-x-scroll no-scrollbar">
                            <input
                              type="text"
                              className="bg-transparent outline-none w-full"
                              value={variant.text2}
                              disabled={variant.color.length > 4}
                              onChange={(e) =>
                                setVariant({
                                  ...variant,
                                  text2: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="flex mt-3 w-full items-center gap-2">
                      {variant.color.map((d, i) => (
                        <div
                          key={i}
                          className="flex justify-center items-center gap-2 bg-[#f1f1f1] p-1 dark:bg-[#323d4e]  px-2 text-black rounded-xl"
                        >
                          <div>{d}</div>
                          <div onClick={() => removeColor(i)}>
                            <RxCross2 />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white dark:bg-[#273142] p-4 pn:max-sm:mb-8 mt-2 rounded-2xl">
                <div className="font-semibold text-[20px]">Shiping</div>
                <div className="flex py-[5px] gap-1 items-center">
                  <input
                    className="p-1 "
                    onClick={() => {
                      setCall({ ...call, c2: !call.c2 });
                    }}
                    type="checkbox"
                    checked={call.c2}
                  />
                  <div className="text-[#5570F1]">
                    This is a physical product
                  </div>
                </div>
                <div
                  className={`${call.c2 ? "flex flex-col w-full" : "hidden"} `}
                >
                  <div className="w-full ">
                    <div className="font-semibold pb-1">Weight</div>
                    <div className=" grid grid-cols-7 gap-2 w-full">
                      <input
                        type="number"
                        className="outline-none p-2 col-span-5 w-full bg-[#F4F5F7] dark:bg-[#323d4e] rounded-lg"
                        placeholder="Type Weight Of The Product here..."
                        value={productInfo.shippingValue}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          if (!isNaN(newValue) && parseInt(newValue) >= 0) {
                            setProductInfo({
                              ...productInfo,
                              shippingValue: newValue,
                            });
                          } else if (newValue === "" || newValue === "-") {
                            setProductInfo({
                              ...productInfo,
                              shippingValue: newValue,
                            });
                          }
                        }}
                      />
                      <div className="relative flex justify-center items-center col-span-2 rounded-lg bg-[#F4F5F7] dark:bg-[#323d4e] w-full">
                        <div
                          onClick={() =>
                            setProductInfo({
                              ...productInfo,
                              shipping: !productInfo.shipping,
                            })
                          }
                          className="w-full  flex justify-between items-end p-2 sm:max-w-[250px] bg-[#F4F5F7] dark:bg-[#323d4e] rounded-lg"
                        >
                          <div>{productInfo.weightType}</div>
                          {productInfo.shipping ? (
                            <IoChevronUpSharp
                              onClick={() =>
                                setProductInfo({
                                  ...productInfo,
                                  shipping: false,
                                })
                              }
                              className="text-lg "
                            />
                          ) : (
                            <IoChevronDownSharp
                              onClick={() =>
                                setProductInfo({
                                  ...productInfo,
                                  shipping: true,
                                })
                              }
                              className="text-lg "
                            />
                          )}

                          <div
                            className={`${productInfo.shipping
                              ? "absolute top-10 sm:max-w-[250px] left-0 w-full bg-white dark:bg-[#273142] rounded-lg p-3 shadow-md"
                              : "hidden"
                              } `}
                          >
                            <div className="flex gap-3 font-semibold cursor-pointer flex-col">
                              <div
                                onClick={() =>
                                  setProductInfo({
                                    ...productInfo,
                                    shipping: false,
                                    weightType: "Kg",
                                  })
                                }
                              >
                                Kg
                              </div>
                              <div
                                onClick={() =>
                                  setProductInfo({
                                    ...productInfo,
                                    shipping: false,
                                    weightType: "grams",
                                  })
                                }
                              >
                                grams
                              </div>
                              <div
                                onClick={() =>
                                  setProductInfo({
                                    ...productInfo,
                                    shipping: false,
                                    weightType: "pounds",
                                  })
                                }
                              >
                                pounds
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
