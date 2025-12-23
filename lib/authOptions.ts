import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import registering from "@/app/api/registering";
import { setToken } from "@/app/utils/cookieUtils"
export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
    ],

    pages: {
        signIn: "/login",
        newUser: "/home",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        updateAge: 24 * 60 * 60 // 1 day
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET!,
        maxAge: 60 * 60 * 24 * 7, // 7 days
    },

    callbacks: {
        async jwt({ token, account, user }) {
            if (account && user) {
                // call registeration function
                const data = await registering(user.name as string, user.email as string, "", user.image as string || "", account.provider as "google" | "facebook", account.providerAccountId as string );
                if (data?.data.token) {
                    token.accessToken = data.data.token;
                }
            }
            return token
        },

        session({ session, token }: { session: any, token: any }) {
            session.backendToken = token.accessToken;
            return session
        },

        redirect({ url, baseUrl }) {
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`
            }

            return baseUrl + "/home"
        }
    }
}
