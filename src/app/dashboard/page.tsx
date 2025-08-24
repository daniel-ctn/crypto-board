'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Activity,
  DollarSign,
  Eye,
  Plus,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react'

import { useAuth } from '@/hooks/use-auth'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useCryptoMarketData } from '@/lib/crypto-api'

export default function DashboardOverview() {
  const { user } = useAuth()
  const { data: marketData, isLoading } = useCryptoMarketData()

  // Mock portfolio data - will be replaced with real data later
  const portfolioStats = {
    totalValue: 15420.5,
    totalInvested: 12000.0,
    totalGainLoss: 3420.5,
    totalGainLossPercentage: 28.5,
    topPerformer: 'Bitcoin',
    topPerformerGain: 45.2,
  }

  const topCoins = marketData?.slice(0, 5) || []

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.name?.split(' ')[0] || 'Trader'}!
          </h1>
          <p className="text-slate-400 mt-1">
            Here&#39;s what&#39;s happening with your crypto portfolio today.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button asChild>
            <Link href="/dashboard/portfolio">
              <Plus className="w-4 h-4 mr-2" />
              Add Trade
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Portfolio Value */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Portfolio Value
            </CardTitle>
            <Wallet className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(portfolioStats.totalValue)}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              {portfolioStats.totalGainLoss >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  portfolioStats.totalGainLoss >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {formatPercentage(portfolioStats.totalGainLossPercentage)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Total Invested */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Total Invested
            </CardTitle>
            <DollarSign className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(portfolioStats.totalInvested)}
            </div>
            <p className="text-xs text-slate-400">Across {4} different coins</p>
          </CardContent>
        </Card>

        {/* Total Gain/Loss */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Total P&L
            </CardTitle>
            <Activity className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                portfolioStats.totalGainLoss >= 0
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {portfolioStats.totalGainLoss >= 0 ? '+' : ''}
              {formatCurrency(portfolioStats.totalGainLoss)}
            </div>
            <p className="text-xs text-slate-400">Since inception</p>
          </CardContent>
        </Card>

        {/* Watchlist Items */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Watchlist Items
            </CardTitle>
            <Eye className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-slate-400">
              <span className="text-green-500">3 alerts active</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performers */}
        <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Top Market Performers</CardTitle>
            <CardDescription className="text-slate-400">
              Best performing cryptocurrencies in the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                    <div className="flex-1 space-y-1">
                      <div className="h-4 bg-slate-700 rounded w-24"></div>
                      <div className="h-3 bg-slate-700 rounded w-16"></div>
                    </div>
                    <div className="h-4 bg-slate-700 rounded w-20"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {topCoins.map((coin) => (
                  <div
                    key={coin.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-8 h-8">
                        <Image
                          src={coin.image}
                          alt={coin.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {coin.name}
                        </div>
                        <div className="text-sm text-slate-400 uppercase">
                          {coin.symbol}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">
                        {formatCurrency(coin.current_price)}
                      </div>
                      <Badge
                        variant="secondary"
                        className={`${
                          coin.price_change_percentage_24h >= 0
                            ? 'bg-green-900/50 text-green-400 border-green-800'
                            : 'bg-red-900/50 text-red-400 border-red-800'
                        }`}
                      >
                        {formatPercentage(coin.price_change_percentage_24h)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-slate-400">
              Commonly used features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/portfolio">
                <Plus className="w-4 h-4 mr-2" />
                Add New Trade
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/watchlist">
                <Eye className="w-4 h-4 mr-2" />
                Manage Watchlist
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/charts">
                <Activity className="w-4 h-4 mr-2" />
                View Charts
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/dashboard/ai-assistant">
                <Activity className="w-4 h-4 mr-2" />
                Ask AI Assistant
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
