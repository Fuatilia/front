import Image from 'next/image';
import { Representative, RepresentativeVoteListProps, RepVoteSummary } from "../../globals";
import RepresentativeData from "../../components/reps/RepData";
import RepresentativeBillList from '../../components/reps/BillsSponsored';
import RepresentativeVoteList from '../../components/reps/RepVotes';
import { CACHE_REVALIDATE_SECONDS } from "../../cache";

interface PageProps {
    params: Promise<{ id: string }>;
}


const RepresentativeImage = async ({ rep }: { rep: Representative }) => {
  const params = new URLSearchParams({
    file_type: "image",
  });


  const imageResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/representatives/portal/image/${rep.id}?${params.toString()}`,
    {
      next: { revalidate: CACHE_REVALIDATE_SECONDS },
    }
  );

  let imageSrc: string

  if (!imageResponse.ok) {
    imageSrc = '/images/fakemp.jpeg';

  }else{
    const imageRes = await imageResponse.json();
    imageSrc = imageRes.data
    ? `data:image/jpeg;base64,${imageRes.data}`
    : '/images/fakemp.jpeg';
  };
  
  return (
    <div className="rep-image-section">
      <div className="rep-image-wrapper">
        <Image
          src={imageSrc}
          alt={`${rep.full_name}'s avatar`}
          fill
          sizes="64px"
          className="rep-image"
          unoptimized
        />
      </div>
      <div className="rep-image-info">
        <h1 className="rep-name">{rep.full_name}</h1>
        <span className="rep-role">{rep.position}</span>
      </div>
    </div>
  );

};

async function fetchRepBills(id: string) {
    const params = new URLSearchParams({
      sponsored_by: `${id}`,
      page: '1',
      order_by: "date_introduced" 
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bills/portal?${params.toString()}`, {
        next: { revalidate: CACHE_REVALIDATE_SECONDS },
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/summaries/portal/rep-votes/${id}?${params.toString()}`, {
        next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });
  
    if (!res.ok) {
        throw new Error("Failed to fetch representative vote data")
    };

    const json = await res.json();
    return json.data; 
}

async function fetchRepDetails(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/representatives/portal/${id}`, {
        next: { revalidate: CACHE_REVALIDATE_SECONDS },
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
    return <p className="page-not-found">Representative not found.</p>;
  }

  const sponsoredBills = await fetchRepBills(id)
  const votedsFor = await fetchRepVotes(id,'YES')
  const votedAgainst = await fetchRepVotes(id,'NO')

  

  const repVoteListProps : RepresentativeVoteListProps  = {
    votedYes : votedsFor,
    votedNo : votedAgainst
  }

  return (
    <div className="page-wrapper">
    <RepresentativeImage rep = {rep}/>
    <RepresentativeData rep = {rep}/>
    <RepresentativeBillList  sponsoredBills = {sponsoredBills}/>
    <RepresentativeVoteList {...repVoteListProps}/>
    </div>
   
  );
}
