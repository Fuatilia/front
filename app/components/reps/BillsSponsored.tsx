"use client";
import { useState, useMemo } from "react";
import { Bill } from "../../globals";
import Link from "next/link";

const RepresentativeBillList = ({ sponsoredBills }: { sponsoredBills: Bill[] }) => {
  const [searchText, setSearchText] = useState("");


  return (
    <div className="rep-bills-list">
        <div>
            <h1 className="section-title">Sponsored Bills [ {sponsoredBills.length} ]</h1>
            {sponsoredBills.length === 0 && searchText?.length > 0 ? (
                <p>No sponsored bills found.</p>
            ) : (
                <ul className="rep-list-ul-sponsored">
                {sponsoredBills.map((bill) => (
                    <li key={bill.id} className="rep-list-item-sponsored">
                    <Link href={`/bills/${bill.id}`} className="rep-list-link-sponsored">{bill.title}</Link>
                    </li>
                ))}
                </ul>
            )}
        </div>
    </div>
  );
};

export default RepresentativeBillList;
