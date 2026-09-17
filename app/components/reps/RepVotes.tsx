"use client";
import { useState, useMemo } from "react";
import { Vote , RepresentativeVoteListProps} from "../../globals";
import Link from "next/link";

const RepresentativeVoteList = ({votedYes, votedNo }: RepresentativeVoteListProps) => {
  const [searchText, setSearchText] = useState("");


  return (
    <div className={"p-3 max-w-2xl mx-auto "}>
        <div>
            <h1 className="text-xl font-semibold mb-2 lg:mb-0">Bill Voted for [ {votedYes.length } ]</h1>
            {votedYes.length === 0 && searchText?.length > 0 ? (
                <p>No votes found.</p>
            ) : (
                <ul className="space-y-2 max-h-[450px] lg:max-h-[550px] overflow-y-scroll">
                {votedYes.map((vote) => (
                    <li key={vote.id} className="border border-slate-500 p-1 lg:p-2 rounded-xl flex justify-between items-center text-sm ">
                    <Link href={`bills/${vote.bill_id}`} className={'cursor-pointer hover:text-[#2cbc63] w-[100%]'}>{vote.title}</Link>
                    </li>
                ))}
                </ul>
            )}
        </div>
        <div>
            <h1 className="text-xl font-semibold mb-2 lg:mb-0">Bills Voted Against [ {votedNo.length} ]</h1>
            {votedNo.length === 0 && searchText?.length > 0 ? (
                <p>No Votes found</p>
            ) : (
                <ul className="space-y-2 max-h-[450px] lg:max-h-[550px] overflow-y-scroll">
                {votedNo.map((vote) => (
                    <li key={vote.id} className="border border-slate-500 p-1 lg:p-2 rounded-xl flex justify-between items-center text-sm ">
                    <Link href={`bills/${vote.bill_id}`} className={'cursor-pointer hover:text-[#2cbc63] w-[100%]'}>{vote.title}</Link>
                    </li>
                ))}
                </ul>
            )}
        </div>


    </div>
  );
};

export default RepresentativeVoteList;
