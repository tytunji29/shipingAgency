import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import Email from "./Icon/Email";
import CustomButton from "./CustomButton";
import { FaGoogle } from "react-icons/fa";
import CustomText from "./CustomText";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Loader from "./Icon/Loader";

function LoginCourier() {
 const { state, loginUser } = useAppContext();
   const router = useRouter();
   const [form, setForm] = useState({
     email: "",
     password: "",
   });
 const handleLogin = async () => {
    const result = await loginUser(form); // assume it returns user data or null
  if (result) {
    router.push("/dashboard");
  }
  };

  return (
    <div className="w-[100%] flex flex-col gap-5 items-center">
      <div className="w-[100%]">
        <InputField
          label="Email Address"
          LeftIcon={Email}
          placeholder="Email Address"
          borderColor="border-[#6C6C6C] "
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <div className="flex justify-between pt-5">
          <CustomText variant="label">Password *</CustomText>
          <CustomText variant="label" className="underline cursor-pointer">
            Forgot your password?
          </CustomText>
        </div>
        <InputField
          label=""
          placeholder=""
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      
       <CustomButton
              title={state.loading ? <Loader /> : "Login"}
              onClick={handleLogin}
              disabled={state.loading && true}
              className="font-DmSansRegular rounded-md text-[14px]  border-[1px] w-[100%] "
              bgVariant="secondary"
              textVariant="primary"
            />
      <CustomButton
        IconLeft={FaGoogle}
        title="Log in with Google"
        className="font-DmSansRegular font-light rounded-md text-[14px] gap-3 w-[100%] border-black border-[1px] "
      />
    </div>
  );
}

export default LoginCourier;
