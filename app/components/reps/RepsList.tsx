"use client";
import { useState, useMemo } from "react";
import { Representative } from "../../globals";
import Link from "next/link";

const RepsList = ({ reps }: { reps: Representative[] }) => {
  const [searchText, setSearchText] = useState("");

  const filteredReps = useMemo(() => {
    return reps.filter((rep) =>
      rep.full_name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, reps]);

  return (
    <div className={"w-full h-full items-start justify-start p-4 lg:p-8"}>
      <div className="w-full flex flex-col mb-4 lg:flex-row lg:justify-between lg:items-center">
        <h1 className="text-xl font-semibold mb-2 lg:mb-0">Representatives</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full lg:w-[400px] border border-slate-300 rounded-xl text-sm py-2 px-4 bg-transparent"
        />
      </div>

      {filteredReps.length === 0 && searchText?.length > 0 ? (
        <p>No matching reps found.</p>
      ) : (
        <ul className="space-y-2 max-h-[500px] lg:max-h-[600px] overflow-y-scroll">
          {filteredReps.map((rep) => (
            <li
              key={rep.id}
              className="border border-slate-500 p-1 lg:p-2 rounded-xl flex justify-between items-center text-sm "
            >
              <Link
                href={`bills/${rep.id}`}
                className={"cursor-pointer hover:text-[#2cbc63] w-[60%]"}
              >
                {rep.full_name} - {rep.area_represented}
              </Link>
              <div className="flex flex-col w-[32%] md:w-[20%] lg:w-[15%]">
                <p>{rep.position}</p>
                <p>({rep.position_class})</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RepsList;
