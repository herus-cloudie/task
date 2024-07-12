
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import ConnectDataBase from "@/utils/connectDataBase";
import ExchangeUser from "@/utils/model";

import { compare } from "bcryptjs";

export const authOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await ConnectDataBase();
        } catch (err) {
          console.log(err);
          throw new Error('Problem connecting to the database');
        }

        const user = await ExchangeUser.findOne({ email });

        if (!user) throw new Error('User does not exist');
        if (!await compare(password, user.password)) throw new Error('Password is incorrect');

        return { email: email, name: user.name };
      }
    })
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
