// Footer.jsx (Server Component)
import React from "react";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import FooterNavLinks from "./FooterNavLinks";
import ButtonsContainer from "./ButtonsContainer";

function Footer() {
  return (
    <div className="bg-[#0E1E3F] text-white flex justify-center px-3 md:px-10 lg:px-[7rem] py-[50px] lg:py-[100px] ">
      <div>
        <CustomText
          variant="smallHero"
          className="text-[23px] md:text-[35px] xl:text-[48px] md:-mt-2 text-center leading-[1.7rem] md:leading-[3rem] lg:leading-[3.5rem]"
        >
          Powering innovation <br className="hidden md:flex"/>
          across industries, Ready to ship with Us?
        </CustomText>
        <CustomText
          variant="textLink"
          className="text-[10px] md:text-[12px] xl:text-[14px] text-white text-center mt-4"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse{" "}
          <br className="hidden md:flex"/>
          varius enim in eros elementum tristique.
        </CustomText>
        
        {/* Client Component for interactive buttons */}
        <ButtonsContainer />
        
        <div className="mt-10 flex justify-center">
          <img src="/images/map.png" alt="map" className="w-[70%] h-[45%] " />
        </div>
        <FooterNavLinks />
        <div className="border-white border-t-[1px] flex flex-col md:flex-row md:gap-5 justify-center items-center">
          <CustomText variant="subtitle" className="leading-[1.6rem] md:my-10 mt-5">
            © 2024 Vubids. All rights reserved.
          </CustomText>
          <div className="flex flex-row gap-5">
            <CustomText
              variant="subtitle"
              className="leading-[1.6rem] md:my-10 underline"
            >
              Privacy Policy{" "}
            </CustomText>
            <CustomText
              variant="subtitle"
              className="leading-[1.6rem] md:my-10 underline"
            >
              Terms of Service{" "}
            </CustomText>
            <CustomText
              variant="subtitle"
              className="leading-[1.6rem] md:my-10 underline"
            >
              Cookies Settings{" "}
            </CustomText>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

