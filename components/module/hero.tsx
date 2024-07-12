import Image from "next/image"
import Header from "./header"
import Session from "@/utils/session"

const Hero = async  ()=> {
  const session = await Session();
  return (
    <div className="bg-blue-1 xl:h-[822px] lg:h-[722px] h-[600px] flex justify-center">
        <Header session={session}/>
        <Image style={{filter : 'invert(1)'}} width={800} height={820} alt="heroBg" className="absolute sm:top-[-330px] md:top-[-215px] lg:top-[-100px] xl:top-0 right-0 opacity-5 z-10" src={'/img/heroBg.svg'}/>
        <Image width={220} height={670} alt="yellowBg" className="w-[120px] h-[290px] md:h-[400px] md:w-[250px] xl:w-[180px] xl:h-[530px] absolute top-0 left-10 md:left-20 lg:left-36  z-10" src={'/img/yellowBg.svg'}/>
        <Image width={538} height={538} alt="heroImg" className="w-[180px] top-40 left-10 md:w-[300px] xl:w-[450px] absolute xl:top-48 lg:top-72 md:left-10 lg:left-24 z-10" src={'/img/heroImg.svg'}/>
        <div className="flex flex-col justify-between absolute top-[355px] right-10 md:right-24 sm:top-52 xl:top-60 z-20 gap-8 w-[350px] xl:w-[450px]">
            <div className="text-white flex flex-col justify-between ">
                <div className="xl:text-[32px] text-[26px] border-t-8 border-yellow-2 pt-3 sm:block hidden">با دعوت از دوستانتان با معامله در</div>
                <Image className="w-[300px] xl:w-[600px] xl:h-[180px] lg:w-[400px] lg:h-[140px] md:w-[320px] md:h-[100px]" width={636} height={260} alt="crypter img" src={'/img/crypter.svg'}/>
                <div className="xl:text-[32px] text-[26px]">کارمزد ما در جیب شما</div>
                <div className="text-gray-300 text-[20px]">مطمئن ترین صرافی ارز دیجیتال ایران</div>
            </div>
            <button className="bg-none font-light-vazir text-yellow-2 border-2 rounded-full w-60 lg:w-96 py-2 xl:py-3 border-yellow-2 md:text-[19px] lg:text-[22px] xl:text-[26px] hover:text-black hover:bg-yellow-2">
                بزن بریم برای دریافت جایزه
            </button>
        </div>
    </div>
  )
}

export default Hero