'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Plus,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { CryptoCoin } from '@/types/crypto'

interface MarketDataTableProps {
  data: CryptoCoin[]
  isLoading?: boolean
  onAddToWatchlist?: (coin: CryptoCoin) => void
  onAddToPortfolio?: (coin: CryptoCoin) => void
}

export function MarketDataTable({
  data,
  isLoading,
  onAddToWatchlist,
  onAddToPortfolio,
}: MarketDataTableProps) {
  const [sortField, setSortField] =
    useState<keyof CryptoCoin>('market_cap_rank')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 6 : 2,
    }).format(value)
  }

  const formatLargeNumber = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`
    return formatCurrency(value)
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  const handleSort = (field: keyof CryptoCoin) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const SortIcon = ({ field }: { field: keyof CryptoCoin }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1" />
    )
  }

  if (isLoading) {
    return (
      <Card className="bg-slate-800 border-slate-700 animate-in fade-in">
        <CardContent className="p-6">
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex items-center space-x-4"
              >
                <div className="w-6 h-6 bg-slate-700 rounded"></div>
                <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-700 rounded w-24"></div>
                  <div className="h-3 bg-slate-700 rounded w-16"></div>
                </div>
                <div className="w-20 h-4 bg-slate-700 rounded"></div>
                <div className="w-16 h-4 bg-slate-700 rounded"></div>
                <div className="w-20 h-4 bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800 border-slate-700 animate-in fade-in slide-in-from-bottom-4">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300 w-16">#</TableHead>
                <TableHead className="text-slate-300">Coin</TableHead>
                <TableHead
                  className="text-slate-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('current_price')}
                >
                  <div className="flex items-center">
                    Price
                    <SortIcon field="current_price" />
                  </div>
                </TableHead>
                <TableHead
                  className="text-slate-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('price_change_percentage_24h')}
                >
                  <div className="flex items-center">
                    24h %
                    <SortIcon field="price_change_percentage_24h" />
                  </div>
                </TableHead>
                <TableHead
                  className="text-slate-300 cursor-pointer hover:text-white"
                  onClick={() =>
                    handleSort('price_change_percentage_7d_in_currency')
                  }
                >
                  <div className="flex items-center">
                    7d %
                    <SortIcon field="price_change_percentage_7d_in_currency" />
                  </div>
                </TableHead>
                <TableHead
                  className="text-slate-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('market_cap')}
                >
                  <div className="flex items-center">
                    Market Cap
                    <SortIcon field="market_cap" />
                  </div>
                </TableHead>
                <TableHead
                  className="text-slate-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('total_volume')}
                >
                  <div className="flex items-center">
                    Volume (24h)
                    <SortIcon field="total_volume" />
                  </div>
                </TableHead>
                <TableHead className="text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((coin) => (
                <TableRow
                  key={coin.id}
                  className="border-slate-700 hover:bg-slate-700/50 transition-colors duration-200"
                >
                  <TableCell className="font-medium text-slate-400">
                    {coin.market_cap_rank}
                  </TableCell>
                  <TableCell>
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
                        <Link
                          href={`/dashboard/market/${coin.id}`}
                          className="font-medium text-white hover:text-blue-400"
                        >
                          {coin.name}
                        </Link>
                        <div className="text-sm text-slate-400 uppercase">
                          {coin.symbol}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white font-medium">
                    {formatCurrency(coin.current_price)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        coin.price_change_percentage_24h >= 0
                          ? 'bg-green-900/50 text-green-400 border-green-800'
                          : 'bg-red-900/50 text-red-400 border-red-800'
                      }
                    >
                      <div className="flex items-center space-x-1">
                        {coin.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>
                          {formatPercentage(coin.price_change_percentage_24h)}
                        </span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        (coin.price_change_percentage_7d_in_currency || 0) >= 0
                          ? 'text-green-400'
                          : 'text-red-400'
                      }
                    >
                      {formatPercentage(
                        coin.price_change_percentage_7d_in_currency || 0,
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {formatLargeNumber(coin.market_cap)}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {formatLargeNumber(coin.total_volume)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAddToWatchlist?.(coin)}
                        className="text-slate-400 hover:text-yellow-400 p-1"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAddToPortfolio?.(coin)}
                        className="text-slate-400 hover:text-green-400 p-1"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
