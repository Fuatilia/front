import BillData from "../../components/bills/BillData";
import BillVotes from "../../components/bills/BillVoteData";
import { Bill } from "../../globals"
import { CACHE_REVALIDATE_SECONDS } from "../../cache";

interface PageProps {
    params: Promise<{ id: string }>;
}


export async function fetchBillDetails(id: string){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bills/portal/${id}`, {
        next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });
  
    if (!res.ok) {
        throw new Error("Failed to fetch bill data")
    };

    const json = await res.json();
    return json.data; 
}

async function fetchSponsor(sponsoredBy?: string) {
  if (!sponsoredBy) {
    return { name: "Unknown Sponsor", found: false };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/representatives/portal/${sponsoredBy}`,
      { next: { revalidate: CACHE_REVALIDATE_SECONDS } }
    );

    if (!res.ok) {
      return { name: sponsoredBy, found: false };
    }

    const data = await res.json();
    const fetchedName = data?.data?.full_name;
    return { name: fetchedName || sponsoredBy, found: !!fetchedName };
  } catch {
    return { name: sponsoredBy, found: false };
  }
}

export default async function BillDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const bill :Bill = await fetchBillDetails(id);

  if (!bill) {
    return <p className="page-not-found">Bill not found.</p>;
  }

  const { name: sponsorName, found: isNameFound } = await fetchSponsor(bill.sponsored_by);

  return (
    <div className="page-wrapper">
    <BillData bill={bill} sponsorName={sponsorName} isNameFound={isNameFound} sponsorLoading={false} />
  
    {bill.final_date_voted ? (
      <BillVotes billId={bill.id} />
    ) : null}
  </div>
   
  );
}