import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { Textarea } from "./ui/textarea";
import FileUploadField from "./FileUploadField";

interface StepThreeProps {
  formData: any;
  setFormData: (value: any) => void;
  handleNext: () => void;
}
function StepThree({ formData, setFormData, handleNext }: StepThreeProps) {
  return (
    <div>
      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Upload photo of item
          </label>
          <FileUploadField
            accept="image/jpeg,image/png"
            maxSize={2 * 1024 * 1024} // 2MB
            onUpload={(file) =>
              setFormData((prev: { itemsRequest: any }) => ({
                ...formData,
                itemsRequest: {
                  ...prev.itemsRequest,
                  imageUrl: `file`,
                },
              }))
            }
          />
          {/* <div className="border rounded-lg p-6 flex flex-col items-center justify-center">
            <div className="mb-2 bg-gray-50 rounded-full p-2">
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-sm font-medium">
              Click to upload{" "}
              <span className="text-gray-400">or drag and drop</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG or JPEG (max. 2mb)
            </p>
            <input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={() => setUploadedFile("IMG2025150234.JPG")}
            />
            <label htmlFor="file-upload" className="cursor-pointer mt-4 w-full">
              <Button variant="outline" className="w-full">
                Select File
              </Button>
            </label>
          </div> */}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Instruction for transport provider
          </label>
          <Textarea
            placeholder="Type your message here"
            className="min-h-[100px]"
            value={formData.instructions}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData((prev: { itemsRequest: any }) => ({
                ...formData,
                itemsRequest: {
                  ...prev.itemsRequest,
                  instructions: e.target.value,
                },
              }))
            }
          />
        </div>
        <Button onClick={handleNext} className="w-full bg-[#0E1E3F] text-white">
          Next
        </Button>
      </div>
    </div>
  );
}
export default StepThree;
