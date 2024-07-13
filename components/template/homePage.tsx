import Session from "@/utils/session";
import Hero from "../module/hero"
import PriceList from "../module/priceList"
import { redirect } from "next/navigation";
import WhyUs from "../module/whyus";
import Footer from "../module/footer";
import CalculatorSection from "../module/calculatorSection";

const HomePage = async () => {
  let session = await Session();
  if(!session) return redirect('/sign-in');
  
  return (
    <section>
      <Hero/>
      <WhyUs />
      <PriceList/>
      <CalculatorSection/>
      <Footer />
    </section>
  )
}

export default HomePage