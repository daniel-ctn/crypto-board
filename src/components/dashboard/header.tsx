'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Bell,
  LogOut,
  Menu,
  RefreshCw,
  Search,
  Settings,
  User,
} from 'lucide-react'

import { useAuth } from '@/hooks/use-auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { useCryptoMarketData } from '@/lib/crypto-api'

export function DashboardHeader() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const { data: marketData, isLoading } = useCryptoMarketData()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push('/login')
  }

  // Calculate market stats
  const marketStats = marketData?.slice(0, 10).reduce(
    (acc, coin) => {
      return {
        gainers: acc.gainers + (coin.price_change_percentage_24h > 0 ? 1 : 0),
        losers: acc.losers + (coin.price_change_percentage_24h < 0 ? 1 : 0),
        total: acc.total + 1,
      }
    },
    { gainers: 0, losers: 0, total: 0 },
  ) || { gainers: 0, losers: 0, total: 0 }

  return (
    <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden text-slate-400 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-72 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Center - Market Stats */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Badge
            variant="secondary"
            className="bg-green-900/50 text-green-400 border-green-800"
          >
            ↑ {marketStats.gainers} Gainers
          </Badge>
          <Badge
            variant="secondary"
            className="bg-red-900/50 text-red-400 border-red-800"
          >
            ↓ {marketStats.losers} Losers
          </Badge>
        </div>

        {isLoading && (
          <RefreshCw className="w-4 h-4 text-slate-400 animate-spin" />
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="relative text-slate-400 hover:text-white"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
                <AvatarFallback className="bg-blue-600 text-white">
                  {user?.name?.charAt(0).toUpperCase() ||
                    user?.email?.charAt(0).toUpperCase() ||
                    'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-slate-800 border-slate-700"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-white">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs leading-none text-slate-400">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem
              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
