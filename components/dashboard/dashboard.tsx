'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { viewTitles, type ViewKey } from './nav'
import { AnalyticsView } from './views/analytics-view'
import { ListingsView } from './views/listings-view'
import { UsersView } from './views/users-view'
import { DealersView } from './views/dealers-view'
import { EscrowView } from './views/escrow-view'
import { DisputesView } from './views/disputes-view'
import { PriceIndexView } from './views/price-index-view'

export function Dashboard() {
  const [view, setView] = useState<ViewKey>('analytics')
  const [mobileNav, setMobileNav] = useState(false)
  const meta = viewTitles[view]

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar active={view} onNavigate={setView} />
      </div>

      {/* Mobile sidebar */}
      {mobileNav && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileNav(false)}
            aria-hidden
          />
          <div className="animate-in slide-in-from-left relative h-full w-64 duration-200">
            <button
              onClick={() => setMobileNav(false)}
              className="absolute -right-10 top-4 rounded-lg bg-card p-2 text-foreground"
              aria-label="Close navigation"
            >
              <X className="size-5" />
            </button>
            <Sidebar
              active={view}
              onNavigate={setView}
              onClose={() => setMobileNav(false)}
            />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          title={meta.title}
          subtitle={meta.subtitle}
          onMenu={() => setMobileNav(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 md:hidden">
              <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
                {meta.title}
              </h1>
              <p className="text-sm text-muted-foreground">{meta.subtitle}</p>
            </div>

            {view === 'analytics' && <AnalyticsView />}
            {view === 'review' && <ListingsView reviewOnly />}
            {view === 'listings' && <ListingsView />}
            {view === 'users' && <UsersView />}
            {view === 'dealers' && <DealersView />}
            {view === 'escrow' && <EscrowView />}
            {view === 'disputes' && <DisputesView />}
            {view === 'price' && <PriceIndexView />}
          </div>
        </main>
      </div>
    </div>
  )
}
