"use client";
import { Representative, RepresentationSummary } from "../../globals";

const RepresentativeData = ({ rep }: { rep: Representative }) => {
  let repSum: RepresentationSummary = {};
  try {
    repSum = JSON.parse(rep.representation_summary || "{}");
  } catch (error) {
    console.error("Failed to parse representation summary string:", error);
  }

  return (
     <div className="rep-data">
      <div className="rep-info-grid">
        <div className="rep-info-card">
          <span className="rep-info-label">Area of representation</span>
          <span className="rep-info-value">{rep.area_represented}</span>
        </div>
        <div className="rep-info-card">
          <span className="rep-info-label">House</span>
          <span className="rep-info-value">{rep.house}</span>
        </div>
        <div className="rep-info-card">
          <span className="rep-info-label">Phone</span>
          <span className="rep-info-value">{rep.phone_number ?? "N/A"}</span>
        </div>
      </div>

      {rep.current_parliamentary_roles && (
        <p className="rep-info-value" style={{ fontSize: "0.95rem", color: "#374151" }}>
          <strong>Current Parliamentary roles:</strong> {rep.current_parliamentary_roles}
        </p>
      )}

      <div className="rep-roles-section">
        <h3>Previous representative roles</h3>
        {Object.entries(repSum).length > 0 ? (
          <>
            {Object.entries(repSum).map(([years, records]) => (
              <details key={years} className="rep-details-group">  
                  <summary className="rep-details-summary">
                    <span className="rep-details-arrow">
                      ▶
                    </span>
                    <span className="rep-details-year">
                      {years}
                    </span>
                  </summary>

                  <ul className="rep-details-list">
                    {records.map((record, index) => (
                      <li key={index} className="rep-details-record">
                        <span className="rep-bullet">•</span>
                        <span>
                          Party: <span className="rep-party">{record.party}</span>
                        </span>
                      </li>
                    ))}
                  </ul>

              </details>
            ))}
          </>
        ) : (
          <p className="rep-no-data">No previous roles recorded.</p>
        )}
      </div>
    </div>
  );
};

export default RepresentativeData
