import { useCreateStoreMutation } from "@/app/redux/apiroutes/product";
import { LoadThis } from "@/app/redux/slice/userData";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaAsterisk, FaPlus } from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";

const CreateStore = ({
  store,
  dispatch,
  setStore,
  setCheck,
  loading,
  setLoading,
  setShowImage,
  router,
  showImage,
  location,
  refetch,
  id,
}) => {
  const [createStore] = useCreateStoreMutation();
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const sendFile = URL.createObjectURL(selectedFile);
    setStore({ ...store, d9: selectedFile });
    setShowImage(sendFile);
  };

  const handlePin = async (e) => {
    try {
      const i = e.target.value
      setStore({
        ...store,
        d4: i
      })
      if (i.length === 6) {
        const res = await axios.get(`
          https://api.postalpincode.in/pincode/${i}
        `);
      
        if (res?.status === 200) {
          setStore({
            ...store,
            d2: res.data[0].PostOffice[0].District,
            d3: res.data[0].PostOffice[0].State,
            d4: res.data[0].PostOffice[0].Pincode,
          })
          // setState(res.data[0].PostOffice[0].State);
          // setCity(res.data[0].PostOffice[0].District);
          // setCounty(res.data[0].PostOffice[0].Country);
        }
      }
    } catch (e) {
      // detecterror({ e });
      console.log(e);
    }
  }

  const send = async (e) => {
    if (!store.d1 || !store.d2 || !store.d3 || !store.d4 || !store.d5 || !store.d9 || !store.d8) {
      toast.error("Please Enter All Details")
      return
    }
    if (store.d4.length != 6) {
      toast.error("Enter 6 digit Postal Code")
      return
    }
    e.preventDefault();
    setLoading(true)
    try {

      const formDataToSend = new FormData();
      formDataToSend.append("buildingno", store.d1);
      formDataToSend.append("city", store.d2);
      formDataToSend.append("state", store.d3);
      formDataToSend.append("postal", store.d4);
      formDataToSend.append("landmark", store.d5);
      formDataToSend.append("gst", store.d6);
      formDataToSend.append("businesscategory", store.d7);
      formDataToSend.append("documenttype", store.d8);
      formDataToSend.append("documentfile", store.d9);
      formDataToSend.append("latitude", location.latitude)
      formDataToSend.append("accuracy", location.accuracy)
      formDataToSend.append("longitude", location.longitude)
      formDataToSend.append("altitude", location.altitude)
      const result = await createStore({
        id: id,
        data: formDataToSend,
      });
   
      if (result.data?.success) {
        await refetch();
        setLoading(false)
        toast.success("Store Created Successfully!")
      } else {
        setLoading(false)
        toast.error("Something Went Wrong!")
      }
      dispatch(LoadThis(false))
      setCheck(0);
      router.push("/main/store")
    } catch (e) {
      setLoading(false)
      console.log(e);
    } finally {
      setStore({
        d1: "",
        d2: "",
        d3: "",
        d4: "",
        d5: "",
        d6: "",
        d7: "",
        d8: "",
        d9: ""
      })
    }
  };
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-filter h-screen backdrop-blur-md z-50`}
      >
        <div className="flex justify-center pn:max-vs:text-sm items-center h-screen pn:max-pp:p-2">
          <div className="bg-white dark:bg-[#273142] overflow-y-scroll no-scrollbar max-h-[550px] sm:max-h-[650px] p-3 pp:p-5 rounded-lg md:min-w-[500px] w-[95%] pp:max-w-[900px]">
            <div className="flex flex-col mb-3">
              <div className="text-lg font-semibold">
                Continue to Setup Your Store
              </div>
              <div>Enter The Remaining Details</div>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full">
              <div className="flex flex-col gap-1 w-full">
                <div className="text-sm flex gap-1 items-center font-medium">Address <FaAsterisk className="text-[10px] text-red-800" /></div>
                <input
                  type="text"
                  className="border-2 bg-[#FAFAFA] dark:bg-[#323d4e] dark:border-none outline-none p-1 rounded-lg"
                  value={store.d1}
                  onChange={(e) => setStore({ ...store, d1: e.target.value })}
                />
              </div>

              <div className="grid pp:grid-cols-2 gap-2 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <div className="text-sm flex gap-1 items-center font-medium">Postal Code <FaAsterisk className="text-[10px] text-red-800" /></div>
                  <input
                    type="number"
                    maxLength={6}
                    className="border-2 bg-[#FAFAFA] dark:bg-[#323d4e] dark:border-none outline-none p-1 rounded-lg"
                    value={store.d4}
                    // onChange={(e) => setStore({ ...store, d4: e.target.value })}
                    onChange={(e) => handlePin(e)}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="text-sm flex gap-1 items-center font-medium">Famous Landmark <FaAsterisk className="text-[10px] text-red-800" /></div>
                  <input
                    type="text"
                    className="border-2 bg-[#FAFAFA] dark:bg-[#323d4e] dark:border-none outline-none p-1 rounded-lg"
                    value={store.d5}
                    onChange={(e) => setStore({ ...store, d5: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid pp:grid-cols-2 gap-2 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <div className="text-sm flex gap-1 items-center font-medium">City <FaAsterisk className="text-[10px] text-red-800" /></div>
                  <input
                    disabled={store.d4.length != 6}
                    type="text"
                    className="border-2 bg-[#FAFAFA] dark:bg-[#323d4e] dark:border-none outline-none p-1 rounded-lg"
                    value={store.d2}
                    onChange={(e) => setStore({ ...store, d2: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="text-sm flex gap-1 items-center font-medium">State <FaAsterisk className="text-[10px] text-red-800" /></div>
                  <input
                    disabled={store.d4.length != 6}
                    type="text"
                    className="border-2 bg-[#FAFAFA] dark:bg-[#323d4e] dark:border-none outline-none p-1 rounded-lg"
                    value={store.d3}
                    onChange={(e) => setStore({ ...store, d3: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="text-sm flex gap-1 items-center font-medium">GST Number (Optional)</div>
                <input
                  type="text"
                  className="border-2 bg-[#FAFAFA] dark:bg-[#323d4e] dark:border-none outline-none p-1 rounded-lg"
                  value={store.d6}
                  onChange={(e) => setStore({ ...store, d6: e.target.value })}
                />
              </div>
              {/* <div className="flex flex-col gap-1 w-full">
                <div className="text-sm flex gap-1 items-center font-medium">Business Category</div>
                <input
                  type="text"
                  className="border-2 bg-[#FAFAFA] dark:bg-[#323d4e] dark:border-none outline-none p-1 rounded-lg"
                  value={store.d7}
                  onChange={(e) => setStore({ ...store, d7: e.target.value })}
                />
              </div> */}
              <div className="flex flex-col gap-1 w-full">
                <div className="text-sm flex gap-1 items-center font-medium">
                  Enter PAN or Aadhaar Number <FaAsterisk className="text-[10px] text-red-800" />
                </div>
                <input
                  type="text"
                  className="border-2 bg-[#FAFAFA] dark:bg-[#323d4e] dark:border-none outline-none p-1 rounded-lg"
                  value={store.d8}
                  onChange={(e) => setStore({ ...store, d8: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="fileInputagain" >
                  <div className="mb-1  flex items-center gap-1">Upload Document for Verification <FaAsterisk className="text-[10px] text-red-800" /></div>
                  {store.d9 != "" ? (
                    <div className=" flex justify-center items-center">
                      <img
                        src={`${showImage}`}
                        alt="image"
                        className="max-w-[150px]"
                      />
                    </div>
                  ) : (
                    <div className="border-2 pn:max-pp:p-16 p-6 border-dashed dark:border-white rounded-xl flex justify-center items-center">
                      <FaPlus />
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="fileInputagain"
                  className="hidden"
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 mt-2 p-2 w-full">
              <button
                onClick={() => { setCheck(0); dispatch(LoadThis(false)); router.push("/main/store") }}
                className="w-full rounded-lg text-center p-2 dark:text-white dark:border-white text-black border-2"
              >
                Cancel
              </button>
              {

                loading ? <button
                  disabled
                  className="w-full p-2 flex justify-center items-center rounded-lg bg-[#5570F1] text-white"
                >
                  <RiLoader2Line className="text-lg animate-spin text-white" />
                </button> :
                  <button
                    className="w-full p-2 text-center rounded-lg bg-[#5570F1] text-white"
                    onClick={(e) => send(e)}
                  >
                    Submit
                  </button>
              }
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

const MemorizedStore = React.memo(CreateStore)

export default MemorizedStore;
