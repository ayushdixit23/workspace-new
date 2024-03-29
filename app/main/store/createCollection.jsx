import React from "react";
import hehe from "../../assets/image/hehe.png";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { useCreateCollectionMutation } from "@/app/redux/apiroutes/product";
import { LoadThis } from "@/app/redux/slice/userData";
import toast from "react-hot-toast";
import { RiLoader2Line } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CreateCollection = ({ col, setCol, image, refetch, refetchStore, loading, checkstore, setLoading, router, dispatch, setCheck, setImage, id }) => {
  const [createCollectionMutation] = useCreateCollectionMutation();
  const handleFileChangeCol = (e) => {
    const selectedFile = e.target.files[0];
    const sendFile = URL.createObjectURL(selectedFile);
    setCol({ ...col, d3: selectedFile });
    setImage(sendFile);
  };

  const list = [
    { name: "Retail" },
    { name: "Fashion and Apparel" },
    { name: "Electronics" },
    { name: "Home And Furniture" },
    { name: "Beauty and Personal Care" },
    { name: "Health and Wellness" },
    { name: "Food and Grocery" },
    { name: "Books and Media" },
    { name: "Toys and Games" },
    { name: "Jewellery and Accessories" },
    { name: "Art and Crafts" },
    { name: "Sports and Outdoors" },
    { name: "Electronics Accessories" },
    { name: "Handmade and Artisanal Products" },
  ];

  const sendCol = async (e) => {

    // if (!col.d1 || !col.d2) {
    //   toast.error("Please fill in all required details.");
    //   return;
    // } else if (col.d2 === "Food and Grocery") {
    //   if (!col.d3 && checkstore.foodLicenceExist == false) {
    //     toast.error("Please fill in all required details.");
    //     return
    //   }
    // }

    if (!col.d1 || !col.d2 || (col.d2 === "Food and Grocery" && (!col.d3 && !checkstore.foodLicenceExist))) {
      toast.error("Please fill in all required details.");
      return;
    }

    setLoading(true)
    e.preventDefault();
    const formDataCol = new FormData();
    formDataCol.append("name", col.d1);
    formDataCol.append("category", col.d2);
    formDataCol.append("verfication", col.d3);
    try {
      formDataCol.forEach((d) => {
      
      });
      const result = await createCollectionMutation({
        id: id,
        data: formDataCol,
      });
     
      if (result.data?.success) {
        toast.success("Collection Created Successfully!")
        await refetch()
        if (col.d2 == "Food and Grocery" && col.d3) {
          await refetchStore()
        }
        setCol({
          d1: "",
          d2: "",
          d3: "",
        })
        setLoading(false)
        router.refresh()
      } else {
        toast.error(result.data.message)
      }
      dispatch(LoadThis(false))
      setCheck(0)
      router.push("/main/store")
      setLoading(false)
    } catch (e) {
      setLoading(false)
  
    } finally {
      setCol({
        d1: "",
        d2: "",
        d3: "",
      })
    }
  };
  return (
    <>
      <div
        className={` fixed inset-0 bg-black bg-opacity-50  backdrop-filter w-screen h-screen backdrop-blur-md z-50 `}
      >
        <div className="flex justify-center pn:max-vs:text-sm items-center h-screen pn:max-pp:p-2">
          <div className="flex max-w-[450px] max-h-[700px] p-3 gap-2 pp:p-5 rounded-lg bg-white dark:bg-[#131313] flex-col">
            <div>
              <Image src={hehe} alt="hehe" />
            </div>
            <div className="font-semibold">Collection</div>
            <div className="text-sm">
              This blog post has been published. Team members will be able to
              edit this post and republish changes.
            </div>
            <div className="flex flex-col w-full gap-3">
              <div className="w-full flex gap-1 flex-col">
                <div className="text-sm font-medium">Collection name</div>
                <input
                  className="border p-1 px-3 rounded-lg bg-[#fff] dark:bg-[#] dark:bg-[#0A0A0A] outline-none"
                  value={col.d1}
                  onChange={(e) => setCol({ ...col, d1: e.target.value })}
                />
              </div>
              <div className="w-full gap-3 flex flex-col">
                <div className="text-sm font-medium">Collection Category</div>

                <Select
                  onValueChange={(selectedValue) => {
                    setCol({ ...col, d2: selectedValue })
                  }}

                  defaultValue={col.d2}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={col.d2} />
                  </SelectTrigger>
                  <SelectContent>

                    {list.map((d, i) => (
                      <SelectItem key={i} value={d.name}>{d.name}</SelectItem>
                    ))}

                  </SelectContent>
                </Select>
                <div>
                  {col.d2 === "Food and Grocery" && !checkstore.foodLicenceExist && (
                    <>
                      <div>
                        <label htmlFor="fileInput">
                          <div>Upload Document for Verification</div>
                          {col.d3 ? (
                            <div className="flex justify-center items-center">
                              <img
                                src={`${image}`}
                                alt="image"
                                className="max-w-[100px]"
                              />
                            </div>
                          ) : (
                            <div className="border-2 p-6 border-dashed rounded-xl flex justify-center items-center">
                              <FaPlus />
                            </div>
                          )}
                        </label>
                        <input
                          type="file"
                          id="fileInput"
                          className="hidden"
                          onChange={(e) => handleFileChangeCol(e)}
                        />
                      </div>
                    </>
                  )}
                </div>
                {col.d2 === "Food and Grocery" && !checkstore.foodLicenceExist && <div className="text-[#aaa] -mt-1 mb-2 text-sm">To add food products, verify your food license</div>}
                <div className="flex justify-center items-center w-full gap-3">
                  <button
                    className="bg-white border-2 dark:border-none text-black p-2 w-full rounded-xl"
                    onClick={() => { setCheck(0); dispatch(LoadThis(false)); router.push("/main/store") }}
                  >
                    Cancel
                  </button>

                  {
                    loading ?
                      <button
                        disabled={true}
                        className="bg-[#1554F6] flex justify-center items-center text-white p-2 w-full rounded-xl"
                      >
                        <RiLoader2Line className="text-lg animate-spin text-white" />
                      </button> :
                      <button
                        className="bg-[#1554F6] text-white p-2 w-full rounded-xl"
                        onClick={(e) => sendCol(e)}
                      >
                        Create Collection
                      </button>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

const MemorizedCollection = React.memo(CreateCollection)
export default MemorizedCollection;
