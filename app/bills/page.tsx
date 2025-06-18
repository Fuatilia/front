import BillsList from "../components/bills/BillsList";
import Pagination from "../components/common/Pagination";
import { Bill, PaginationType } from "../globals";

export async function fetchBills(current_page: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}bills/portal/v1/filter?items_per_page=10&page=${current_page}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch bills");
  }

  const response = await res.json();
  return response;
}

export default async function BillsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1", 10);

  const { data: bills, pagination }: { data: Bill[]; pagination: PaginationType } =
    await fetchBills(currentPage);

  if (!bills || bills.length === 0) {
    return <p>No bills found.</p>;
  }

  return (
    <>
      <BillsList bills={bills} />
      <Pagination current={pagination.page} total={pagination.total_pages} />
    </>
  );
}
