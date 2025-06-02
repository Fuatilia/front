import { Bill } from "../../globals";

async function fetchBill(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}bills/portal/v1/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch bill");
  }

  const response = await res.json();
  return response.data;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bill: Bill = await fetchBill(id);

  if (!bill) {
    return <p>No such bill found.</p>;
  }

  return <div>Bill: {bill.title}</div>;
}
