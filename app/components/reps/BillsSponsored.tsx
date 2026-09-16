"use client";
import { useState, useMemo } from "react";
import { Bill } from "../../globals";
import Link from "next/link";

const RepresentativeBillList = ({ sponsoredBills }: { sponsoredBills: Bill[] }) => {
  const [searchText, setSearchText] = useState("");


  return (
    <div className={"p-3 max-w-2xl mx-auto "}>
        <div>
            <h1 className="text-xl font-semibold mb-2 lg:mb-0">Sponsored Bills [ {sponsoredBills.length} ]</h1>
            {sponsoredBills.length === 0 && searchText?.length > 0 ? (
                <p>No sponsored bills found.</p>
            ) : (
                <ul className="space-y-2 max-h-[450px] lg:max-h-[550px] overflow-y-scroll">
                {sponsoredBills.map((bill) => (
                    <li key={bill.id} className="border border-slate-500 p-1 lg:p-2 rounded-xl flex justify-between items-center text-sm ">
                    <Link href={`/bills/${bill.id}`} className={'cursor-pointer hover:text-[#2cbc63] w-[100%]'}>{bill.title}</Link>
                    </li>
                ))}
                </ul>
            )}
        </div>
    </div>
  );
};

export default RepresentativeBillList;
