
import Session from "@/utils/session";
 
import ConnectDataBase from '@/utils/connectDataBase'
import ExchangeUser from '@/utils/model'
import { compare, hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req) {
    let session = await Session();
    let {name , newPassword , currentPassword} = await req.json()

    if(!session) return NextResponse.json({status : 'failed' , message : 'please log in'} , {status : 403})
    try {
        await ConnectDataBase()
    } catch (err) {
        console.log(err)
        return NextResponse.json({status : 'failed' , message : 'problem at connecting to Data-base'} , {status : 500})
    }
    let user = await ExchangeUser.findOne({email : session?.user.email})
    if(!await compare(currentPassword , user.password)) return NextResponse.json({status : 'failed' , message : 'you password is incorrect'} , {status : 401})
    
    if(name && !newPassword){
        if(user.name == name) return NextResponse.json({status : 'failed' , message : 'your name is already registered'} , {status : 406})
        user.name = name;
        user.save();
        return NextResponse.json({status : 'success' , message : 'your user name get change'} , {status : 202})
    }
    else if(newPassword && !name){
        user.password = await hash(newPassword , 12);
        user.save();
        return NextResponse.json({status : 'success' , message : 'your password get change'} , {status : 202})
    }
    else{
        if(user.name == name) return NextResponse.json({status : 'failed' , message : 'your name is already registered'} , {status : 406})
        user.name = name;
        user.password = await hash(newPassword , 12);
        user.save();
    } return NextResponse.json({status : 'success' , message : 'your user name and password get change'} , {status : 202})
    
}
