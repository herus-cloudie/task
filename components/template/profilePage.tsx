'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import DynamicInput from "../module/dynamicInput";
import Header from "../module/header"

import { useToast } from "../ui/use-toast"
import { Button } from "../ui/button";
import Loader from "../module/loader";

import { signOut } from "next-auth/react"

const ProfilePage = ({session} : {session : any}) => {
  let [userInfo , setUserInfo] = useState({
      name : '',
      currentPassword : '',
      newPassword : ''
  });

  let [loading , setLoading]= useState(false);

  const router = useRouter();
  const {toast} = useToast();

  const {user} = session;

  const signOutHandler = async () =>  {
    await signOut()
    router.refresh()
    toast({
        variant: "destructive",
        title: "از حسابتان خارج شدید ",
      })
  }

  const editUserInfo = async () => {
    if(!userInfo.name && !userInfo.newPassword) return toast({ variant: "destructive",  title: "لطفا برای تغییر ، حروف جایگزین را وارد کنید", })
    if(!userInfo.currentPassword) return toast({ variant: "destructive",  title: "لطفا رمز عبور حال حاضر را وارد کنید", })
    if(userInfo.name.length != 0 && userInfo.name.length < 4) return toast({ variant: "destructive",  title: "نام کاربری جایگزین باید حداقل 4 حرف باشد", })
    if(userInfo.newPassword.length != 0 && userInfo.newPassword.length < 6) return toast({ variant: "destructive",  title: "رمز عبور جایگزین باید حداقل 6 حرف باشد", })
    else {
        setLoading(true)
        let sendData = await fetch('/api/profile' , {
            method : 'POST',
            body : JSON.stringify(userInfo),
            headers : {"Content-Type": "application/json"}
        })
        let result = await sendData.json()
          
        if(result.message == 'you password is incorrect'){
            toast({ variant: "destructive",  title: "رمز عبور اشتباه است", })
        }else if(result.message == 'your name is already registered'){
            toast({ variant: "destructive",  title: "نام کاربری شما در حال حاضر ثبت شده است", })

        }else if(result.message == 'your user name get change'){ 
            router.refresh()
            toast({ title: "نام کاربری شما تغییر یافت", description : 'لطفا مجدد وارد حساب بشوید'})
            await signOut()
           
        }else if(result.message == 'your password get change'){
            toast({ title: "رمز عبور تغییر یافت", })
        } else {
            router.refresh()
            toast({ title: "نام کاربری و رمز عبور تغییر یافت", description : 'لطفا مجدد وارد حساب بشوید'})
            await signOut()
            
        }
        setLoading(false)
     }    
}
  return (
    <section className="lg:h-[800px] h-[1000px] sign-page-bg flex justify-center">
      <Header />
      <div className="w-[360px] sm:w-[600px] md:w-[700px] lg:w-[990px] xl:w-[1220px] bg-white rounded h-[820px] lg:h-[600px] mt-40">
        <div className="flex justify-between bg-black p-5 text-white">
          <h3 className="text-3xl pb-3">پروفایل</h3>
          <Button className="bg-red-1" onClick={signOutHandler}>خروج از حساب</Button>
        </div>
        <div className="p-8">
          <p className="text-2xl text-blue-1 mt-5 border-b border-black pb-3">اطلاعات</p>
          <div className="w-full flex flex-col lg:flex-row lg:gap-5 lg:justify-between mt-6 my-5">
            <p className="sm:text-xl text-lg mb-5 lg:mb-0">ایمیل : {user?.email}</p>
            <p className="sm:text-xl text-lg">نام : {user?.name}</p>
          </div>
          <div className="flex justify-between items-baseline border-b border-black mb-5">
            <p className="text-2xl text-blue-1 mt-5 my-6 pt-10">ویرایش</p>
            <p className='text-red-700 sm:text-sm text-[10px]'>در صورت تغییر "نام کاربری" باید مجدد وارد اکانت بشید.</p>
          </div>
          <div className="flex flex-col justify-center gap-14">
            <div className="flex flex-col lg:flex-row lg:gap-0 gap-5 justify-center lg:justify-between">
            
              <DynamicInput name={"name"} placeholder={user?.name} onChange={(e) => setUserInfo({...userInfo , [e.target.name] : e.target.value})} label={"نام"} value={userInfo.name} />
              <DynamicInput name={"newPassword"} onChange={(e) => setUserInfo({...userInfo , [e.target.name] : e.target.value})} label={"رمز عبور جدید"} value={userInfo.newPassword} />
              <DynamicInput name={"currentPassword"} onChange={(e) => setUserInfo({...userInfo , [e.target.name] : e.target.value})} label={"رمز عبور حال حاضر"} value={userInfo.currentPassword} />
            </div>
            {loading ? <div className="flex justify-center"><Loader /> </div> : <Button onClick={editUserInfo} className="bg-blue-500">اصلاح اطلاعات</Button>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage