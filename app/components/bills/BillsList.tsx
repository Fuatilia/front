"use client";
import { useState, useMemo } from "react";
import { Bill } from "../../globals";
import Link from "next/link";

const BillsList = ({ bills }: { bills: Bill[] }) => {
  const [searchText, setSearchText] = useState("");

  const filteredBills = useMemo(() => {
    return bills.filter((bill) =>
      bill.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, bills]);

  return (
    <div className={'w-full h-full items-start justify-start p-4 lg:p-8'}>
      <div className="w-full flex flex-col mb-4 lg:flex-row lg:justify-between lg:items-center">
        <h1 className="text-xl font-semibold mb-2 lg:mb-0">Bills</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full lg:w-[400px] border border-slate-300 rounded-xl text-sm py-2 px-4 bg-transparent"
        />
      </div>

      {filteredBills.length === 0 && searchText?.length > 0 ? (
        <p>No matching bills found.</p>
      ) : (
        <ul className="space-y-2 max-h-[500px] lg:max-h-[600px] overflow-y-scroll">
          {filteredBills.map((bill) => (
            <li key={bill.id} className="border border-slate-500 p-1 lg:p-2 rounded-xl flex justify-between items-center text-sm ">
              <Link href={`bills/${bill.id}`} className={'cursor-pointer hover:text-[#2cbc63] w-[60%]'}>{bill.title}</Link>
              <div className="flex flex-col w-[35%] md:w-[20%] lg:w-[15%]">
                <p>{bill.status}</p>
                <p className={'hidden md:flex'}>({bill.house})</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BillsList;
