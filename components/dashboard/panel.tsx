'use client'

import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function PanelToolbar({
  count,
  countLabel,
  searchPlaceholder,
  children,
}: {
  count?: number
  countLabel?: string
  searchPlaceholder: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2">
        {typeof count === 'number' && (
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {count} {countLabel}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <div className="flex w-full items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm sm:max-w-xs">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        {children}
      </div>
    </div>
  )
}

export function Th({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase',
        className,
      )}
    >
      {children}
    </th>
  )
}

export function Td({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <td className={cn('px-4 py-3 align-middle text-sm', className)}>
      {children}
    </td>
  )
}
