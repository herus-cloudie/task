
import CredentialsProvider from 'next-auth/providers/credentials';

import ConnectDataBase from '@/utils/connectDataBase';
import ExchangeUser from '@/utils/model';

import { compare } from 'bcryptjs';

const AuthOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
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
      },
    }),
  ],
};

export default AuthOptions;