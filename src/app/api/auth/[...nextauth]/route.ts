import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Mock user for demo
const mockUser = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
  password: 'password123'
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        // For demo: accept any email/password combination
        // In production, this would validate against a database
        if (credentials.password.length > 0) {
          return {
            id: '1',
            name: credentials.email.split('@')[0],
            email: credentials.email,
          };
        }

        throw new Error('Invalid credentials');
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
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
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login', // Error code passed in query string as ?error=
  },
  secret: process.env.NEXTAUTH_SECRET || 'demo-secret-do-not-use-in-production',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
