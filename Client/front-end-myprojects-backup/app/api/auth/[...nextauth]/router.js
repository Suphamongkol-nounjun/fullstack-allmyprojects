import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'

const authOptions = {
    providers: [
        CredentialsProvider({
          name: 'credentials',
          credentials: {},
          async authorize(credentials, req) {

            const { email,password } = credentials;

            try {
              
              await connectMongoDB();
              const user = await User.findOne({ email });

              if(!user){
                return null;
              }

              const passwordMatch = await bcrypt.compare(password, user.password)

              if(!passwordMatch){
                return null
              }
              return user;

            } catch (error) {
              console.log('error: ', error)
            }
          }
        })
      ],
      session: {
        strategy: "jwt",
      },
      secret: process.env.NEXTAUTH_SECRET,
      pages:{
        signIn: "/login"
      },
      callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {

            if (user) {
                return {
                    ...token,
                    id: user._id,
                    role: user.role
                }
            }

            return token
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role
                }
            }
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }