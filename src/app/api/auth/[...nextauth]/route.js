import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import pool from "@/utils/db"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        try {
          const query = "SELECT * FROM users WHERE email = $1;";
          const value = [credentials.email];

          const result = await pool.query(query, value);
          const user = result.rows[0];

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.user_password);

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials");
            }
          } else {
            throw new Error("User not found");
          }
        } catch(error) {
          throw new Error(error);
        }
      }
    })
  ],
  pages: {
    error: "/todo/login"
  }
})

export { handler as GET, handler as POST };