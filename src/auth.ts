import  bcrypt  from "bcrypt";
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
      async authorize(credentials: Record<"email" | "password", string> | undefined):Promise<User | null> {
        const { email, password } = credentials!;
        if (!email || !password) {
          return null;
        }
        const db = await connectDb();
        const currentUser = await db!.collection("users").findOne({ email });

        if (!currentUser) {
          return null;
        }
        const user: User = {
          id: currentUser._id.toString(), // Convert ObjectId to string
          email: currentUser.email,
          name: currentUser.name, // Assuming 'name' is a field in your user document
          password: currentUser.password,
        };
        const isMatch = await bcrypt.compare(password, currentUser.password);
        if (!isMatch) {
          return null;
        }
        return user;
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

type User = {
  id: string;
  email: string;
  name: string;
  password: string;
}
export { handler as GET, handler as POST };

export const authOption = handler