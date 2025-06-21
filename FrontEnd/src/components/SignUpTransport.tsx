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

function SignUpTransport() {
  const { state, signupCompanyUser } = useAppContext();
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
    gender: "Male",
    typeOfService: "",
    region: "",
    noOfVeicles: "",
    loadingNo: "",
    rate: "",
    availability: "",

  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleSubmit = async () => {
    console.log(form);
    const response = await signupCompanyUser(form);
    if (response) {
      router.push("/login");
    }
  };
  return (
  <div className="w-full flex justify-center py-10">
    <div className="w-full max-w-[600px] border border-gray-300 rounded-xl shadow-md p-8 space-y-6 bg-white">
      {step === 1 && (
        <div className="space-y-5">
          <InputField
            label="Contact First Name"
            placeholder="Contact First Name"
            borderColor="border-[#6C6C6C]"
            onChange={(e) =>
              setForm({ ...form, firstName: e.target.value })
            }
          />
                       <InputField
               label="Last Name"
               placeholder="Last Name"
               borderColor="border-[#6C6C6C] "
               onChange={(e) =>
                 setForm({ ...form, lastName: e.target.value })
               }
             />
             <InputField
               label="Phone Number"
               placeholder="Phone Number"
               borderColor="border-[#6C6C6C] "
               LeftIcon={PiPhoneFill}
               onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
             />
             <InputField
               label="Email"
               placeholder="Email Address"
               borderColor="border-[#6C6C6C] "
               LeftIcon={Email}
               onChange={(e) => setForm({ ...form, email: e.target.value })}
             />
             <InputField
               label="Username"
               placeholder="Username"
               borderColor="border-[#6C6C6C] "
               onChange={(e) => setForm({ ...form, username: e.target.value })}
             />
             <InputField
               label="Password"
               placeholder="Password"
               type="password"
               borderColor="border-[#6C6C6C] "
               onChange={(e) => setForm({ ...form, password: e.target.value })}
             />
            
          <CustomButton title="Next" onClick={nextStep} className="w-full" />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
             
             <select
               className="w-full border border-gray-300 rounded-md p-2"
               value={form.typeOfService}
               onChange={(e) =>
                 setForm({ ...form, typeOfService: e.target.value })
               }
             >
               <option value="">Types of Transport Services</option>
               <option value="bike">Bike</option>
               <option value="van">Van</option>
               <option value="truck">Truck</option>
             </select>
             <InputField
               label="Serving Region"
               placeholder="Region"
               borderColor="border-[#6C6C6C] "
               onChange={(e) => setForm({ ...form, region: e.target.value })}
             />
             <InputField
               label="Number of Vehicles"
               placeholder="Number of Vehicles"
               borderColor="border-[#6C6C6C] "
               onChange={(e) =>
                 setForm({ ...form, noOfVeicles: e.target.value })
               }
             />
             <select
               className="w-full border border-gray-300 rounded-md p-2"
               value={form.loadingNo}
               onChange={(e) =>
                 setForm({ ...form, loadingNo: e.target.value })
               }
             >
               <option value="">Vehicle Max Loading KG</option>
               <option value="500">Up to 500kg</option>
               <option value="1000">Up to 1000kg</option>
             </select>
             <InputField
               label="Rates per KM"
               placeholder="Rate"
               borderColor="border-[#6C6C6C] "
               onChange={(e) => setForm({ ...form, rate: e.target.value })}
             />
             <select
               className="w-full border border-gray-300 rounded-md p-2"
               value={form.availability}
               onChange={(e) =>
                 setForm({ ...form, availability: e.target.value })
               }
             >
               <option value="">Availability Schedule</option>
               <option value="daily">Daily</option>
               <option value="weekly">Weekly</option>
               <option value="monday-friday">Monday - Friday</option>
             </select>
          <div className="flex justify-between gap-4">
            <CustomButton title="Back" onClick={prevStep} className="w-full" />
            <CustomButton title="Next" onClick={nextStep} className="w-full" />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <ul className="text-sm space-y-2">
            <li><strong>Full Name:</strong> {form.firstName}  {form.lastName} </li>
               <li>
                 <strong>Phone:</strong> {form.phoneNumber}
               </li>
               <li>
                 <strong>Email:</strong> {form.email}
               </li>
               <li>
                 <strong>Service Type:</strong> {form.typeOfService}
               </li>
               <li>
                 <strong>Region:</strong> {form.region}
               </li>
               <li>
                 <strong>Vehicles:</strong> {form.noOfVeicles}
               </li>
               <li>
                 <strong>Vehicle Capacity:</strong> {form.loadingNo}
               </li>
               <li>
                 <strong>Rate/Km:</strong> {form.rate}
               </li>
               <li>
                 <strong>Availability:</strong> {form.availability}
               </li>
          </ul>
          <div className="flex justify-between gap-4">
            <CustomButton title="Back" onClick={prevStep} className="w-full" />
            <CustomButton
              title={state.loading ? <Loader /> : "Sign up"}
              onClick={handleSubmit}
              className="w-full font-DmSansRegular rounded-md text-[14px] border w-full"
              bgVariant="secondary"
              textVariant="primary"
            />
          </div>
        </div>
      )}
    </div>
  </div>
);

}

export default SignUpTransport;
