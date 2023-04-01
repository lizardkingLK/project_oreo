import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { apiUrls } from "@/utils/enums";

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
                const { email, password } = credentials
                const res = await fetch(apiUrls.login, {
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
    theme: {
        colorScheme: "dark",
        brandColor: "#15803D",
        logo: "/favicon.png", // Absolute URL to image
        buttonText: "#15803D" // Hex color code
    },
};

export default NextAuth(authOptions);
