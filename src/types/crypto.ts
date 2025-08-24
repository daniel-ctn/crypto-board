export interface CryptoCoin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number | null
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  price_change_percentage_7d_in_currency: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number | null
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: any | null
  last_updated: string
  sparkline_in_7d?: {
    price: number[]
  }
}

export interface PortfolioHolding {
  id: string
  user_id: string
  symbol: string
  coin_id: string
  name: string
  quantity: number
  avg_buy_price: number
  total_invested: number
  created_at: string
  updated_at: string
}

export interface WatchlistItem {
  id: string
  user_id: string
  symbol: string
  coin_id: string
  name: string
  added_at: string
}

export interface Transaction {
  id: string
  user_id: string
  holding_id?: string
  symbol: string
  coin_id: string
  type: 'buy' | 'sell'
  quantity: number
  price: number
  total_amount: number
  transaction_date: string
  notes?: string
}