import { useQuery } from '@tanstack/react-query'
import type { CryptoCoin } from '@/types/crypto'

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