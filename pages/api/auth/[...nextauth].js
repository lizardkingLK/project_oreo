import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { apiUrls } from "@/utils/enums";
import { getUserByEmail } from "@/services/mongodb";

export const authOptions = {
    secret: process.env.NextAuth_SECRET,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Enter email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter Password",
                },
            },
            async authorize(credentials, _req) {
                const { email, password } = credentials;
                const res = await fetch(`${process.env.APP_URL}${apiUrls.login}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });
                const user = await res.json();
                if (res.ok && user) {
                    return user;
                } else return null;
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = await getUserByEmail(token.email);
            session.token = token;
            return session;
        },
    },
    theme: {
        colorScheme: "dark",
        brandColor: "#15803D",
        logo: "/favicon.png",
        buttonText: "#15803D",
    },
};

export default NextAuth(authOptions);
