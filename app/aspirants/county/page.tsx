import Link from "next/link";

const counties = [
  { name: "Baringo", number: "030" },
  { name: "Bomet", number: "036" },
  { name: "Bungoma", number: "039" },
  { name: "Busia", number: "040" },
  { name: "Elgeyo/Marakwet", number: "028" },
  { name: "Embu", number: "014" },
  { name: "Garissa", number: "007" },
  { name: "Homa Bay", number: "043" },
  { name: "Isiolo", number: "011" },
  { name: "Kajiado", number: "034" },
  { name: "Kakamega", number: "037" },
  { name: "Kericho", number: "035" },
  { name: "Kiambu", number: "022" },
  { name: "Kilifi", number: "003" },
  { name: "Kirinyaga", number: "020" },
  { name: "Kisii", number: "045" },
  { name: "Kisumu", number: "042" },
  { name: "Kitui", number: "015" },
  { name: "Kwale", number: "002" },
  { name: "Laikipia", number: "031" },
  { name: "Lamu", number: "005" },
  { name: "Machakos", number: "016" },
  { name: "Makueni", number: "017" },
  { name: "Mandera", number: "009" },
  { name: "Marsabit", number: "010" },
  { name: "Meru", number: "012" },
  { name: "Migori", number: "044" },
  { name: "Mombasa", number: "001" },
  { name: "Murang'a", number: "021" },
  { name: "Nairobi City", number: "047" },
  { name: "Nakuru", number: "032" },
  { name: "Nandi", number: "029" },
  { name: "Narok", number: "033" },
  { name: "Nyamira", number: "046" },
  { name: "Nyandarua", number: "018" },
  { name: "Nyeri", number: "019" },
  { name: "Samburu", number: "025" },
  { name: "Siaya", number: "041" },
  { name: "Taita/Taveta", number: "006" },
  { name: "Tana River", number: "004" },
  { name: "Tharaka-Nithi", number: "013" },
  { name: "Trans Nzoia", number: "026" },
  { name: "Uasin Gishu", number: "027" },
  { name: "Vihiga", number: "038" },
  { name: "Wajir", number: "008" },
  { name: "West Pokot", number: "024" },
];

export default function CountyListPage() {
  return (
    <div className="page-wrapper">
      <p className="aspirants-subtitle">
        Choose a county to view aspirants
      </p>
      <div className="counties-grid">
        {counties.map((county) => (
          <Link
            key={county.name}
            href={`/aspirants/county/${encodeURIComponent(county.name)}`}
            className="county-card"
          >
            {county.name}
            <span className="county-number">{county.number}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
