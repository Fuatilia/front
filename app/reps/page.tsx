import RepsList from "../components/reps/RepsList";
import { Representative } from "../globals";


export async function fetchReps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}representatives/portal/v1/filter`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch reps");
  }

  const response = await res.json();
  return response.data; 
}


export default async function RepsPage() {
  const reps:Representative[] = await fetchReps();

  if (!reps || reps.length === 0) {
    return <p>No representatives found.</p>;
  }

  return (
    <RepsList reps={reps}/>
  );
}
