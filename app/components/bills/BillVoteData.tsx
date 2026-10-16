"use client";

import { useState, useEffect, useMemo } from "react";
import { CACHE_REVALIDATE_SECONDS } from "../../cache";

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
  billId?: string;
  initialVotes?: VoteItem[];
}

export default function BillVotes({ billId, initialVotes }: BillVotesProps) {
  const [votes, setVotes] = useState<VoteItem[]>(initialVotes || []);
  const [isLoading, setIsLoading] = useState<boolean>(!initialVotes && !!billId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialVotes || !billId) return;

    let isMounted = true;

    async function fetchVotes() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/summaries/portal/bill-votes/${billId}`,
          { next: { revalidate: CACHE_REVALIDATE_SECONDS } }
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
      <div className="vote-loading">
        Loading voting results...
      </div>
    );
  }

  if (error) {
    return (
      <div className="vote-error">
        {error}
      </div>
    );
  }

  if (Object.keys(aggregatedVotes).length === 0) {
    return (
      <div className="vote-empty">
        No voting records found for this bill.
      </div>
    );
  }

  return (
    <div className="vote-container">
      <h3 className="vote-section-title">Voting Results</h3>

      <div className="vote-house-list">
        {Object.entries(aggregatedVotes).map(([houseName, totals]) => {
          const yesPercent = totals.total > 0 ? Math.round((totals.yes / totals.total) * 100) : 0;
          const noPercent = totals.total > 0 ? Math.round((totals.no / totals.total) * 100) : 0;
          const absentPercent = totals.total > 0 ? Math.round((totals.no / totals.total) * 100) : 0;

          return (
            <div
              key={houseName}
              className="vote-house-card"
            >
              <div className="vote-house-header">
                <span className="vote-house-name">
                  {houseName}
                </span>
                <span className="vote-total-badge">
                  Total: {totals.total}
                </span>
              </div>

              <div className="vote-stats-grid">
                <div className="vote-stat-card-yes">
                  <div className="vote-stat-label">
                    YES
                  </div>
                  <div className="vote-stat-value-yes">
                    {totals.yes}
                  </div>
                </div>

                <div className="vote-stat-card-no">
                  <div className="vote-stat-label">
                    NO
                  </div>
                  <div className="vote-stat-value-no">
                    {totals.no}
                  </div>
                </div>

                <div className="vote-stat-card-absent">
                  <div className="vote-stat-label">
                    ABSENT
                  </div>
                  <div className="vote-stat-value-absent">
                    {totals.absent}
                  </div>
                </div>
              </div>

              <div className="vote-bar-container">
                <div
                  style={{ width: `${yesPercent}%` }}
                  className="vote-bar-yes"
                  title={`YES: ${yesPercent}%`}
                />
                <div
                  style={{ width: `${noPercent}%` }}
                  className="vote-bar-no"
                  title={`NO: ${noPercent}%`}
                />
                <div
                  style={{ width: `${absentPercent}%` }}
                  className="vote-bar-absent"
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
