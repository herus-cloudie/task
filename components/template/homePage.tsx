import Session from "@/utils/session";
import Hero from "../module/hero"
import PriceList from "../module/priceList"
import { redirect } from "next/navigation";
import WhyUs from "../module/whyus";
import Footer from "../module/footer";
import Calculator from "../module/calculator";

const HomePage = async () => {
  let session = await Session();
  if(!session) return redirect('/sign-in');

  return (
    <section>
      <Hero/>
      <WhyUs />
      <PriceList />
      <Calculator />
      <Footer />
    </section>
  )
}

export default HomePage