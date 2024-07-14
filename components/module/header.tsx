'use client'

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { navbarContext } from "@/constant";

const Header = ({session} : {session ?: any}) => {
    const router = useRouter();
    const pathName = usePathname();
  return (
    <section className="bg-white flex justify-between items-center absolute top-5 md:w-[700px] w-[370px] xl:w-[1220px] mx-auto py-3 px-5 sm:py-5 sm:px-7 rounded-xl z-20">
        <div className="flex xl:hidden">
        <Sheet>
            <SheetTrigger>
            {pathName !== '/sign-in' &&
            <Image className="md:w-[40px] w-[30px] cursor-pointer" src={'/icon/menu.svg'} alt="logo" width={40} height={40}/>}
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetClose>
                    <Image className="w-[60px] h-[60px] absolute top-8 right-8 cursor-pointer" src={'/icon/Logout.svg'} alt="logout" width={60} height={60}/>
                </SheetClose>
                <SheetClose className="mt-28 mr-16">
                    {
                        navbarContext.map(({text , url , icon}) => (
                            <div onClick={() => router.push(url)} className={`flex text-2xl text-unActive-1 mb-16 gap-3  cursor-pointer`}>
                                {icon && <Image className="w-[22px]" src={icon} alt="logo" width={40} height={40}/>}
                                <div>{text}</div>
                            </div>
                        ))
                    }
                </SheetClose>
                
            </SheetContent>
        </Sheet>
        </div>
        <div className="flex justify-between xl:gap-10 items-center">
            <div className="xl:m-0 -ml-7">
                <Image  src={'/img/logo.svg'} alt="logo"  className="md:w-[103px] w-[75px]" width={103} height={40}/>
            </div>
            <div className="hidden xl:flex gap-8 justify-between ">
                {pathName !== '/sign-in' ?
                    <>
                        <a href="/" className="cursor-pointer font-bold text-blue-1 border-b-2 pb-1 border-blue-1 ">
                             صفحه اصلی
                        </a>
                        <a className="cursor-pointer text-unActive-1" href="/#USDT">
                             قیمت ارزها
                        </a>
                        <a href="/#whyUs" className="cursor-pointer text-unActive-1">
                            چرا ما؟
                        </a>
                        <a href="/#calculator" className="cursor-pointer text-unActive-1">
                            ماشین حساب آنلاین
                        </a>
                        
                        <a href="/#contact" className="cursor-pointer text-unActive-1">
                            ارتباط با ما
                        </a>
                    </>
                    : null
                }
            </div>
        </div>
            <div className="hidden xl:flex justify-between gap-3 ">
                {pathName == '/' &&
                    <button onClick={() => router.push('profile')} className="bg-blue-1 flex text-white p-3 items-center gap-5 rounded-xl">پروفایل
                    <Image width={20} height={20} src={'/icon/user.svg'} alt="user icon"/>
                </button>
                }
                <button className="bg-red-1 flex text-white p-3 items-center gap-5 rounded-xl">پشتیبانی
                    <Image width={20} height={20} src={'/icon/headphone.svg'} alt="headphone icon"/>
                </button>
            </div>
            <div className="flex xl:hidden justify-between gap-3">
                {pathName !== '/sign-in' &&
                    <button onClick={() => session ? router.push('profile') : router.push('sign-in')}  className="bg-blue-1 flex text-white p-3 items-center gap-5 rounded-xl">
                    <Image className="md:w-[20px] w-[15px]" width={20} height={20} src={'/icon/user.svg'} alt="user icon"/>
                </button>
                }
                <button className="bg-red-1 flex text-white p-3 items-center gap-5 rounded-xl">
                    <Image className="md:w-[20px] w-[15px]" width={20} height={20} src={'/icon/headphone.svg'} alt="headphone icon"/>
                </button>
            </div>
    </section>
  )
}

export default Header;