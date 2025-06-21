import React from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'

function QuotesSearch() {
    return (
        <div className="flex items-center justify-between gap-4 w-full p-4 bg-white">
          <h1 className="text-2xl font-bold text-gray-900">Quotes History</h1>
          
          <div className="flex items-center gap-4 flex-1 max-w-md ml-auto">
            <div className="relative flex-1 ">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 bg-[#F9F9F9] pr-4 py-2 rounded-lg   focus:outline-none focus:ring-1 focus:ring-gray-200 text-xs"
              />
            </div>
            
            <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F9F9F9]  text-xs   font-medium hover:bg-gray-50">
              <SlidersHorizontal className="h-3 w-3" />
              Filters
            </button>
            <div className='hidden md:flex'>
                <p className='text-xs'>Showing 1-50 of 500</p>
            </div>
          </div>
        </div>
      )
    }
    

export default QuotesSearch
