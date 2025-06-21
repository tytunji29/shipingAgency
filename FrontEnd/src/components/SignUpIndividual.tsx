import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import Email from "./Icon/Email";
import CustomButton from "./CustomButton";
import { FaGoogle } from "react-icons/fa";
import CustomText from "./CustomText";
import { FaLocationDot } from "react-icons/fa6";
import { PiPhoneFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Loader from "./Icon/Loader";

function SignUpIndividual() {
  const { state, signupUser } = useAppContext();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    gender: "",
  });

  const router = useRouter();

  const handleSignUp = async () => {
    const onSignup = await signupUser(form);
    //perform extra type validation for onSignup value
    if (onSignup) {
      router.push("/login");
    }
  };
  useEffect(() => {}, [state]);
  return (
    <div className="w-[100%] flex flex-col gap-5 items-center">
      <div className="w-[100%] space-y-5">
        <InputField
          label="First Name"
          placeholder="First Name"
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <InputField
          label="Last Name"
          placeholder="Last Name"
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <InputField
          label="Email Address"
          LeftIcon={Email}
          placeholder="Email Address"
          borderColor="border-[#6C6C6C] "
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {/* <InputField
          label="Address"
          LeftIcon={FaLocationDot}
          placeholder="Street, City, Town, State"
          borderColor="border-[#6C6C6C] "
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        /> */}
        <InputField
          label="Phone Number"
          LeftIcon={PiPhoneFill}
          placeholder="Number"
          borderColor="border-[#6C6C6C] "
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
        />
        <InputField
          label="Password*"
          placeholder="Password"
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <InputField
          label="Gender"
          placeholder="Gender"
          borderColor="border-[#6C6C6C] "
          placeholderColor=""
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        />
      </div>
      <CustomButton
        title={state.loading ? <Loader /> : "Sign up"}
        onClick={handleSignUp}
        className="font-DmSansRegular rounded-md text-[14px]  border-[1px] w-[100%]  "
        bgVariant="secondary"
        textVariant="primary"
      />
      <div className=" border-t-[1px] border-black w-[100%] my-2"></div>
      <CustomButton
        IconLeft={FaGoogle}
        title="Sign up with Google"
        onClick={handleSignUp}
        className="font-DmSansRegular font-light rounded-md text-[14px] gap-3 w-[100%] border-black border-[1px] "
      />
    </div>
  );
}

export default SignUpIndividual;
