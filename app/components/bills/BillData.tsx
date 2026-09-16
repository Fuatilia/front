"use client";
import { useState, useMemo, useEffect } from "react";
import {Bill } from "../../globals";
import Link from "next/link";
import FormatDate from "../../providers/DateFormatter";


const BillData = ({ bill }: { bill: Bill }) => {
  const [sponsorName, setSponsorName] = useState<string>("");
  const [isNameFound, setIsNameFound] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchSponsor() {
      if (!bill.sponsored_by) {
        if (isMounted) {
          setSponsorName("Unknown Sponsor");
          setIsNameFound(false);
          setIsLoading(false);
        }
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}representatives/portal/${bill.sponsored_by}`, {
            cache: 'no-store', 
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const fetchedName = data?.data?.full_name;

        if (isMounted) {
          if (fetchedName) {
            setSponsorName(fetchedName);
            setIsNameFound(true);
          } else {
            setSponsorName(bill.sponsored_by);
            setIsNameFound(false);
          }
        }
      } catch (error) {
        console.error("Failed to fetch sponsor details:", error);
        if (isMounted) {
          setSponsorName(bill.sponsored_by || "Sponsor not found");
          setIsNameFound(false);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchSponsor();

    return () => {
      isMounted = false;
    };
  }, [bill.sponsored_by]);

  const supporters = bill.supported_by?.length
    ? bill.supported_by.join(", ")
    : "None";

  const topics = bill.topics_in_the_bill?.length
    ? bill.topics_in_the_bill.join(", ")
    : "N/A";

  const renderSponsor = () => {
    if (isLoading) {
      return <span>Loading...</span>;
    }

    if (isNameFound) {
      return (
        <Link
          href={`/reps/${bill.sponsored_by}`}
          className="text-blue-600 hover:underline font-medium"
        >
          {sponsorName}
        </Link>
      );
    }

    return <span>NotFound</span>;
  };

  return (
    <div className="p-3 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold">{bill.title}</h1>

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