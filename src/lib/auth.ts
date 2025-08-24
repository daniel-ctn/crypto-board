import { betterAuth } from "better-auth"
import { supabaseAdapter } from "better-auth/adapters/supabase"

export const auth = betterAuth({
  database: supabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secretKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache for 5 minutes
    },
  },
})