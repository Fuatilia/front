export default async function Bills() {
    const page=1
    const items_per_page = 10
    const headers = {
        'Authorization': `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json'
    };
    
    const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bills/v1/filter?items_per_page=${items_per_page}&page=${page}`,{
        method: 'GET',
        headers: headers
    })
    const bills = await data.json()
    console.log(bills);
    
    return (
      <ul>
        <p>Bills</p>
      </ul>
    )
}