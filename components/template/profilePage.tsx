'use client'

import { signOut } from "next-auth/react"
import Header from "../module/header"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation";
import DynamicInput from "../module/dynamicInput";
import { useState } from "react";
import { Button } from "../ui/button";

const ProfilePage = ({session} : {session : any}) => {
  const [state, setState] = useState({
    email : '',
    newPassword : '',
    name : '',
  });
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
  return (
    <section className="lg:h-[800px] h-[1000px] sign-page-bg flex justify-center">
      <Header />
      <div className="w-[360px] sm:w-[600px] md-[700px] lg:w-[990px] xl:w-[1220px] bg-white rounded h-[700px] lg:h-[550px] mt-40">
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
          <p className="text-2xl text-blue-1 mt-5 border-b border-black pb-3 my-6 pt-10">ویرایش</p>
          <div className="flex flex-col justify-center gap-8">
            <div className="flex flex-col lg:flex-row lg:gap-0 gap-5 justify-between">
              <DynamicInput name={"email"} onChange={(e) => setState({...state , [e.target.name] : e.target.value})} label={"ایمیل"} value={state.email} />
              <DynamicInput name={"name"} onChange={(e) => setState({...state , [e.target.name] : e.target.value})} label={"نام"} value={state.name} />
            </div>
            <Button className="bg-blue-500">اصلاح اطلاعات</Button>
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default ProfilePage