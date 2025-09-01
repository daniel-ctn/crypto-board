import { Card } from '@/components/ui/card'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-in fade-in duration-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Crypto Dashboard
          </h1>
          <p className="text-slate-400">Manage your crypto portfolio</p>
        </div>
        <Card className="bg-slate-800/60 border-slate-700 p-6 shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4">
          {children}
        </Card>
      </div>
    </div>
  )
}
