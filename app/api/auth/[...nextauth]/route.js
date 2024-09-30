import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/libs/prismadb';
import { compare } from "bcrypt";
import NextAuth from "next-auth";


export const authOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

        CredentialsProvider({

            name: "Credentials",

            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
        
                  if (!credentials?.email || !credentials?.password) {
                    return "Please Fill the the fields"
                  }
        
                  const existingUser = await db.User.findUnique({
                    where: { email: credentials.email },
                  });
        
                  if (!existingUser) {
                    throw new Error("Username not found")
                  }
        
                  const passwordMatch = await compare(credentials.password, existingUser.password);
        
                  if (!passwordMatch) throw new Error("Incorrect Password")
        
                  const user = {
                    id: existingUser.id,
                    name: existingUser.name,
                    email: existingUser.email,
                  };
                  return user;
                } catch (error) {
                  return error
                }
              },
        })

    ],
    pages: {
        signIn: '/'
    },

    debug: process.env.NODE_ENV === 'development',

    session: {
        strategy: 'jwt'
    },

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async session({ session, token, user }) {
            session.user.id = user.id;
            return session;
        },
        async signIn({ account, user }) {
            if (account.provider === "google" || account.provider === "github") {
                try {
                    const existingUser = await db.User.findUnique({
                        where: { email: user.email },
                    });

                    if (!existingUser) {
                        await db.User.create({
                            data: {
                                name: user.name,
                                email: user.email,
                                image: user.image
                            }
                        })
                    }
                    return true;
                } catch (error) {
                    console.log(error)
                }
            }
            return false;
        },
    },
};

export default NextAuth(authOptions)