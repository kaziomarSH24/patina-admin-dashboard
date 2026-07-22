'use client'

import {
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { toast } from 'sonner'
import { priceIndex, formatCurrency } from '@/lib/mock-data'
import { Panel, PanelToolbar, Th, Td } from '@/components/dashboard/panel'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function SignalPill({ signal }: { signal: 'Buy' | 'Hold' | 'Sell' }) {
  const config = {
    Buy: {
      cls: 'bg-success/12 text-success ring-success/25',
      Icon: TrendingUp,
    },
    Hold: {
      cls: 'bg-warning/12 text-warning ring-warning/25',
      Icon: Minus,
    },
    Sell: {
      cls: 'bg-destructive/12 text-destructive ring-destructive/25',
      Icon: TrendingDown,
    },
  }[signal]
  const { Icon } = config
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
        config.cls,
      )}
    >
      <Icon className="size-3.5" />
      {signal} Signal
    </span>
  )
}

export function PriceIndexView() {
  return (
    <Panel>
      <PanelToolbar
        count={priceIndex.length}
        countLabel="models tracked"
        searchPlaceholder="Search model or reference..."
      >
        <Button 
          className="bg-gold text-primary-foreground hover:bg-gold/90"
          onClick={() => toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: 'Fetching latest market prices...',
            success: 'Market prices updated successfully',
            error: 'Failed to update prices'
          })}
        >
          <RefreshCw className="size-4" />
          Manual Price Update
        </Button>
      </PanelToolbar>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <Th>Watch Model</Th>
              <Th className="text-right">Fair Market Value</Th>
              <Th className="text-right">30d Change</Th>
              <Th className="text-center">Live Listings</Th>
              <Th className="text-right">Signal</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {priceIndex.map((row) => {
              const up = row.change30d >= 0
              return (
                <tr
                  key={row.ref}
                  className="transition-colors hover:bg-muted/40"
                >
                  <Td>
                    <p className="font-medium text-card-foreground">
                      {row.model}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Ref. {row.ref}
                    </p>
                  </Td>
                  <Td className="text-right font-medium text-card-foreground tabular-nums">
                    {formatCurrency(row.fmv)}
                  </Td>
                  <Td className="text-right">
                    <span
                      className={cn(
                        'inline-flex items-center justify-end gap-0.5 text-sm font-medium tabular-nums',
                        up ? 'text-success' : 'text-destructive',
                      )}
                    >
                      {up ? (
                        <ArrowUpRight className="size-3.5" />
                      ) : (
                        <ArrowDownRight className="size-3.5" />
                      )}
                      {Math.abs(row.change30d)}%
                    </span>
                  </Td>
                  <Td className="text-center text-muted-foreground tabular-nums">
                    {row.liveCount}
                  </Td>
                  <Td className="text-right">
                    <SignalPill signal={row.signal} />
                  </Td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}
