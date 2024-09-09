import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from 'bcryptjs'

const authOptions = {
    providers: [
        CredentialsProvider({
          name: 'credentials',
          credentials: {},
          async authorize(credentials, req) {

            const { email,password } = credentials;

            try {

              const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { 'Content-Type': 'application/json' }
              });
      
              const user = await res.json();
              console.log('message: ',user.user)

              if(!user.user){
                return null;
              }

              const passwordMatch = await bcrypt.compare(password, user.user.password)

              if(!passwordMatch){
                return null
              }
              return user.user;


            } catch (error) {
              console.log('error: ', error)
            }
          }
        })
      ],
      session: {
        strategy: "jwt",
        maxAge: 86400,
        updateAge: 43200, 
      },
      callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {

          if (user) {
            token.id = user.uuid
            token.role = user.role
          }
          return token
        },
        async session({ session, user, token }) {
          if (session.user) {
            session.user.id = token.id
            session.user.role = token.role // เพิ่ม role เข้าไป
          }
          return session
          
      }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }