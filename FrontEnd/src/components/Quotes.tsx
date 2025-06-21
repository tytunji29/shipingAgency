// import React from "react";
// import QuotesSection from "./QuotesSection";
// import { MOCK_QUOTES } from "../datas/sidebarLinks";
// import { MdOutlineArrowOutward } from "react-icons/md";

// function Quotes() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="md:px-4 py-6">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Quotes</h1>
//             <p className="text-xs  text-gray-500">Total Quotes (15)</p>
//           </div>
//           <button className=" text-gray-400 hover:text-gray-500 flex flex-col justify-end items-end">
//             <div className="bg-[#D8D7E1] h-5 w-5  rounded-full flex items-center justify-center">
//               <MdOutlineArrowOutward className=" text-sm text-black" />
//             </div>
//             <p className="text-xs pt-1 text-gray-500">Today</p>
//           </button>
//         </div>

//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//           <QuotesSection
//             title="Current Quotes"
//             quotes={MOCK_QUOTES}
//             actionType="checkmark"
//             badge="Recent"
//           />
//           <QuotesSection
//             title="Completed Quotes"
//             actionType="checkmark"
//             badge="Completed"
//             quotes={MOCK_QUOTES}
//           />
//           <QuotesSection
//             title="Outbid Auction"
//             quotes={MOCK_QUOTES}
//             actionType="bid"
//             badge="Action needed"
//           />
//           <QuotesSection
//             title="In-Progress Quotes"
//             actionType="checkmark"
//             badge="In-Progress"
//             quotes={MOCK_QUOTES}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Quotes;


import React, { useEffect, useState } from "react";
import QuotesSection from "./QuotesSection";
import { MdOutlineArrowOutward } from "react-icons/md";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import { quoteList } from "@/lib/types"; // make sure the import path is correct



function Quotes() {
  const [quotes, setQuotes] = useState<quoteList[]>([]);
   const { state, fetchQuotes } = useAppContext();
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const loadQuotes = async () => {
    try {
      const result = await fetchQuotes();

      if (!Array.isArray(result)) {
        throw new Error("Invalid quotes data");
      }

      const mapped = result.map((q) => ({
        id: q.id,
        customer: q.customer ?? "N/A",
        from: q.from,
        to: q.to,
        item: q.item,
        status: q.status ?? "pending",
        statuss: q.status === "completed" ? "Delivered" : "In Transit",
      }));

      setQuotes(mapped);
    } catch (error) {
      console.error("Failed to load quotes:", error);
      setQuotes([]); // fallback to empty
    } finally {
      setLoading(false);
    }
  };

  loadQuotes();
}, []);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quotes</h1>
            <p className="text-xs text-gray-500">
              Total Quotes ({quotes.length})
            </p>
          </div>
          <button className="text-gray-400 hover:text-gray-500 flex flex-col justify-end items-end">
            <div className="bg-[#D8D7E1] h-5 w-5 rounded-full flex items-center justify-center">
              <MdOutlineArrowOutward className="text-sm text-black" />
            </div>
            <p className="text-xs pt-1 text-gray-500">Today</p>
          </button>
        </div>

        {loading ? (
          <p>Loading quotes...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <QuotesSection
              title="Current Quotes"
              quotes={quotes}
              actionType="checkmark"
              badge="Recent"
            />
            <QuotesSection
              title="Completed Quotes"
              quotes={quotes.filter((q) => q.status === "completed")}
              actionType="checkmark"
              badge="Completed"
            />
            <QuotesSection
              title="Outbid Auction"
              quotes={quotes.filter((q) => q.status === "outbid")}
              actionType="bid"
              badge="Action needed"
            />
            <QuotesSection
              title="In-Progress Quotes"
              quotes={quotes.filter((q) => q.status === "in-progress")}
              actionType="checkmark"
              badge="In-Progress"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Quotes;
