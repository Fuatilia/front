import Link from "next/link";

const aspirants = [
  { label: "President", path: "/aspirants/president" },
  { label: "Governor", path: "/aspirants/county" },
  { label: "Senator", path: "/aspirants/county" },
  { label: "Woman Rep", path: "/aspirants/county" },
  { label: "MP", path: "/aspirants/mp" },
  { label: "MCA", path: "/aspirants/mca" },
];

export default function AspirantsPage() {
  return (
    <div className="page-wrapper">
      <p className="aspirants-subtitle">
        Select an office to view aspirants and their profiles
      </p>
      <ul className="aspirants-list">
        {aspirants.map((option) => (
          <li key={option.label}>
            <Link href={option.path} className="aspirant-role-card">
              <span className="aspirant-label">{option.label}</span>
              <span className="aspirant-arrow">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}