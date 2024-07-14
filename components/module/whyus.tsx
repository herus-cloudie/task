import Image from "next/image"


const WhyUs = () => {
  return (
    <section className="w-full p-5 flex justify-center items-center" id="whyUs">
        <Image alt="WhyUs" width={1220} height={1220} src={'/img/why-mobile.svg'} className="md:hidden w-[380px] sm:w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1220px]"/>
        <Image alt="WhyUs" width={1220} height={1220} src={'/img/why.svg'} className="hidden md:block w-[380px] sm:w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1220px]"/>
    </section>
  )
}

export default WhyUs