import { Bill } from "../../globals";
import BillsList from "./BillsList";

export async function fetchBills() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}bills/portal/v1/filter`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch bills");
  }

  const response = await res.json();
  return response.data; 
}


export default async function BillsPage() {
  const bills:Bill[] = await fetchBills();

  if (!bills || bills.length === 0) {
    return <p>No bills found.</p>;
  }

  return (
    <BillsList bills={bills} />
  );
}
