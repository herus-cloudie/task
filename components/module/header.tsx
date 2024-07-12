'use client'

import Session from "@/utils/session"
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Header = ({session} : {session : any}) => {
    const router = useRouter();
    const pathName = usePathname();
  return (
    <section className="bg-white flex justify-between items-center absolute top-5 md:w-[700px] w-[370px] xl:w-[1220px] mx-auto py-3 px-5 sm:py-5 sm:px-7 rounded-xl z-20">
        <div className="flex xl:hidden">
            <Image className="md:w-[40px] w-[30px] cursor-pointer" src={'/icon/menu.svg'} alt="logo" width={40} height={40}/>
        </div>
        <div className="flex justify-between xl:gap-10 items-center">
            <div className="xl:m-0 -ml-7">
                <Image  src={'/img/logo.svg'} alt="logo"  className="md:w-[103px] w-[75px]" width={103} height={40}/>
            </div>
            <div className="hidden xl:flex gap-5 justify-between ">
                <span onClick={() => router.push('/')} className="cursor-pointer font-bold text-blue-1 border-b-2 pb-1 border-blue-1 ">
                    صفحه اصلی
                </span>
                <span className="cursor-pointer text-unActive-1">
                    خرید و فروش ارز
                </span>
                <span className="cursor-pointer text-unActive-1">
                    قیمت
                </span>
                <span className="cursor-pointer text-unActive-1">
                    مقالات آموزشی
                </span>
                <span className="cursor-pointer text-unActive-1">
                    وبلاگ
                </span>
                <span className="cursor-pointer text-unActive-1">
                    ارتباط با ما
                </span>
            </div>
        </div>
        <div className="hidden xl:flex justify-between gap-3 ">
            {pathName == '/' && <button onClick={() => session ? router.push('profile') : router.push('sign-in')} className="bg-blue-1 flex text-white p-3 items-center gap-5 rounded-xl"> {!session ? ' ورود و ثبت نام' : 'پروفایل'}
                <Image width={20} height={20} src={'/icon/user.svg'} alt="user icon"/>
            </button>}
            <button className="bg-red-1 flex text-white p-3 items-center gap-5 rounded-xl">پشتیبانی
                <Image width={20} height={20} src={'/icon/headphone.svg'} alt="headphone icon"/>
            </button>
        </div>
        <div className="flex xl:hidden justify-between gap-3">
            <button onClick={() => session ? router.push('profile') : router.push('sign-in')}  className="bg-blue-1 flex text-white p-3 items-center gap-5 rounded-xl">
                <Image className="md:w-[20px] w-[15px]" width={20} height={20} src={'/icon/user.svg'} alt="user icon"/>
            </button>
            <button className="bg-red-1 flex text-white p-3 items-center gap-5 rounded-xl">
                <Image className="md:w-[20px] w-[15px]" width={20} height={20} src={'/icon/headphone.svg'} alt="headphone icon"/>
            </button>
        </div>
    </section>
  )
}

export default Header;