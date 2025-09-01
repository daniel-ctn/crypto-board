'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { MarketDataTable } from '@/components/market/market-data-table'
import { MarketFilters } from '@/components/market/market-filter'
import { MarketStats } from '@/components/market/market-stats'
import type { CryptoCoin } from '@/types/crypto'
import { useCryptoMarketDataPaginated } from '@/lib/crypto-api'

export default function MarketPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('market_cap_desc')
  const [priceFilter, setPriceFilter] = useState<'all' | 'gainers' | 'losers'>(
    'all',
  )
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50

  const { data: marketData, isLoading } = useCryptoMarketDataPaginated(
    currentPage,
    itemsPerPage,
    selectedCategory === 'all' ? undefined : selectedCategory,
    sortBy,
  )

  // Filter data based on search and price filter
  const filteredData = useMemo(() => {
    if (!marketData) return []

    let filtered = marketData

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (coin) =>
          coin.name.toLowerCase().includes(query) ||
          coin.symbol.toLowerCase().includes(query),
      )
    }

    // Price change filter
    if (priceFilter === 'gainers') {
      filtered = filtered.filter((coin) => coin.price_change_percentage_24h > 0)
    } else if (priceFilter === 'losers') {
      filtered = filtered.filter((coin) => coin.price_change_percentage_24h < 0)
    }

    return filtered
  }, [marketData, searchQuery, priceFilter])

  const handleAddToWatchlist = (coin: CryptoCoin) => {
    // TODO: Implement add to watchlist functionality
    console.log('Add to watchlist:', coin.name)
  }

  const handleAddToPortfolio = (coin: CryptoCoin) => {
    // TODO: Implement add to portfolio functionality
    console.log('Add to portfolio:', coin.name)
  }

  const handleReset = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSortBy('market_cap_desc')
    setPriceFilter('all')
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Cryptocurrency Market
          </h1>
          <p className="text-slate-400 mt-1">
            Real-time cryptocurrency prices and market data
          </p>
        </div>
      </div>

      {/* Market Stats */}
      <MarketStats />

      {/* Filters */}
      <MarketFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        priceFilter={priceFilter}
        onPriceFilterChange={setPriceFilter}
        onReset={handleReset}
      />

      {/* Market Data Table */}
      <MarketDataTable
        data={filteredData}
        isLoading={isLoading}
        onAddToWatchlist={handleAddToWatchlist}
        onAddToPortfolio={handleAddToPortfolio}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-400">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of{' '}
          {filteredData.length} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="text-sm text-white px-3 py-1 bg-slate-700 rounded">
            Page {currentPage}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={!marketData || marketData.length < itemsPerPage}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
