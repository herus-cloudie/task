
import ConnectDataBase from '@/utils/connectDataBase'
import ExchangeUser from '@/utils/model'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req) {
    let {email , password , name} = await req.json()
    
    try {
        await ConnectDataBase()
    } catch (err) {
        return  NextResponse.json({status : 'faild' , message : 'problem at connecting to Data-base'} , {status : 500})
    } 
    console.log(password)
    let userExist = await ExchangeUser.findOne({email : email})
    if(userExist) return NextResponse.json({status : 'faild' , message : 'user does exist'} , {status : 422 , statusText : 'user does exist'}) 

    let hashedPassword = await hash(password , 12)
    console.log(hashedPassword)
    let user = await ExchangeUser.create({email  , name , password : hashedPassword})

    return NextResponse.json({status : 'success' , message : 'user created' , user} , {status : 200})
}