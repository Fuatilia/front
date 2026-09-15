import BillsList from "../components/bills/BillsList";
import Pagination from "../components/common/Pagination";
import { Bill, PaginationType } from "../globals";

export async function fetchBills(current_page: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}bills/portal?items_per_page=10&page=${current_page}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch bills");
  }

  const response = await res.json();
  return {
    data: response.data,
    pagination: response.meta 
  };
}

export default async function BillsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> | { page?: string };
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt( resolvedSearchParams.page || "1", 10);

  const { data: bills, pagination }: { data: Bill[]; pagination: PaginationType } =
    await fetchBills(currentPage);

  if (!bills || bills.length === 0) {
    return (
      <>
        <p>No bills found.</p>;
        <Pagination current={pagination.page} total={pagination.page} />
      </>
    );
  }

  return (
    <>
      <BillsList bills={bills} />
      <Pagination current={pagination.page} total={pagination.total_pages} />
    </>
  );
}
