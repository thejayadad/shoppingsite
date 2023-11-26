import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcrypt";
import connect from "@/lib/connect";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/clientPromise";


const handler = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        async authorize(credentials) {
          await connect();
  
          try {
            const user = await User.findOne({
              email: credentials.email,
            });
  
            if (user) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );
  
              if (isPasswordCorrect) {
                return user;
              } else {
                throw new Error("Wrong Credentials!");
              }
            } else {
              throw new Error("User not found!");
            }
          } catch (err) {
            throw new Error(err);
          }
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    pages: {
      error: "/",
    },
    callbacks: {
        async jwt({ token, user }) {
          if (user) token.role = user.role;
          return token;
        },
        async session({ session, token }) {
          if (session?.user) session.user.role = token.role;
          return session;
        },
      },
    
  
  });
  
  export { handler as GET, handler as POST };
