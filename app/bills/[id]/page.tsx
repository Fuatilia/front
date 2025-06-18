import Link from "next/link";
import { Bill, Representative } from "../../globals";
import { fetchRep } from "../../reps/[id]/page";

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

  const rep: Representative = await fetchRep(bill.sponsored_by);
  const supporting_reps: {
    name: string;
    id: string;
  }[] = [];

  if (bill.supported_by) {
    bill.supported_by.map((id) => {
      fetchRep(id)
        .then((res) => {
          supporting_reps.push({ name: res?.full_name, id: res?.id });
        })
        .catch((err) => {
          throw new Error(
            "An error occurred when fetching supporting reps names"
          );
        });
    });
  }

  return (
    <div className={"w-full h-full flex justify-center items-center"}>
      <div
        className={
          "w-[75%] lg:w-[50%] h-auto border border-slate-200 rounded-md flex-col justify-center items-center p-4"
        }
      >
        <p className="font-semibold underline mb-3 text-center">
          {bill.title} ({bill.bill_no}, {bill.gazette_no})
        </p>
        <p className={"mb-3 text-sm text-center"}>
          Stage: {bill.status} of the {bill.house}
        </p>
        <p className={"mb-3 text-sm text-center"}>{bill.summary}</p>
        <p className={"mb-3 text-sm text-center"}>
          Introduced on {bill.date_introduced} by{" "}
          <Link className={"uppercase"} href={`/reps/${bill.sponsored_by}`}>
            {rep?.full_name}
          </Link>
        </p>
        {bill.final_date_voted && (
          <p className="text-sm text-center">
            Final voting date was on: {bill.final_date_voted}
          </p>
        )}
        {supporting_reps?.length > 0
          ? supporting_reps?.map((rep) => (
              <p className={"mb-3 text-sm text-center"}>
                The bill was supported by the follwing reps:{" "}
                <Link className={"uppercase"} href={`/reps/${rep?.id}`}>
                  {rep?.name}
                </Link>
              </p>
            ))
          : null}
      </div>
    </div>
  );
}
