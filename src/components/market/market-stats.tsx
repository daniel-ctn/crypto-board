// components/market/market-stats.tsx
'use client'

import {
  Activity,
  Coins,
  DollarSign,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGlobalMarketStats } from '@/lib/crypto-api'

export function MarketStats() {
  const { data: stats, isLoading } = useGlobalMarketStats()

  const formatCurrency = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-24 mb-2"></div>
                <div className="h-8 bg-slate-700 rounded w-32 mb-2"></div>
                <div className="h-4 bg-slate-700 rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Market Cap */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">
            Total Market Cap
          </CardTitle>
          <DollarSign className="h-4 w-4 text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {formatCurrency(stats.totalMarketCap)}
          </div>
          <div className="flex items-center space-x-2 mt-1">
            {stats.marketCapChange24h >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${
                stats.marketCapChange24h >= 0
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {formatPercentage(stats.marketCapChange24h)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Total Volume */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">
            24h Volume
          </CardTitle>
          <Activity className="h-4 w-4 text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {formatCurrency(stats.totalVolume)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Across {stats.totalCoins.toLocaleString()} coins
          </p>
        </CardContent>
      </Card>

      {/* BTC Dominance */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">
            BTC Dominance
          </CardTitle>
          <Coins className="h-4 w-4 text-orange-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {stats.dominance.btc.toFixed(1)}%
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
            <div
              className="bg-orange-400 h-2 rounded-full"
              style={{ width: `${stats.dominance.btc}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* ETH Dominance */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">
            ETH Dominance
          </CardTitle>
          <Coins className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {stats.dominance.eth.toFixed(1)}%
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
            <div
              className="bg-blue-400 h-2 rounded-full"
              style={{ width: `${stats.dominance.eth}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
