import Image from 'next/image';
import { Representative, RepresentativeVoteListProps, RepVoteSummary } from "../../globals";
import RepresentativeData from "../../components/reps/RepData";
import RepresentativeBillList from '../../components/reps/BillsSponsored';
import RepresentativeVoteList from '../../components/reps/RepVotes';

interface PageProps {
    params: Promise<{ id: string }>;
}


const RepresentativeImage = async ({ rep }: { rep: Representative }) => {
  const params = new URLSearchParams({
    file_type: "image",
  });


  const imageResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}representatives/portal/image/${rep.id}?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  let imageSrc: string

  if (!imageResponse.ok) {
    imageSrc = '/images/fakemp.jpeg';

  }else{
    const imageRes = await imageResponse.json();
    imageSrc = imageRes.data
    ? `data:image/jpeg;base64,${imageRes.data}`
    : '/images/fakemp.jpeg'; // Make sure you have a fallback image in your /public/images folder
  };
  

  return (
    <div className={"p-3 max-w-2xl mx-auto"}>
     <div className="relative sm:w-40 sm:h-40 rounded-sm overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm border border-gray-100 justify ">
        <Image
          src={imageSrc}
          alt={`${rep.full_name}'s avatar`}
          fill
          sizes="64px"
          className="object-cover"
          unoptimized // Prevents Next.js from wasting CPU trying to optimize data strings
        />
      </div>
    </div>
  );

};

async function fetchRepBills(id: string) {
    const params = new URLSearchParams({
      sponsored_by: `${id}`,
      page: '1',      
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}bills/portal?${params.toString()}`, {
        cache: 'no-store', 
    });
  

    if (!res.ok) {
        throw new Error("Failed to fetch representative bill data")
    };

    const responseData = await res.json();
    console.log()
    return responseData.data; 
}

async function fetchRepVotes(id: string, vote :string) {
  const params = new URLSearchParams({
    vote: `${vote}`,
  });

    // TODO : Query for Yes votes and No votes
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}votes/portal/rep-summary/${id}?${params.toString()}`, {
        cache: 'no-store', 
    });

  
    if (!res.ok) {
        throw new Error("Failed to fetch representative vote data")
    };

    const json = await res.json();
    return json.data; 
}

async function fetchRepDetails(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}representatives/portal/${id}`, {
        cache: 'no-store', 
    });
  
    if (!res.ok) {
        throw new Error("Failed to fetch representative data")
    };

    const json = await res.json();
    return json.data; 
}

export default async function RepDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const rep :Representative = await fetchRepDetails(id);

  if (!rep) {
    return <p className="p-6">Representative not found.</p>;
  }

  const sponsoredBills = await fetchRepBills(id)
  const votedsFor = await fetchRepVotes(id,'YES')
  const votedAgainst = await fetchRepVotes(id,'NO')

  

  const repVoteListProps : RepresentativeVoteListProps  = {
    votedYes : votedsFor,
    votedNo : votedAgainst
  }

  return (
    <div className="w-full h-full items-start justify-start p-4 lg:p-8">
    <RepresentativeImage rep = {rep}/>
    <RepresentativeData rep = {rep}/>
    <RepresentativeBillList  sponsoredBills = {sponsoredBills}/>
    <RepresentativeVoteList {...repVoteListProps}/>
    </div>
   
  );
}
