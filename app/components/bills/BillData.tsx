"use client";
import {Bill } from "../../globals";
import Link from "next/link";
import FormatDate from "../../providers/DateFormatter";

interface BillDataProps {
  bill: Bill;
  sponsorName?: string;
  isNameFound?: boolean;
  sponsorLoading?: boolean;
}

const BillData = ({ bill, sponsorName = "", isNameFound = false, sponsorLoading = false }: BillDataProps) => {
  const supporters = bill.supported_by?.length
    ? bill.supported_by.join(", ")
    : "None";

  const topics = bill.topics_in_the_bill?.length
    ? bill.topics_in_the_bill.join(", ")
    : "N/A";

  const renderSponsor = () => {
    if (sponsorLoading) {
      return <span>Loading...</span>;
    }

    if (isNameFound) {
      return (
        <Link
          href={`/reps/${bill.sponsored_by}`}
          className="sponsor-link"
        >
          {sponsorName}
        </Link>
      );
    }

    return <span>NotFound</span>;
  };

  return (
    <div className="bill-data">
          <h1 className="bill-title">{bill.title}</h1>

          <p className="text-custom-detail-keys">
              Sponsored By:{" "}
              <span className="text-custom-detail-values">
                  {renderSponsor()}
              </span>
          </p>
          <p className="text-custom-detail-keys">
              Co-supported By:{" "}
              <span className="text-custom-detail-values">
                  {supporters}
              </span>
          </p>

          <p className="text-custom-detail-keys">Topics in bill:{" "}
              <span className="text-custom-detail-values">
                  {topics}
              </span>
          </p>
          <p className="text-custom-detail-keys">Bill No.:{" "}
              <span className="text-custom-detail-values">
                  {bill.bill_no}</span></p>
            <p className="text-custom-detail-keys">Date Introduced:{" "}
              <span className="text-custom-detail-values">
                  {FormatDate(bill.date_introduced)}
              </span>
          </p><p className="text-custom-detail-keys">Gazzette No.:{" "}
              <span className="text-custom-detail-values">
                  {bill.gazette_no}
              </span>
          </p><p className="text-custom-detail-keys">House:{" "}
              <span className="text-custom-detail-values">
                  {bill.house}
              </span>
          </p><p className="text-custom-detail-keys">Staus:{" "}
              <span className="text-custom-detail-values">
                  {bill.status}
              </span>
          </p><p className="text-custom-detail-keys">Final Date Voted:{" "}
              <span className="text-custom-detail-values">
                  {FormatDate(bill.final_date_voted)}
              </span>
          </p><p className="text-custom-detail-keys">
              Summary: {" "}
              <span className="text-custom-detail-values">
                {bill.summary ?? "No summary provided."}
                </span>
          </p>
    </div>
  );
};

export default BillData;