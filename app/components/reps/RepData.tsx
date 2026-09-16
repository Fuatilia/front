"use client";
import { useState, useMemo } from "react";
import { Representative, RepresentationSummary } from "../../globals";

const RepresentativeData = ({ rep }: { rep: Representative }) => {
  const [searchText, setSearchText] = useState("");

  let repSum: RepresentationSummary = {};
  try {
    repSum = JSON.parse(rep.representation_summary || "{}");
  } catch (error) {
    console.error("Failed to parse representation summary string:", error);
  }

  return (
     <div className={"p-3 max-w-2xl mx-auto"}>
      <h1 className="text-2xl font-bold">{rep.full_name}</h1>
      <p className="text-custom-detail-keys">Seat : {" "}
              <span className="text-custom-detail-values">
                {rep.position} - {rep.area_represented}
              </span>
            </p>
      <p className="text-custom-detail-keys">House: {" "}
              <span className="text-custom-detail-values">
                {rep.house}
              </span>
            </p>
      <p className="text-custom-detail-keys">Public Phone No: {" "}
              <span className="text-custom-detail-values">
                {rep.phone_number}  
              </span>
            </p>
      <p className="text-custom-detail-keys">Current Parliamentary roles: {rep.current_parliamentary_roles}</p>
      <div>
        <p className="text-custom-detail-keys">Previous representative roles</p>
        {Object.entries(repSum).map(([years, records]) => (

          <details key={years} className="group py-1 [&_summary::-webkit-details-marker]:hidden">  
              {/* Year-Range (Tabbed in slightly from header) */}
              <summary className="flex items-center gap-2 cursor-pointer list-none py-1 pl-4 text-gray-700 hover:text-gray-900 transition-colors">
                <span className="text-[10px] text-gray-600 transition-transform group-open:rotate-90">
                  ▶
                </span>
                <span className="font-medium text-gray-500">{years}</span>
              </summary>

              {/* Rep Records (Tabbed heavily inwards) */}
              <ul className="mt-1 pl-12 space-y-1 list-none text-gray-600">
                {records.map((record, index) => (
                  <li key={index} className="text-xs flex items-center gap-2">
                    <span className="text-gray-400">•</span>
                    <span>
                      Party: <span className="font-semibold text-gray-800">{record.party}</span>
                    </span>
                  </li>
                ))}
              </ul>

          </details>
        ))}

      </div>
    </div>
  );
};


export default RepresentativeData