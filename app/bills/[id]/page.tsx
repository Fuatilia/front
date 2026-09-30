import BillData from "../../components/bills/BillData";
import BillVotes from "../../components/bills/BillVoteData";
import { Bill } from "../../globals"


interface PageProps {
    params: Promise<{ id: string }>;
}


export async function fetchBillDetails(id: string){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bills/portal/${id}`, {
        cache: 'no-store', 
    });
  
    if (!res.ok) {
        throw new Error("Failed to fetch representative data")
    };

    const json = await res.json();
    return json.data; 
}


export default async function BillDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const bill :Bill = await fetchBillDetails(id);

  if (!bill) {
    return <p className="p-6">Bill not found.</p>;
  }

  return (
    <div className="w-full h-full items-start justify-start p-4 lg:p-8">
    <BillData bill={bill} />
  
    {/* Only render BillVotes if final_date_voted exists */}
    {bill.final_date_voted ? (
      <BillVotes billId={bill.id} />
    ) : null}
  </div>
   
  );
}




