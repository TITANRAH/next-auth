import prisma from "@/libs/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'





export const authOptions = {

  providers: [
    CredentialsProvider({
      
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Sergio" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req): Promise<any> {
        console.log('pass desde authorize' ,credentials);
        
        try {
          const userfound = await prisma.user.findUnique({
            where: {
              email: credentials!.email
            }
          })
          if(!userfound) throw new Error('user not found')
  
          console.log(userfound);
  
          const matchPassword = await bcrypt.compare(credentials!.password, userfound.password)
  
          if(!matchPassword) throw new Error('pass not found')
        
          return {
            id: userfound.id,
            name: userfound.username,
            email: userfound.email
          };
  
        } catch (error) {
          console.log('cayo al catch',error)
          return null
        }
       
      },
     
    }),

    

  
    
  ],

  pages: {
    signIn: '/auth/login',
    
  }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
