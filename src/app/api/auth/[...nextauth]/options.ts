import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { GithubProfile } from 'next-auth/providers/github'
import connectToDb from '@/utils/db'
import bcrypt from 'bcryptjs';
import User from '@/models/User'

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            profile(profile: GithubProfile) {
                //console.log(profile)
                return {
                    ...profile,
                    role: profile.role ?? "user",
                    id: profile.id.toString(),
                    image: profile.avatar_url,
                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                // const user = { id: "42", username: "Dave@aa.com", password: "nextauth", role: "manager" }

                // if (credentials?.username === user.username && credentials?.password === user.password) {
                //     return user
                // } else {
                //     return null
                // }
                await connectToDb();
				console.log('reached till db connect');

				try {
					const user = await User.findOne({
						email: credentials?.username,
					});

					if (user) {
						// console.log(user);
						const isPasswordCorrect = await bcrypt.compare(
							credentials!.password,
							user.password
						);

						if (isPasswordCorrect) {
							// console.log(user);
							return user;
						} else {
							throw new Error('Wrong Credentials!');
						}
					} else {
						throw new Error('User not found!');
					}
				} catch (err) {
					// throw new Error(err);
                    console.log(err);
                    
				}
            }
        })
    ],
     pages: {
        signIn: "/login",
    },
    callbacks: {
        // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
        async jwt({ token, user }) {
            if (user) token.role = user.role
            return token
        },
        // If you want to use the role in client components
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role
            return session
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    }
}