"use client"

import { useFetchAuth } from "../../hooks/useFetchAuth";

export default async function Bills() {
    const page=1
    const items_per_page = 10

    const { data: bills, isLoading, error } = useFetchAuth({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/bills/v1/filter?items_per_page=${items_per_page}&page=${page}`,
      queryKey: ['bills'],
      // select: (res) => res.products, 
    });
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading bills</p>;

    console.log(bills, error, isLoading);
    
    return (
      <ul>
        <p>Bills</p>
      </ul>
    )
}