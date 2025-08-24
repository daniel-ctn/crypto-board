import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Crypto Dashboard
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Advanced cryptocurrency portfolio management and price tracking
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/auth/signup">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Portfolio Management</CardTitle>
              <CardDescription className="text-slate-400">
                Track your crypto investments with detailed analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-slate-300 space-y-2">
                <li>• Real-time portfolio tracking</li>
                <li>• Profit/loss calculations</li>
                <li>• Transaction history</li>
                <li>• Voice-enabled trading</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Advanced Charts</CardTitle>
              <CardDescription className="text-slate-400">
                Multiple chart types for technical analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-slate-300 space-y-2">
                <li>• Line, area & candlestick charts</li>
                <li>• Multiple timeframes</li>
                <li>• Volume analysis</li>
                <li>• Price alerts</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">AI Assistant</CardTitle>
              <CardDescription className="text-slate-400">
                Get personalized investment insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-slate-300 space-y-2">
                <li>• Portfolio analysis</li>
                <li>• Market insights</li>
                <li>• Investment suggestions</li>
                <li>• Risk management tips</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
