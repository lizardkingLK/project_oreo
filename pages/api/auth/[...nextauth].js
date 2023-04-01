import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
    secret: process.env.NextAuth_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
};

export default NextAuth(authOptions);
