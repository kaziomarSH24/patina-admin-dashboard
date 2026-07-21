'use client'

import { useState } from 'react'
import { Search, Bell, Menu, Clock, ShieldAlert, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const alerts = [
  {
    icon: Clock,
    tone: 'text-warning',
    title: '2 photo reviews approaching 24h SLA',
    detail: 'PAT-10233 and PAT-10209 need action within 4 hours.',
  },
  {
    icon: ShieldAlert,
    tone: 'text-destructive',
    title: 'Dispute DSP-115 open for 48h+',
    detail: 'Non-delivery claim on Tudor Black Bay 58 awaiting decision.',
  },
  {
    icon: Clock,
    tone: 'text-info',
    title: 'Escrow ESC-5501 payment held 3 days',
    detail: 'Seller has not yet marked the item as shipped.',
  },
]

export function Header({
  title,
  subtitle,
  onMenu,
}: {
  title: string
  subtitle: string
  onMenu: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <button
        onClick={onMenu}
        className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </button>

      <div className="hidden min-w-0 md:block">
        <h1 className="font-display text-lg leading-tight font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
      </div>

      {/* Search */}
      <div className="ml-auto flex w-full max-w-sm items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground focus-within:border-gold/50 focus-within:ring-2 focus-within:ring-gold/20">
        <Search className="size-4 shrink-0" />
        <input
          type="text"
          placeholder="Search watches, sellers, transactions..."
          className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
          ⌘K
        </kbd>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
          aria-expanded={open}
        >
          <Bell className="size-5" />
          <span className="absolute top-1.5 right-1.5 flex size-2 items-center justify-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-destructive/70" />
            <span className="relative inline-flex size-2 rounded-full bg-destructive" />
          </span>
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-border bg-popover shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="text-sm font-semibold text-foreground">
                  Critical alerts
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Close notifications"
                >
                  <X className="size-4" />
                </button>
              </div>
              <ul className="max-h-96 divide-y divide-border overflow-y-auto">
                {alerts.map((a, i) => {
                  const Icon = a.icon
                  return (
                    <li
                      key={i}
                      className="flex gap-3 px-4 py-3 transition-colors hover:bg-muted/50"
                    >
                      <Icon className={cn('mt-0.5 size-4 shrink-0', a.tone)} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {a.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {a.detail}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <button className="w-full border-t border-border py-2.5 text-center text-xs font-medium text-gold hover:bg-muted/50">
                View all activity
              </button>
            </div>
          </>
        )}
      </div>

      <span className="flex size-9 items-center justify-center rounded-full bg-gold/20 text-sm font-semibold text-gold ring-1 ring-inset ring-gold/30">
        AV
      </span>
    </header>
  )
}
