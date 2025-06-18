import Pagination from "../components/common/Pagination";
import RepsList from "../components/reps/RepsList";
import { PaginationType, Representative } from "../globals";

export async function fetchReps(current_page: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}representatives/portal/v1/filter?items_per_page=10&page=${current_page}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch reps");
  }

  const response = await res.json();
  return response;
}

export default async function RepsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const {
    data: reps,
    pagination,
  }: { data: Representative[]; pagination: PaginationType } = await fetchReps(
    currentPage
  );

  if (!reps || reps.length === 0) {
    return <p>No representatives found.</p>;
  }

  return (
    <>
      <RepsList reps={reps} />
      <Pagination current={pagination.page} total={pagination.total_pages} />
    </>
  );
}
