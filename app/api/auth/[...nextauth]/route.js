import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"
// import bcrypt from "bcrypt";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/lib/db";

// export default NextAuth({
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {
//                 email: {  label: "email", type: "text"},
//                 password: {  label: "password", type: "text"},
//             },
//             async authorize(credentials) {
//                 if(!credentials?.email || !credentials?.password){
//                     throw new Error("Invalid Credentials");
//                 }

//                 const user = await prisma.user.findUnique({
//                     where: {
//                         email: credentials.email
//                     }
//                 });

//                 if(!user || !user?.password){
//                     throw new Error("Invalid Credentials");
//                 }

//                 const checkPass = await bcrypt.compare(credentials.password, user.password)

//                 if(!checkPass){
//                     throw new Error("Invalid Credentials");
//                 }

//                 return user;
//             },

//         }),
//     ],
//     debug: process.env.NODE_ENV === "development",
//     session: {
//         strategy: "jwt"
//     },
//     jwt: {
//         secret: process.env.NEXTAUTH_JWT_SECRET,
//     },
//     secret: process.env.NEXTAUTH_SECRET
// })


const handler = NextAuth({
    // adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        }),
      ],
    callbacks:{
      async session({ session }){
        try{
          const sessionUser = await prisma.user.findUnique({
            where: {
                email: session.user?.email
            }
          });

          if(!sessionUser) return;
  
          session.user.id = sessionUser.id;
  
          return session;
  
        }catch(error){
          console.log(error);
          return;
        }
      },
      async signIn({ profile }){
        try{
          // check existing user
          const userExists = await prisma.user.findUnique({
            where: {
              email: profile.email
            }
          });

          // create new user
          if(!userExists){
            await prisma.user.create({
              data:{
                email: profile.email,
                name: profile.name,
                username: profile.name.replace(" ", "").toLowerCase(),
                image: profile.picture,
                onboarded: false
              }
            })
          }else{
            return userExists;
          }
          
        }catch(error){
          console.log(error.message);
          return false;
        }
      }
    },
})

export { handler as GET, handler as POST }