"use client";
import { useState, useMemo } from "react";
import { Representative } from "../../globals";
import Link from "next/link";

const RepsList = ({ reps }: { reps: Representative[] }) => {
  const [searchText, setSearchText] = useState("");

  const filteredReps = useMemo(() => {
    return reps.filter((rep) =>
      rep.full_name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, reps]);

  return (
    <div className="reps-list">
      <div className="reps-header">
        <h1 className="section-title">Representatives</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredReps.length === 0 && searchText?.length > 0 ? (
        <p>No matching reps found.</p>
      ) : (
<ul className="reps-list-ul">
          {filteredReps.map((rep) => (
              <li key={rep.id} className="rep-list-item">
                <Link href={`reps/${rep.id}`} className="rep-list-link">

                  <div className="rep-title-col">
                    <span className="rep-name-display">{rep.full_name}</span>
                    <span className="rep-area">{rep.area_represented}</span>
                  </div>

                  <div className="rep-meta-col">
                    <span className="rep-position">{rep.position}</span>
                    <span className="rep-position-class">({rep.position_class})</span>
                  </div>

                </Link>
              </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RepsList;
