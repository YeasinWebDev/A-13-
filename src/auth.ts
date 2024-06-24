import { bcrypt } from "bcrypt";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "./lib/conectDb";

const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials!;
        if (!email || !password) {
          return null;
        }
        const db = await connectDb();
        const currentUser = await db!.collection("users").findOne({ email });

        if (!currentUser) {
          return null;
        }
        const isMatch = await bcrypt.compare(password, currentUser.password);
        if (!isMatch) {
          return null;
        }
        return currentUser;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const { email } = user;

        try {
          const db = await connectDb();
          const currentUser = await db!.collection("users").findOne({ email });
          if (!currentUser) {
            const res = await db!.collection("users").insertOne(user);
          }
            return true;
        } catch (error) {
          console.log(error);
          throw new Error("Sign-in failed"); 
        }
      } else {
        return true;
      }
    },
  },
});

export { handler as GET, handler as POST };