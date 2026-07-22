'use client'

import { useEffect } from 'react'
import {
  X,
  Mail,
  Phone,
  Calendar,
  History,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import type { User } from '@/lib/mock-data'
import { StatusBadge, kycTone } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/mock-data'

function standingTone(s: string) {
  if (s === 'Good') return 'success' as const
  if (s === 'Watchlist') return 'warning' as const
  return 'danger' as const
}

// Mock transactions for visual representation
const mockTxns = [
  {
    id: 'TX-9982',
    type: 'purchase',
    date: '2 days ago',
    watch: 'Rolex Submariner Date',
    amount: 12500,
  },
  {
    id: 'TX-8711',
    type: 'sale',
    date: '3 weeks ago',
    watch: 'Omega Speedmaster Professional',
    amount: 5800,
  },
  {
    id: 'TX-8102',
    type: 'purchase',
    date: '2 months ago',
    watch: 'Patek Philippe Nautilus',
    amount: 85000,
  }
]

export function UserHistoryModal({
  user,
  onClose,
}: {
  user: User | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!user) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [user, onClose])

  if (!user) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="animate-in slide-in-from-right relative flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-2xl duration-300">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4 bg-muted/20">
          <div className="flex items-center gap-4">
            <span className="flex size-12 items-center justify-center rounded-full bg-gold/20 text-lg font-semibold text-gold">
              {user.name.split(' ').map((n) => n[0]).join('')}
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                {user.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge tone={standingTone(user.standing)}>
                  {user.standing}
                </StatusBadge>
                <StatusBadge tone={kycTone(user.kyc)} dot>
                  {user.kyc}
                </StatusBadge>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          
          {/* Contact Details */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Contact Details
            </h3>
            <div className="space-y-3 rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="size-4 text-muted-foreground" />
                <span className="text-card-foreground">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="size-4 text-muted-foreground" />
                <span className="text-card-foreground">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-card-foreground">Joined {user.joined}</span>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-semibold font-display text-card-foreground">{user.purchases}</p>
              <p className="text-xs text-muted-foreground mt-1">Total Purchases</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-semibold font-display text-card-foreground">{user.sales}</p>
              <p className="text-xs text-muted-foreground mt-1">Total Sales</p>
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <h3 className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase flex items-center gap-2">
              <History className="size-4" /> Recent Activity
            </h3>
            <div className="space-y-3">
              {mockTxns.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex size-8 items-center justify-center rounded-full ${txn.type === 'purchase' ? 'bg-success/15 text-success' : 'bg-info/15 text-info'}`}>
                      {txn.type === 'purchase' ? <TrendingDown className="size-4" /> : <TrendingUp className="size-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground line-clamp-1">{txn.watch}</p>
                      <p className="text-xs text-muted-foreground">{txn.type === 'purchase' ? 'Bought' : 'Sold'} · {txn.date}</p>
                    </div>
                  </div>
                  <div className="text-right pl-2">
                    <p className="text-sm font-semibold text-card-foreground">{formatCurrency(txn.amount)}</p>
                    <p className="text-[10px] text-muted-foreground">{txn.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
