import React, { useState, useRef } from "react";
import { Upload } from "lucide-react";

interface FileUploadFieldProps {
  label?: string;
  onUpload?: (file: File) => void;
  accept?: string;
  maxSize?: number;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  onUpload,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const handleFileSelect = () => {
    console.log("File select button clicked!");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      return;
    }
    const file = files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      // const reader = new FileReader();
      // console.log(reader);
      // console.log(EventSource.targe);
      // reader.onload = (e) => {
      //   const imageData = e.target.result;
      //   console.log("imageData: ", imageData);

      //   const dataURL = `data:image/jpeg;base64,${btoa(imageData)}`;
      //   console.log("dataURL: ", dataURL);

      //   console.log(dataURL);
      // };
      // reader.readAsBinaryString(selectedFile);
    }
    //  if (file) {
    //    console.log(file);
    //    setFileName(file.name);

    //    // Create URL for the file
    //    const fileUrl = URL.createObjectURL(file);
    //    conso

    //    if (onUpload) {
    //      onUpload(file, fileUrl); // Pass both file and URL
    //    }
    //  }
  };

  return (
    <div className="flex flex-row text-[#898989] h-[191px] border-[#000] mt-2 justify-center items-center  bg-netural-100 rounded-md border">
      <div
        className="w-full flex flex-col items-center"
        onClick={handleFileSelect}
      >
        <Upload />
        <label className="text-xs my-2 block ">
          <span className="text-black font-semibold">Click to upload </span>or
          drag and drop
        </label>
        {/* {label && <label className="text-xs my-2 block ">{label}</label>} */}
        <p className="text-xs mb-2">PNG, JPG or JPEG (max. 2mb)</p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept={accept}
        />

        {/* <button
          type="button"
          className="bg-white text-black border-[1px] font-DmSansRegular border-black px-6 text-xs py-2 rounded hover:bg-black hover:text-white"
        >
          Choose File
        </button> */}

        {fileName && <p className="mt-2 text-sm">Selected file: {fileName}</p>}
      </div>
    </div>
  );
};

export default FileUploadField;
