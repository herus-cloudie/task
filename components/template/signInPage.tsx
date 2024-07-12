'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

import { signIn } from "next-auth/react"

import { signInType, signUpType } from "@/constant/type"

import DynamicInput from "../module/dynamicInput"
import Header from "../module/header"

import { useToast } from "../ui/use-toast"
import { Button } from "../ui/button"
import Loader from "../module/loader"

const SignInPage = () => {
  const router = useRouter();

  const { toast } = useToast();

  const [state, setState] = useState<'sign-in' | 'sign-up'>('sign-up');
  const [loading, setLoading] = useState<boolean>(false);

  const [signUpData , setSignUpData] = useState<signUpType>({
    name : '',
    email : '',
    password : '',
    secondPassword : '',
  });

  const [signInData , setSignInData] = useState<signInType>({
    email : '',
    password : '',
  });

  const SignUpOnChange = (e : any) => setSignUpData({...signUpData , [e.target.name] : e.target.value});
  const SignInOnChange = (e : any) => setSignInData({...signInData , [e.target.name] : e.target.value});
  
  const signUpHandler = async () => {
    if (signUpData.email && signUpData.password && signUpData.secondPassword && signUpData.name) {
        if (signUpData.password.length < 6 || signUpData.secondPassword.length < 6) return toast({ title: "رمز عبور باید بیش از 6 کلمه باشد", variant: "destructive"})
        if (signUpData.email.length < 10 || !signUpData.email.includes('@')) return toast({ title: "ایمیل نامعتبر است", variant: "destructive"})
        if (signUpData.password !== signUpData.secondPassword) return toast({ title: "رمزهای عبور همخوانی ندارند", variant: "destructive"})
        
        setLoading(true)
        const sendReq = await fetch('/api/auth/sign-up' , {
          method : 'POST' ,
          body : JSON.stringify({email : signUpData.email, password : signUpData.password , name : signUpData.name}),
          headers : {'Content-Type': 'application/json'}
        })
        const result = await sendReq.json();
        setLoading(false)

        if(result.status == 'success'){
          
          toast({title: "حساب شما با موفقیت ایجاد شد" , description : 'لطفا وارد حساب شوید'})
          setState('sign-in')
          setSignInData({
            email : '',
            password : '',
          })
          setSignUpData({
            name : '',
            email : '',
            password : '',
            secondPassword : '',
          })
        }else toast({title: "حساب کاربری از قبل ایجاد شده" })
    }

    else toast({title: "لطفا تمامی فیلد هارا پر کنید",variant: "destructive"})
  }

  const signInHandler = async () => {
    setLoading(true)
    const result = await signIn('credentials' , {
      email : signInData.email,
      password : signInData.password,
      redirect : false
    })
    setLoading(false)

    if(result?.ok) {
      router.push('/')
      router.refresh()
      toast({title: "با موفقیت وارد حساب شدید"})
    } else if(result?.error == 'User does not exist')  toast({title: "حساب کاربری وجود ندارد",variant: "destructive"})
      else if(result?.error == 'Password is incorrect')  toast({title: "رمز عبور اشتباه است",variant: "destructive"})
  }
  

  return (
    <div className="flex justify-center sign-page-bg h-[900px]">
      <Header/>
      {
        state == 'sign-up'
        ? <div className={`bg-white shadow-2xl w-[360px] h-[570px] mt-40 rounded flex flex-col items-center p-5 gap-5`}>
            <div className="text-3xl border-b-2 border-black pb-1">ثبت نام</div>
            <DynamicInput value={signUpData.email} label="ایمیل" name="email" onChange={SignUpOnChange}/>
            <DynamicInput value={signUpData.name} label="نام" name="name" onChange={SignUpOnChange}/>
            <DynamicInput value={signUpData.password} label="رمزعبور" name="password" onChange={SignUpOnChange}/>
            <DynamicInput value={signUpData.secondPassword} label="تکرار رمزعبور" name="secondPassword" onChange={SignUpOnChange}/>
            <small className="flex gap-2">حساب دارید؟ <p onClick={() => {setState('sign-in')}} className="text-blue-1 font-bold cursor-pointer">ورود</p></small>
            {loading ? <Loader /> : <Button onClick={signUpHandler}  className="bg-green-1 mt-5">ثبت عضویت</Button>}
              
        </div>
        : <div className="bg-white w-[360px] h-[370px] mt-40 rounded flex flex-col items-center p-5 gap-5">
            <div className="text-3xl border-b-2 border-black pb-1">ورود</div>
            <DynamicInput value={signInData.email} label="ایمیل" name="email" onChange={SignInOnChange}/>
            <DynamicInput value={signInData.password} label="رمزعبور" name="password" onChange={SignInOnChange}/>
            <div>
            <small onClick={() => setState('sign-up')
            } className="flex gap-2">حساب ندارید <p className="text-blue-1 font-bold cursor-pointer">ایجاد</p></small>
            {loading ? <Loader /> : <Button onClick={signInHandler} className="bg-green-1 mt-5 w-full">ورود</Button> }
             
          </div>
         </div>
    }
    </div>
  )

}

export default SignInPage;