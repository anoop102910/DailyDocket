import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import { connect } from "@/utils/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        try {
          connect();

          const user = await User.findOne({ email: credentials.email });
          console.log(user);
          if (!user) throw new Error("User not found");

          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          console.log(isPasswordCorrect)
          if (!isPasswordCorrect) throw new Error("Wrong Credentials!");

          return {
            id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
