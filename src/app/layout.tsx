import { Inter } from 'next/font/google'

import './globals.css'

import QueryProvider from '@/components/providers/query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Crypto Dashboard',
  description: 'Advanced cryptocurrency portfolio and price tracking dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
