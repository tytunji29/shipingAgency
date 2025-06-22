// Fully revamped SignUpTransport component with 4 steps, SweetAlert, and loader

import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import Email from "./Icon/Email";
import CustomButton from "./CustomButton";
import { PiPhoneFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Loader from "./Icon/Loader";
import { APIURL } from "@/context/Actions";
import { Home } from "lucide-react";
import Swal from "sweetalert2";

function SignUpTransport() {
  const { state } = useAppContext();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [regionStates, setRegionStates] = useState<any[]>([]);
  const [regionLgas, setRegionLgas] = useState<any[]>([]);
  const [regionvehicleTypeId, setvehicleTypeId] = useState<any[]>([]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    gender: "",
    vehicleTypeId: "",
    regionState: "",
    regionLgaId: "",
    plateNumber: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    dateOfBirth: "",
    address: "",
    photo: null,
    nationalIdentityNumber: null,
    driverLicenseImage: null,
  });

  const fetchvehicleTypeId = async () => {
    const res = await fetch(`${APIURL}/GeneralSetup/get-all-vehicletypes`);
    const data = await res.json();
    setvehicleTypeId(data.data);
  };

  const fetchStates = async () => {
    const res = await fetch(`${APIURL}/GeneralSetup/get-all-region-state`);
    const data = await res.json();
    setRegionStates(data.data);
  };

  const fetchLgas = async (stateId: string) => {
    const res = await fetch(`${APIURL}/GeneralSetup/get-all-region-lga/${stateId}`);
    const data = await res.json();
    setRegionLgas(data.data);
  };

  useEffect(() => {
    fetchStates();
    fetchvehicleTypeId();
  }, []);

  useEffect(() => {
    if (form.regionState) fetchLgas(form.regionState);
  }, [form.regionState]);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setForm({ ...form, [field]: e.target.files?.[0] || null });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
        formData.append(pascalKey, value);
      }
    });

    try {
      const response = await fetch(`${APIURL}/Auth/agent-signUp`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok && result.status) {
        Swal.fire({
          icon: "success",
          title: "Registration Submitted",
          text: "Awaiting admin review. Kindly check your email.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => router.push("/login"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message || "Registration failed",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-[600px] border border-gray-300 rounded-xl shadow-md p-8 space-y-6 bg-white">
        <h2 className="text-xl font-semibold text-center">
          {step === 1 && "Step 1: Basic Info"}
          {step === 2 && "Step 2: Address & Region"}
          {step === 3 && "Step 3: Vehicle & Bank Info"}
          {step === 4 && "Step 4: Review & Submit"}
        </h2>

        {step === 1 && (
          <div className="space-y-5">
            <InputField label="First Name" placeholder="First Name" onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
            <InputField label="Last Name" placeholder="Last Name" onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            <InputField label="Phone Number" placeholder="Phone Number" LeftIcon={PiPhoneFill} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
            <InputField label="Email" placeholder="Email" LeftIcon={Email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <InputField label="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <CustomButton title="Next" onClick={handleNext} className="w-full" />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <InputField label="Address" placeholder="House Address" LeftIcon={Home} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <select className="w-full border border-gray-300 rounded-md p-2" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unListed">UnListed</option>
            </select>
            <select className="w-full border border-gray-300 rounded-md p-2" value={form.regionState} onChange={(e) => setForm({ ...form, regionState: e.target.value })}>
              <option value="">Select State</option>
              {regionStates.map((state) => <option key={state.id} value={state.id}>{state.name}</option>)}
            </select>
            <select className="w-full border border-gray-300 rounded-md p-2" value={form.regionLgaId} onChange={(e) => setForm({ ...form, regionLgaId: e.target.value })}>
              <option value="">Select LGA</option>
              {regionLgas.map((lga) => <option key={lga.id} value={lga.id}>{lga.name}</option>)}
            </select>
            <InputField label="Date of Birth" type="date" onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} />
            <div className="flex justify-between gap-4">
              <CustomButton title="Back" onClick={handlePrev} className="w-full" />
              <CustomButton title="Next" onClick={handleNext} className="w-full" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <select className="w-full border border-gray-300 rounded-md p-2" value={form.vehicleTypeId} onChange={(e) => setForm({ ...form, vehicleTypeId: e.target.value })}>
              <option value="">Transport Service Type</option>
              {regionvehicleTypeId.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
            <InputField label="Plate Number" placeholder="Plate Number" onChange={(e) => setForm({ ...form, plateNumber: e.target.value })} />
            <InputField label="Account Name" placeholder="Account Name" onChange={(e) => setForm({ ...form, accountName: e.target.value })} />
            <InputField label="Account Number" placeholder="Account Number" onChange={(e) => setForm({ ...form, accountNumber: e.target.value })} />
            <InputField label="Bank Name" placeholder="Bank Name" onChange={(e) => setForm({ ...form, bankName: e.target.value })} />
            <InputField label="Upload Photo" type="file" onChange={(e) => handleFileChange(e, "photo")} />
            <InputField label="Upload National ID" type="file" onChange={(e) => handleFileChange(e, "nationalIdentityNumber")} />
            <InputField label="Upload Driver License" type="file" onChange={(e) => handleFileChange(e, "driverLicenseImage")} />
            <div className="flex justify-between gap-4">
              <CustomButton title="Back" onClick={handlePrev} className="w-full" />
              <CustomButton title="Next" onClick={handleNext} className="w-full" />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <ul className="text-sm space-y-2">
              <li><strong>Full Name:</strong> {form.firstName} {form.lastName}</li>
              <li><strong>Phone:</strong> {form.phoneNumber}</li>
              <li><strong>Email:</strong> {form.email}</li>
              <li><strong>Service Type:</strong> {regionvehicleTypeId.find((s) => s.id.toString() === form.vehicleTypeId)?.name}</li>
              <li><strong>State:</strong> {regionStates.find((s) => s.id.toString() === form.regionState)?.name}</li>
              <li><strong>LGA:</strong> {regionLgas.find((lga) => lga.id.toString() === form.regionLgaId)?.name}</li>
              <li><strong>Plate Number:</strong> {form.plateNumber}</li>
              <li><strong>Bank:</strong> {form.bankName}</li>
              <li><strong>Account:</strong> {form.accountNumber} ({form.accountName})</li>
            </ul>
            <div className="flex justify-between gap-4">
              <CustomButton title="Back" onClick={handlePrev} className="w-full" />
              <CustomButton
                title={loading ? <Loader /> : "Sign up"}
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
