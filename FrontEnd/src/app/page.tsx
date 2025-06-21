import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import Choose from "../components/Choose";
import Steps from "../components/Steps";
import Service from "../components/Services";
import RecentDelivery from "../components/RecentDelivery";
import Testimonials from "../components/Testimonials";
import Faqs from "../components/Faqs";
import Footer from "../components/Footer";
import { useAppContext } from "@/context/AppContext";

function Home() {
  return (
    <div>
      <HeroSection />
      <Choose />
      <Steps />
      <RecentDelivery />
      <Testimonials />
      <Service />
      <Faqs />
      <Footer />
    </div>
  );
}

export default Home;
