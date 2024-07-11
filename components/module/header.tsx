import Image from "next/image";

const Header = () => {
  return (
    <section className="bg-white flex justify-between items-center absolute top-5 xl:w-[1220px] mx-auto py-5 px-7 rounded-xl">
        <div className="flex justify-between gap-10 items-center">
            <div>
                <Image src={'/img/logo.svg'} alt="logo" width={103} height={40}/>
            </div>
            <div className="flex gap-5 justify-between">
                <span className="cursor-pointer font-bold text-blue-1 border-b-2 pb-1 border-blue-1 ">
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
        <div className="flex justify-between gap-3">
            <button className="bg-blue-1 flex text-white p-3 items-center gap-5 rounded-xl">ورود و ثبت نام
                <Image width={15} height={15} src={'/icon/user.svg'} alt="user icon"/>
            </button>
            <button className="bg-red-1 flex text-white p-3 items-center gap-5 rounded-xl">پشتیبانی
                <Image width={15} height={15} src={'/icon/headphone.svg'} alt="headphone icon"/>
            </button>
        </div>
    </section>
  )
}

export default Header;