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
    <div className="bills-list">
      <div className="bills-header">
        <h1 className="section-title">Bills</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredBills.length === 0 && searchText?.length > 0 ? (
        <p>No matching bills found.</p>
      ) : (
        <ul className="bills-list-ul">
          {filteredBills.map((bill) => (
            <li key={bill.id} className="bill-list-item">
              <Link href={`bills/${bill.id}`} className="bill-list-link">
                <span className="bill-title-col">{bill.title}</span>
                <span className="bill-meta-col">
                  <span className="bill-status">{bill.status}</span>
                  <span className="bill-house">({bill.house})</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BillsList;