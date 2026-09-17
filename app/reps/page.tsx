import Pagination from "../components/common/Pagination";
import RepsList from "../components/reps/RepsList";
import { PaginationType, Representative } from "../globals";

export async function fetchReps(current_page: number) {
  const params = new URLSearchParams({
    items_per_page: "20",
    page: `${current_page}`,
    order_by: "full_name",
    order_direction: "ASC"
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}representatives/portal?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch reps");
  }

  const response = await res.json();
  return {
    data: response.data,
    pagination: response.meta 
  };
}

export default async function RepsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> | { page?: string };
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt( resolvedSearchParams.page || "1", 10);
  const {
    data: reps,
    pagination,
  }: { data: Representative[]; pagination: PaginationType } = await fetchReps(
    currentPage
  );

  if (!reps || reps.length === 0) {
    return (
        <>
        <p>No representatives found.</p>;
        <Pagination current={pagination.page} total={pagination.page} />
      </>
    );
  }

  return (
    <>
      <RepsList reps={reps} />
      <Pagination current={pagination.page} total={pagination.total_pages} />
    </>
  );
}
