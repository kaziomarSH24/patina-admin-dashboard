'use client'

import { useState } from 'react'
import { Watch, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('admin@patina.com')
  const [password, setPassword] = useState('••••••••')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate network delay for realistic feel
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 1200)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gold/15 ring-1 ring-inset ring-gold/30">
            <Watch className="size-8 text-gold" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
              Patina Admin
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to manage the marketplace
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold/50 focus:ring-1 focus:ring-gold/50"
                placeholder="admin@patina.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Password
                </label>
                <a href="#" className="text-xs text-gold hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold/50 focus:ring-1 focus:ring-gold/50"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold text-black hover:bg-gold/90 h-11 text-base font-semibold transition-all hover:shadow-[0_0_20px_rgba(184,150,90,0.3)]"
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </Button>
          </form>
        </div>
        
        <p className="text-center text-xs text-muted-foreground">
          Secure admin portal. Internal use only.
        </p>

      </div>
    </div>
  )
}
