import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/lib/prisma";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/error'
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const allowedEmail = await prisma.allowedEmail.findUnique({
          where: { email: profile.email },
        });
        if (profile.email.endsWith("@citchennai.net") && allowedEmail) {
          return true;
        } else {
          console.log(`Invalid Email ${profile.email}`)
          return "/error";
        }
      }
      return true;
    },

    async session({ session, token, user }) {
      session.user.id = token.sub;
      session.user.role = "user";
      session.user.name = token.name;
      return session;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.id;
        token.email = profile.email;
        token.name = profile.name;
      }
      return token;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

