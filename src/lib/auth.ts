import { betterAuth } from "better-auth"

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
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache for 5 minutes
    },
  },
  callbacks: {
    after: [
      {
        matcher(context) {
          return context.type === "credential.signUp"
        },
        handler: async (ctx) => {
          // Create profile after user signup
          const { user } = ctx.context
          if (user) {
            try {
              const { createClient } = await import('@supabase/supabase-js')
              const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!
              )

              await supabase.from('profiles').insert({
                id: user.id,
                username: user.email?.split('@')[0] || null,
                full_name: user.name || null,
                avatar_url: user.image || null,
              })
            } catch (error) {
              console.error('Error creating profile:', error)
            }
          }
        },
      },
    ],
  },
})