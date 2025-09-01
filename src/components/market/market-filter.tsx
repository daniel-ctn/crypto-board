// components/market/market-filters.tsx
'use client'

import { useState } from 'react'
import { Filter, Search, TrendingDown, TrendingUp, X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCryptoCategories } from '@/lib/crypto-api'

interface MarketFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  priceFilter: 'all' | 'gainers' | 'losers'
  onPriceFilterChange: (filter: 'all' | 'gainers' | 'losers') => void
  onReset: () => void
}

export function MarketFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  priceFilter,
  onPriceFilterChange,
  onReset,
}: MarketFiltersProps) {
  const { data: categories, isLoading: categoriesLoading } =
    useCryptoCategories()
  const [showAdvanced, setShowAdvanced] = useState(false)

  const sortOptions = [
    { value: 'market_cap_desc', label: 'Market Cap (High to Low)' },
    { value: 'market_cap_asc', label: 'Market Cap (Low to High)' },
    { value: 'price_desc', label: 'Price (High to Low)' },
    { value: 'price_asc', label: 'Price (Low to High)' },
    { value: 'volume_desc', label: 'Volume (High to Low)' },
    { value: 'volume_asc', label: 'Volume (Low to High)' },
    { value: 'percent_change_24h_desc', label: '24h Change (High to Low)' },
    { value: 'percent_change_24h_asc', label: '24h Change (Low to High)' },
  ]

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'all' ||
    priceFilter !== 'all' ||
    sortBy !== 'market_cap_desc'

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Market Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onReset}>
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={priceFilter === 'all' ? 'default' : 'secondary'}
            className="cursor-pointer"
            onClick={() => onPriceFilterChange('all')}
          >
            All Coins
          </Badge>
          <Badge
            variant={priceFilter === 'gainers' ? 'default' : 'secondary'}
            className="cursor-pointer bg-green-900/50 text-green-400 border-green-800 hover:bg-green-900"
            onClick={() => onPriceFilterChange('gainers')}
          >
            <TrendingUp className="w-3 h-3 mr-1" />
            Gainers
          </Badge>
          <Badge
            variant={priceFilter === 'losers' ? 'default' : 'secondary'}
            className="cursor-pointer bg-red-900/50 text-red-400 border-red-800 hover:bg-red-900"
            onClick={() => onPriceFilterChange('losers')}
          >
            <TrendingDown className="w-3 h-3 mr-1" />
            Losers
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Filter */}
          <div className="space-y-2">
            <Label className="text-slate-300">Category</Label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all" className="text-white">
                  All Categories
                </SelectItem>
                {!categoriesLoading &&
                  categories?.slice(0, 20).map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className="text-white"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <Label className="text-slate-300">Sort By</Label>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-white"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
        </Button>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="space-y-4 pt-4 border-t border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Min Price ($)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Max Price ($)</Label>
                <Input
                  type="number"
                  placeholder="100,000"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Min Market Cap</Label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="1m" className="text-white">
                      $1M+
                    </SelectItem>
                    <SelectItem value="10m" className="text-white">
                      $10M+
                    </SelectItem>
                    <SelectItem value="100m" className="text-white">
                      $100M+
                    </SelectItem>
                    <SelectItem value="1b" className="text-white">
                      $1B+
                    </SelectItem>
                    <SelectItem value="10b" className="text-white">
                      $10B+
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Min Volume (24h)</Label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="100k" className="text-white">
                      $100K+
                    </SelectItem>
                    <SelectItem value="1m" className="text-white">
                      $1M+
                    </SelectItem>
                    <SelectItem value="10m" className="text-white">
                      $10M+
                    </SelectItem>
                    <SelectItem value="100m" className="text-white">
                      $100M+
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
