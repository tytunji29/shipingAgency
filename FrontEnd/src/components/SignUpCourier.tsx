import React from "react";
import CustomButton from "./CustomButton";
import { redirect, useRouter } from "next/navigation";

const SignUpCourier: React.FC = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/transport-sign-up");

    //redirect to signuptransport
  };

  return (
    <div className="w-[100%] flex flex-col gap-5 items-center">
      <CustomButton
        title="Next"
        onClick={handleSignUp}
        className="font-DmSansRegular rounded-md text-[14px]  border-[1px] w-[100%] "
        bgVariant="secondary"
        textVariant="primary"
      />
    </div>
  );
};

export default SignUpCourier;
