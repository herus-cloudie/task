import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import ConnectDataBase from "@/utils/connectDataBase";
import ExchangeUser from "@/utils/model";

import { compare } from "bcryptjs";

export const authOptions = {
  session : {strategy : 'jwt'},
  secret : process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
        async authorize(state){
            let {email , password} = state;
            
            try {
                await ConnectDataBase();
            } catch (err) {
                console.log(err)
                throw new Error('problem at connecting to Data-base')
            }

            let user = await ExchangeUser.findOne({email : email})

            if(!user) throw new Error('user does not exist')
            if(!await compare(password , user.password)) throw new Error('password is incorrect')

            return { email : email , name : user.name}
        }
    })
  ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }