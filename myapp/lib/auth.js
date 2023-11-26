import GoogleProvider from "next-auth/providers/google";

import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import db from "./db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: {
                label: "email:",
                type: "text",
                placeholder: "your-email",
              },
              password: {
                label: "password:",
                type: "password",
                placeholder: "your-password",
              },
            },
            async authorize(credentials) {
                await db.connect()
                try {
                const foundUser = await User.findOne({ email: credentials.email })
                  .lean()
                  .exec();
      
                if (foundUser) {
                  console.log("User Exists");
                  const match = await bcrypt.compare(
                    credentials.password,
                    foundUser.password
                  );
      
                  if (match) {
                    console.log("Good Pass");
                    delete foundUser.password;
      
                    foundUser["role"] = "Unverified Email";
                    return foundUser;
                  }
                }
              } catch (error) {
                console.log(error);
              }
              return null;
            },
          }),
        GoogleProvider({
            profile(profile) {
              console.log("Profile Google: ", profile);
              let userRole = "Google User";
              if (profile?.email == "jaydunb12@gmail.com") {
                userRole = "admin";
              }
      
              return {
                ...profile,
                id: profile.sub,
                role: userRole,
              };
            },
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),     

    
    ],
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

}

export const getAuthSession = () => getServerSession(authOptions);