import { Button } from "./ui/button";

export default function CurrentJob() {
    return (
      <div>
        <div className="flex justify-between mb-2">
          <h2 className="text-sm font-medium text-gray-800">Current Job</h2>
          <Button variant="ghost" size="view" >
          View
        </Button>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="mb-4">
            <p className="text-gray-500 mb-1 text-xs">On-going</p>
            <p className="font-medium text-xs">Samsung LCD 55 inches Smart TV</p>
          </div>
  
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-gray-200"></div>
  
            {/* Pickup location */}
            <div className="flex mb-6 relative z-10">
              <div className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center bg-white mr-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-xs">Oshodi, Lagos</p>
                <p className="text-xs text-gray-500">Driver - Pickup</p>
              </div>
            </div>
  
            {/* Destination */}
            <div className="flex relative z-10">
              <div className="h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center bg-white mr-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 20C18 16.6863 15.3137 14 12 14C8.68629 14 6 16.6863 6 20"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-xs">Abule Egba, Lagos</p>
                <p className="text-xs text-gray-500">Dropoff - Destination</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  