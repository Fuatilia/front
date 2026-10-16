"use client";
import { useState, useMemo } from "react";
import { Vote , RepresentativeVoteListProps} from "../../globals";
import Link from "next/link";

const RepresentativeVoteList = ({votedYes, votedNo }: RepresentativeVoteListProps) => {
  const [searchText, setSearchText] = useState("");


  return (
    <div className="rep-bills-list">
        <div>
            <h1 className="section-title">Bill Voted for [ {votedYes.length } ]</h1>
            {votedYes.length === 0 && searchText?.length > 0 ? (
                <p>No votes found.</p>
            ) : (
                <ul className="rep-list-ul-sponsored">
                {votedYes.map((vote) => (
                    <li key={vote.id} className="rep-list-item-sponsored">
                    <Link href={`bills/${vote.bill_id}`} className="rep-list-link-sponsored">{vote.title}</Link>
                    </li>
                ))}
                </ul>
            )}
        </div>
        <div>
            <h1 className="section-title">Bills Voted Against [ {votedNo.length} ]</h1>
            {votedNo.length === 0 && searchText?.length > 0 ? (
                <p>No Votes found</p>
            ) : (
                <ul className="rep-list-ul-sponsored">
                {votedNo.map((vote) => (
                    <li key={vote.id} className="rep-list-item-sponsored">
                    <Link href={`bills/${vote.bill_id}`} className="rep-list-link-sponsored">{vote.title}</Link>
                    </li>
                ))}
                </ul>
            )}
        </div>


    </div>
  );
};

export default RepresentativeVoteList;
