'use client'

import { cn } from '@/lib/utils'
import { navItems, type ViewKey } from './nav'
import { Watch, LogOut } from 'lucide-react'

export function Sidebar({
  active,
  onNavigate,
  onClose,
  onLogout,
}: {
  active: ViewKey
  onNavigate: (key: ViewKey) => void
  onClose?: () => void
  onLogout?: () => void
}) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Wordmark */}
      <div className="flex h-16 items-center gap-2.5 px-6">
        <span className="flex size-8 items-center justify-center rounded-lg bg-gold/15 ring-1 ring-inset ring-gold/30">
          <Watch className="size-4 text-gold" />
        </span>
        <span className="font-display text-xl font-semibold tracking-tight text-sidebar-foreground">
          Patina
        </span>
        <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
          Operations
        </p>
        {navItems.map((item) => {
          const isActive = active === item.key
          const Icon = item.icon
          return (
            <button
              key={item.key}
              onClick={() => {
                onNavigate(item.key)
                onClose?.()
              }}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
              )}
            >
              <Icon
                className={cn(
                  'size-4 shrink-0 transition-colors',
                  isActive
                    ? 'text-gold'
                    : 'text-muted-foreground group-hover:text-sidebar-foreground',
                )}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge ? (
                <span className="flex size-5 items-center justify-center rounded-full bg-destructive text-[11px] font-semibold text-destructive-foreground">
                  {item.badge}
                </span>
              ) : null}
              {isActive && (
                <span className="absolute left-0 h-6 w-0.5 -translate-x-3 rounded-r-full bg-gold" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer profile */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-gold/20 text-xs font-semibold text-gold ring-1 ring-inset ring-gold/30">
            AV
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              Ava Novak
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Marketplace Ops
            </p>
          </div>
          <button
            onClick={onLogout}
            className="text-muted-foreground transition-colors hover:text-sidebar-foreground"
            aria-label="Sign out"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
