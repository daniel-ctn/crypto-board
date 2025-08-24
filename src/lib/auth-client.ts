import { createAuthClient } from "better-auth/client"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
})

export const signIn = authClient.signIn.email
export const signUp = authClient.signUp.email
export const signOut = authClient.signOut
export const useSession = authClient.useSession