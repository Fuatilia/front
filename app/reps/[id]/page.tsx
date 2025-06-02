import { Representative } from "../../globals";

async function fetchRep(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}representatives/portal/v1/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch rep");
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
  const rep: Representative = await fetchRep(id);

  if (!rep) {
    return <p>No such rep found.</p>;
  }

  return <div>Rep: {rep.full_name}</div>;
}
