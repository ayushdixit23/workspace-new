"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { decryptaes } from "@/app/utilsHelper/security";
import { useAddProductMutation } from "@/app/redux/apiroutes/product";
import { getData } from "@/app/utilsHelper/Useful";
import { AiOutlineLoading3Quarters, AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import Cookies from "js-cookie";

function page() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    desc: "",
    price: "",
    discountedprice: "",
    quantity: "",
  })
  const [selectedImage, setSelectedImage] = useState([]);
  const [call, setCall] = useState({
    c1: false,
    c2: false
  });
  const [productInfo, setProductInfo] = useState({
    gst: false,
    gstValue: "",
    shipping: false,
    shippingValue: "",
    weightType: "kg"
  })
  const [by, setBy] = useState(false);
  const [finalimages, setFinalimages] = useState([]);
  const [AddProduct] = useAddProductMutation();
  const { id, fullname } = getData()
  const hoja = Cookies.get("clvss")
  const [loading, setLoading] = useState(false)
  const cid = hoja ? decryptaes(hoja) : null;
  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);
    const combinedImages = [...selectedImage, ...newImages];
    const limitedImages = combinedImages.slice(0, 4);
    const newImagesfinal = newImages.map((image) => image);
    newImagesfinal.forEach((image) => {
      setFinalimages((p) => [...p, image]);
    });
    setSelectedImage(limitedImages);
  };

  const handleSubmit = async (e) => {
    if (Number(product.price) < Number(product.discountedprice)) {
      toast.error("Discounted Price Should Be Less Than Selling Price")
      return
    }
    if (!product.desc || !product.name || !product.price || !product.discountedprice || finalimages.length === 0) {
      toast.error("Please fill in all the required product details.")
      return
    }
    e.preventDefault();
    setLoading(true)
    const formDataToSend = new FormData();
    finalimages.forEach((image) => {
      formDataToSend.append("image", image);
    });
    formDataToSend.append("name", product.name);
    formDataToSend.append("quantity", product.quantity);
    formDataToSend.append("desc", product.desc);
    formDataToSend.append("price", product.price);
    formDataToSend.append("isphysical", call.c2)
    formDataToSend.append("weight", productInfo.shippingValue ? productInfo.shippingValue + " " + productInfo.weightType : null)
    formDataToSend.append("brandname", fullname);
    formDataToSend.append("shippingcost", 24);
    formDataToSend.append("sellername", fullname);
    formDataToSend.append("discountedprice", product.discountedprice);
    try {
      const result = await AddProduct({
        id: id,
        collecid: cid,
        data: formDataToSend,
      });
      if (result.data?.success) {
        setLoading(false)
        router.push("/main/store");
        toast.success("Product Created!")
        clearCookies();
      } else {
        setLoading(false)
        router.push("/main/store");
        clearCookies();
        toast.error(result.data.message)
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  const clearCookies = () => {
    Cookies.remove("clvss")
  };

  const handleImageRemove = (indexToRemove) => {
    setSelectedImage(prevImages => prevImages.filter((_, i) => i !== indexToRemove));
    setFinalimages(prevImages => prevImages.filter((_, i) => i !== indexToRemove))
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
      <Toaster />
      {/**popUp */}
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
              className="ring-1 cursor-pointer ring-black px-6 py-2 rounded-2xl  hover:text-white"
            >
              No, cancel
            </div>
            <Link
              href="/main/store"
              className=" px-6 py-2 cursor-pointer rounded-2xl bg-black text-white "
            >
              Yes, Confirm
            </Link>
          </div>
        </div>
      </div>

      {/**head*/}
      <div className="flex justify-between pn:max-sm:hidden p-2 mb-2 px-4 items-center ">
        <div className="sm:font-medium sm:pl-4 text-[18px]  text-[#8B8D97]  ">
          Add product
        </div>
        <div className="flex gap-4 pp:gap-8 items-center">
          <div
            className="font-semibold cursor-pointer pn:max-pp:hidden"
            onClick={() => setBy(true)}
          >
            Discard
          </div>
          <div
            onClick={(e) => handleSubmit(e)}
            className=" vs:max-sm:px-10 py-2 px-10 font-semibold bg-[#5570F1] text-white rounded-xl"
          >
            Save
          </div>
        </div>
      </div>

      <div className={`fixed flex justify-center  items-center ${by ? "-z-50" : "z-50"} h-16 dark:bg-[#273142] bg-white dark:border-t dark:border-[#3d4654] w-full sm:hidden bottom-0 left-0`}>
        <div className="flex justify-center gap-3 w-full px-3 items-center">
          <div onClick={() => setBy(true)} className="w-full flex justify-center p-2 border border-[#979797] rounded-lg items-center">Discard</div>
          <div className="w-full flex justify-center p-2 bg-[#4880FF] rounded-lg text-white items-center" onClick={(e) => handleSubmit(e)}>Save</div>
        </div>
      </div>

      {/**main */}
      <div className=" w-full h-full">
        <div className="sm:grid sm:grid-cols-2 pn:max-sm:mb-[64px] w-full sm:justify-center pn:max-sm:gap-4 pt-1">
          <div className="w-[100%] flex flex-col sm:px-5 sm:items-center">
            <div className="pn:max-pp:px-2 w-full pp:max-sm:px-10 min-w-[250px]">
              <div className="bg-white dark:bg-[#273142] p-4 w-full rounded-2xl">
                <div className="font-semibold text-[20px] pt-1">
                  General Information
                </div>
                <div>
                  <div className="font-semibold pt-4">Product name</div>
                  <input
                    className="outline-none flex pl-3 justify-center mt-2 dark:bg-[#323d4e] bg-[#F4F5F7] items-center
                    rounded-lg h-10 w-[100%]"
                    type="text"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
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
                    className="outline-none px-3 pt-3 mt-2 dark:bg-[#323d4e] bg-[#F4F5F7] no-scrollbar resize-y rounded-lg w-[100%] h-48 "
                    type="text"
                    placeholder="Describe the product in few words"
                    value={product.desc}
                    onChange={(e) => setProduct({ ...product, desc: e.target.value })}

                    maxLength={500}
                  />
                  <div className="text-[#828282] text-[12px]  ">
                    Give Your Product a short and clear description.
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-[#273142] p-4 w-full rounded-2xl mt-2">
                <div className="font-semibold text-[20px] pt-1">Media</div>

                <div className="flex flex-wrap items-center mt-3 gap-2">
                  <div className="flex sm:justify-center flex-wrap items-center gap-3">
                    {selectedImage.length > 0 && selectedImage.map((d, i) => (
                      <div key={i} className="relative w-[95px]  h-[90px]">
                        <img src={URL.createObjectURL(d)} alt={`Selected ${i}`} className="w-[95px]  h-[90px] rounded-lg sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#f0f0f0]" />
                        <div onClick={() => handleImageRemove(i)} className="absolute cursor-pointer top-0 right-0 p-1"><RxCross2 /></div>
                      </div>
                    ))}
                  </div>
                  {selectedImage.length < 4 && < div >
                    <label htmlFor="arrayFile" className="w-[95px] relative overflow-hidden rounded-xl items-center justify-center h-[90px] border-dashed dark:border-[#fff] border-2 flex flex-col"
                    >
                      <AiOutlinePlus />
                    </label>
                    <input type="file"
                      id="arrayFile"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden" />
                  </div>}


                </div>

                {/* <div className="text-[#828282] text-[12px] pt-2 ">
                  Used to represent your product during checkout , in Community
                  ,social sharing and more.
                </div> */}
              </div>
            </div>
          </div>
          {/* left */}
          <div className="w-[100%] pn:max-sm:mt-3 flex flex-col sm:items-center">
            <div className="pn:max-pp:px-2 pp:max-sm:px-10 sm:w-[90%] min-w-[250px]">
              <div className="bg-white dark:bg-[#273142] p-4 rounded-2xl ">
                <div className="font-semibold text-[20px] pt-1">Price</div>

                <div className="w-full pn:max-pp:flex-col mt-1 flex gap-3 justify-center items-center">
                  <div className="flex flex-col w-full">
                    <div className="font-semibold pb-2">Selling Price</div>
                    <div className="w-full">
                      <input type="number" className="outline-none p-2 w-full dark:bg-[#323d4e] bg-[#F4F5F7] rounded-lg" placeholder="Type base price here..." value={product.price}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          if (
                            !isNaN(newValue) &&
                            parseInt(newValue) >= 0
                          ) {
                            setProduct((prev) => ({ ...prev, price: newValue }));
                          } else if (newValue === "" || newValue === "-") {
                            setProduct((prev) => ({ ...prev, price: newValue }));
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="font-semibold pb-2">Discounted Price</div>
                    <div className="w-full">
                      <input type="number" className="outline-none p-2 w-full bg-[#F4F5F7] dark:bg-[#323d4e] rounded-lg" placeholder="Type Discounted amount..." value={product.discountedprice}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          if (
                            !isNaN(newValue) &&
                            parseInt(newValue) >= 0
                          ) {
                            setProduct((prev) => ({ ...prev, discountedprice: newValue }));
                          } else if (newValue === "" || newValue === "-") {
                            setProduct((prev) => ({ ...prev, discountedprice: newValue }));
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#273142] pt-3 my-1 rounded-2xl">
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
                      <div className="w-full  flex justify-between items-end p-2 sm:max-w-[250px] dark:bg-[#323d4e] bg-[#F4F5F7] rounded-lg">
                        <div>{productInfo.gstValue}</div>
                        {
                          productInfo.gst ? <IoChevronUpSharp onClick={() => setProductInfo({ ...productInfo, gst: false })} className="text-lg " /> : <IoChevronDownSharp onClick={() => setProductInfo({ ...productInfo, gst: true })} className="text-lg " />
                        }

                        <div className={`${productInfo.gst ? "absolute top-10 sm:max-w-[250px] left-0 w-full dark:bg-[#273142] dark:text-white bg-white rounded-lg p-3 shadow-md" : "hidden"} `}>
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

                </div>
              </div>
              <div className="bg-white dark:bg-[#273142] p-4 rounded-2xl mt-2">
                <div className="font-semibold text-[20px] pt-1">Inventory</div>
                <div className="font-semibold pt-4">Quantity</div>
                <input
                  className="outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] dark:bg-[#323d4e] items-center   rounded-lg h-10 w-[100%]"
                  type="number"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (
                      !isNaN(newValue) &&
                      parseInt(newValue) >= 0
                    ) {
                      setProduct({ ...product, quantity: newValue });
                    } else if (newValue === "" || newValue === "-") {
                      setProduct({ ...product, quantity: newValue });
                    }
                  }}
                  placeholder="Quantity in Stock"
                  value={product.quantity}
                />
              </div>
              {/* <div className="bg-white dark:bg-[#273142] p-4 rounded-2xl mt-2">
                <div className="font-semibold text-[20px] pt-1">Variation</div>
                <div className="flex pn:max-pp:flex-col gap-3">
                  <div>
                    <div className="font-semibold pt-4">Variation Type</div>
                    <input
                      className="outline-none flex w-full p-2 justify-center bg-[#F4F5F7] dark:bg-[#323d4e] items-center rounded-xl "
                      type="number"
                      placeholder="price..."
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="font-semibold pt-4">Variation</div>
                    <input
                      className="outline-none flex p-2 justify-center bg-[#F4F5F7] dark:bg-[#323d4e] items-center rounded-xl w-full"
                      type="number"
                      placeholder="Discounted price..."
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />

                  </div>

                </div>
                <div className="mt-3">
                  <button className="flex justify-center items-center bg-[#E8F1FF] text-[#5570F1] p-2 px-5 rounded-xl">
                    <div><FaPlus />
                    </div>
                    <div>Add Variant</div>
                  </button>
                </div>
              </div> */}
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
                <div className={`${call.c2 ? "flex flex-col w-full" : "hidden"} `}>


                  <div className="w-full ">
                    <div className="font-semibold pb-1">Weight</div>
                    <div className=" grid grid-cols-7 gap-2 w-full">
                      <input type="number" className="outline-none p-2 col-span-5 w-full bg-[#F4F5F7] dark:bg-[#323d4e] rounded-lg" placeholder="Type Weight Of The Product here..." value={productInfo.shippingValue}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          if (
                            !isNaN(newValue) &&
                            parseInt(newValue) >= 0
                          ) {
                            setProductInfo({ ...productInfo, shippingValue: newValue });
                          } else if (newValue === "" || newValue === "-") {
                            setProductInfo({ ...productInfo, shippingValue: newValue });
                          }
                        }}
                      />
                      <div className="relative flex justify-center items-center col-span-2 rounded-lg bg-[#F4F5F7] dark:bg-[#323d4e] w-full">
                        <div className="w-full  flex justify-between items-end p-2 sm:max-w-[250px] bg-[#F4F5F7] dark:bg-[#323d4e] rounded-lg">
                          <div>{productInfo.weightType}</div>
                          {
                            productInfo.shipping ? <IoChevronUpSharp onClick={() => setProductInfo({ ...productInfo, shipping: false })} className="text-lg " /> : <IoChevronDownSharp onClick={() => setProductInfo({ ...productInfo, shipping: true })} className="text-lg " />
                          }

                          <div className={`${productInfo.shipping ? "absolute top-10 sm:max-w-[250px] left-0 w-full bg-white dark:bg-[#273142] rounded-lg p-3 shadow-md" : "hidden"} `}>
                            <div className="flex gap-3 font-semibold cursor-pointer flex-col">

                              <div onClick={() => setProductInfo({ ...productInfo, shipping: false, weightType: "Kg" })}>Kg</div>
                              <div onClick={() => setProductInfo({ ...productInfo, shipping: false, weightType: "grams" })}>grams</div>
                              <div onClick={() => setProductInfo({ ...productInfo, shipping: false, weightType: "pounds" })}>pounds</div>
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
    </div >
  );
}

export default page;