import { useQuery,useInfiniteQuery } from '@tanstack/react-query'
import type { CryptoCoin, MarketStats, CoinCategory } from '@/types/crypto'

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3'

export const useCryptoMarketData = (coinIds?: string[], limit = 100) => {
  return useQuery({
    queryKey: ['crypto-market', coinIds, limit],
    queryFn: async (): Promise<CryptoCoin[]> => {
      const ids = coinIds?.length ? coinIds.join(',') : 'bitcoin,ethereum,binancecoin,cardano,solana,ripple,polkadot,dogecoin,avalanche-2,chainlink'

      const response = await fetch(
        `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=1h,24h,7d,30d`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch crypto data')
      }

      return response.json()
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  })
}

export const useCoinHistory = (coinId: string, days: string = '7', interval?: string) => {
  return useQuery({
    queryKey: ['coin-history', coinId, days, interval],
    queryFn: async () => {
      let url = `${COINGECKO_API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
      if (interval) {
        url += `&interval=${interval}`
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch coin history')
      }

      return response.json()
    },
    enabled: !!coinId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useSearchCoins = (query: string) => {
  return useQuery({
    queryKey: ['search-coins', query],
    queryFn: async () => {
      if (!query || query.length < 2) return []

      const response = await fetch(`${COINGECKO_API_BASE}/search?query=${encodeURIComponent(query)}`)

      if (!response.ok) {
        throw new Error('Failed to search coins')
      }

      const data = await response.json()
      return data.coins?.slice(0, 10) || []
    },
    enabled: !!query && query.length >= 2,
  })
}

// Enhanced market data with pagination
export const useCryptoMarketDataPaginated = (
  page: number = 1,
  perPage: number = 50,
  category?: string,
  sortBy?: string,
  sortOrder?: string
) => {
  return useQuery({
    queryKey: ['crypto-market-paginated', page, perPage, category, sortBy, sortOrder],
    queryFn: async (): Promise<CryptoCoin[]> => {
      let url = `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=${sortBy || 'market_cap_desc'}&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d,30d`

      if (category) {
        url += `&category=${category}`
      }

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch crypto market data')
      }

      return response.json()
    },
    refetchInterval: 30000,
    staleTime: 10000,
  })
}

// Global market stats
export const useGlobalMarketStats = () => {
  return useQuery({
    queryKey: ['global-market-stats'],
    queryFn: async (): Promise<MarketStats> => {
      const response = await fetch(`${COINGECKO_API_BASE}/global`)

      if (!response.ok) {
        throw new Error('Failed to fetch global market data')
      }

      const data = await response.json()
      const globalData = data.data

      return {
        totalCoins: globalData.active_cryptocurrencies,
        totalMarketCap: globalData.total_market_cap.usd,
        totalVolume: globalData.total_volume.usd,
        dominance: {
          btc: globalData.market_cap_percentage.btc,
          eth: globalData.market_cap_percentage.eth,
        },
        marketCapChange24h: globalData.market_cap_change_percentage_24h_usd,
      }
    },
    refetchInterval: 60000,
    staleTime: 30000,
  })
}

// Categories
export const useCryptoCategories = () => {
  return useQuery({
    queryKey: ['crypto-categories'],
    queryFn: async (): Promise<CoinCategory[]> => {
      const response = await fetch(`${COINGECKO_API_BASE}/coins/categories`)

      if (!response.ok) {
        throw new Error('Failed to fetch crypto categories')
      }

      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Enhanced coin details
export const useCoinDetails = (coinId: string) => {
  return useQuery({
    queryKey: ['coin-details', coinId],
    queryFn: async () => {
      const response = await fetch(
        `${COINGECKO_API_BASE}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch coin details')
      }

      return response.json()
    },
    enabled: !!coinId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Trending coins
export const useTrendingCoins = () => {
  return useQuery({
    queryKey: ['trending-coins'],
    queryFn: async () => {
      const response = await fetch(`${COINGECKO_API_BASE}/search/trending`)

      if (!response.ok) {
        throw new Error('Failed to fetch trending coins')
      }

      return response.json()
    },
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    staleTime: 2 * 60 * 1000,
  })
}