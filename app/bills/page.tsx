import { Suspense } from "react"
import Bills from "../components/bills/Bills"

const index = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Bills/>
    </Suspense>
  )
}

export default index