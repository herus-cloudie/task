import Session from "@/utils/session";
import Hero from "../module/hero"
import PriceList from "../module/priceList"
import { redirect } from "next/navigation";

const HomePage = async () => {
  let session = await Session();
  if(!session) return redirect('/sign-in');

  return (
    <section>
      <Hero/>
      <PriceList />
    </section>
  )
}

export default HomePage