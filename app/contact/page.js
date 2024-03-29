import React from "react";
import Image from "next/image";
import { BsLinkedin } from "react-icons/bs";
// import Instagram from "../assest/Instagram.svg";
// import Facebook from "../assest/Facebook.svg";
// import Twitter from "../assest/Twitter.svg";
function Body() {
  // const [names, setNames] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [msg, setMsg] = useState("");
  // const [allentry, setAllentry] = useState([]);

  // const submitform = (e) => {
  //   e.preventDefault();
  //   const [newentry, setNewentry] = {
  //     names: names,
  //     email: email,
  //     phone: phone,
  //     msg: msg,
  //   };
  //   setAllentry([...allentry, newentry]);
  //   console.log(allentry);
  //   console.log(names);
  //   console.log(email);
  //   console.log(phone);
  //   setNames("");
  //   setEmail("");
  //   setPhone("");
  //   setMsg("");
  // };

  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center">
          <div className="py-3 px-1"></div>
          <div className="sm:text-3xl text-xl font-bold tracking-wide py-2">
            CONTACT US
          </div>
          <div className="sm:text-xl text-base py-2 text-center font-semibold">
            Let's build something awesome together
          </div>
        </div>
        <div className="flex justify-center h-full items-center scrollbar-hide">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScppKY_9Nhxc4aMz2LjkERIiV4LH6PqKWjTyHhVrTu64ZH3OQ/viewform?embedded=true"
            width="640"
            height="580"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="form"
          >
            Loading…
          </iframe>
        </div>
        <div className="flex flex-col items-center text-center justify-center  py-5">
          <div className="text-lg">Contact</div>
          <div className="flex flex-col gap-1">
            <div>Phone Number: +917310217959</div>
            <div>Email: grovyoinc@gmail.com</div>
            <div>Address: 37A Rampuram ,Shyam Nagar</div>
          </div>
          <div className="flex justify-center space-x-2 my-5">
            {/* <div>
              <Image src={Facebook} alt="facebook" width={35} height={30} />
            </div>
            <div>
              <Image src={Twitter} alt="twitter" width={40} height={35} />
            </div>
            <div>
              <Image src={Instagram} alt="instagram" width={35} height={30} />
            </div> */}
            <a
              aria-label="linkedin"
              href="https://www.linkedin.com/company/grovyo"
            >
              <BsLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
