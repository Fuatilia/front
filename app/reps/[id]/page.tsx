import { Representative } from "../../globals";

export async function fetchRep(id: string) {
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

  return (
    <div className={"w-full h-full flex justify-center items-center"}>
      <div
        className={
          "w-[75%] lg:w-[50%] h-auto border border-slate-200 rounded-md flex-col justify-center items-center p-4"
        }
      >
        <p className="font-semibold underline mb-3 text-center">
          {rep?.full_name}, ({rep.representation_summary.party})
        </p>
        {/* TODO: image of rep will go here */}
        {rep.position_class === "ELECTED" ? (
          <p className={"mb-3 text-sm text-center"}>
            ELECTED as the {rep.position} by the people of{" "}
            {rep.area_represented}{" "}
          </p>
        ) : (
          <p className={"mb-3 text-sm text-center"}>Nominated {rep.position}</p>
        )}
        {rep.current_parliamentary_roles?.length > 0 && (
          <p className={"mb-3 text-sm text-center"}>
            Also serves as the {rep.current_parliamentary_roles}
          </p>
        )}
        {rep.phone_number && (
          <p className={"mb-3 text-sm text-center"}>{rep.phone_number}</p>
        )}
      </div>
    </div>
  );
}
