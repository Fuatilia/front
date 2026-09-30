"use client";

import { useState, useEffect, useMemo } from "react";

export interface VoteItem {
  house: string;
  vote: "YES" | "NO" | "ABSENT";
  count: number;
}

interface VoteApiResponse {
  status: string;
  response_code: string;
  message: string;
  data: VoteItem[];
}

interface BillVotesProps {
  billId?: string; // Optional: If fetching directly inside component
  initialVotes?: VoteItem[]; // Optional: If votes are passed down from parent page
}

export default function BillVotes({ billId, initialVotes }: BillVotesProps) {
  const [votes, setVotes] = useState<VoteItem[]>(initialVotes || []);
  const [isLoading, setIsLoading] = useState<boolean>(!initialVotes && !!billId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip fetching if votes were provided via props or no billId exists
    if (initialVotes || !billId) return;

    let isMounted = true;

    async function fetchVotes() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/summaries/portal/bill-votes/${billId}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error(`Failed to load vote data (Status: ${response.status})`);
        }

        const resData: VoteApiResponse = await response.json();
        
        if (isMounted && resData?.data) {
          setVotes(resData.data);
        }
      } catch (err: any) {
        console.error("Error loading votes:", err);
        if (isMounted) {
          setError("Failed to load vote counts.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchVotes();

    return () => {
      isMounted = false;
    };
  }, [billId, initialVotes]);

  // Aggregate raw votes array by house
  const aggregatedVotes = useMemo(() => {
    const map: Record<string, { yes: number; no: number; absent: number; total: number }> = {};

    votes.forEach((item) => {
      const houseName = item.house.toUpperCase();
      if (!map[houseName]) {
        map[houseName] = { yes: 0, no: 0, absent:0, total: 0 };
      }
      if (item.vote === "YES") map[houseName].yes += item.count;
      if (item.vote === "NO") map[houseName].no += item.count;
      if (item.vote === "ABSENT") map[houseName].absent += item.count;
      map[houseName].total += item.count;
    });

    return map;
  }, [votes]);

  if (isLoading) {
    return (
      <div className="py-4 text-center text-sm text-gray-500">
        Loading voting results...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-3 px-4 rounded bg-red-50 text-red-600 text-sm">
        {error}
      </div>
    );
  }

  if (Object.keys(aggregatedVotes).length === 0) {
    return (
      <div className="py-4 text-center text-sm text-gray-400">
        No voting records found for this bill.
      </div>
    );
  }

  return (
    <div className="p-3 max-w-2xl mx-auto">
      <h3 className="text-lg font-bold text-gray-800">Voting Results</h3>

      <div className="p-3 max-w-2xl mx-auto space-y-6">
        {Object.entries(aggregatedVotes).map(([houseName, totals]) => {
          const yesPercent = totals.total > 0 ? Math.round((totals.yes / totals.total) * 100) : 0;
          const noPercent = totals.total > 0 ? Math.round((totals.no / totals.total) * 100) : 0;
          const absentPercent = totals.total > 0 ? Math.round((totals.no / totals.total) * 100) : 0;

          return (
            <div
              key={houseName}
              className="p-4 border rounded-xl bg-white shadow-sm hover:shadow transition space-y-3"
            >
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold text-sm tracking-wide text-gray-700">
                  {houseName}
                </span>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  Total: {totals.total}
                </span>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-lg">
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    YES
                  </div>
                  <div className="text-xl font-extrabold text-emerald-800">
                    {totals.yes}
                  </div>
                </div>

                <div className="bg-rose-50 border border-rose-100 p-2.5 rounded-lg">
                  <div className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                    NO
                  </div>
                  <div className="text-xl font-extrabold text-rose-800">
                    {totals.no}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-lg">
                  <div className="text-xs font-bold text-black-700 uppercase tracking-wider">
                    ABSENT
                  </div>
                  <div className="text-xl font-extrabold text-rose-800">
                    {totals.absent}
                  </div>
                </div>
              </div>

              {/* Split Bar */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${yesPercent}%` }}
                  className="bg-emerald-500 h-full transition-all duration-300"
                  title={`YES: ${yesPercent}%`}
                />
                <div
                  style={{ width: `${noPercent}%` }}
                  className="bg-rose-500 h-full transition-all duration-300"
                  title={`NO: ${noPercent}%`}
                />
                <div
                  style={{ width: `${absentPercent}%` }}
                  className="bg-gray-500 h-full transition-all duration-300"
                  title={`ABSENT: ${absentPercent}%`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}