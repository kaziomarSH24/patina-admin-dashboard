'use client'

import { Landmark, Unlock, RotateCcw } from 'lucide-react'
import { escrowTxns, formatCurrency } from '@/lib/mock-data'
import { Panel, PanelToolbar, Th, Td } from '@/components/dashboard/panel'
import { StatusBadge, escrowTone } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'

export function EscrowView() {
  const total = escrowTxns.reduce((s, t) => s + t.amount, 0)
  const disputed = escrowTxns.filter((t) => t.state === 'Disputed').length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Funds held"
          value={formatCurrency(total)}
          hint="Across active transactions"
        />
        <SummaryCard
          label="Active transactions"
          value={String(escrowTxns.length)}
          hint="Awaiting completion"
        />
        <SummaryCard
          label="Disputed"
          value={String(disputed)}
          hint="Requires resolution"
          danger
        />
      </div>

      <Panel>
        <PanelToolbar
          count={escrowTxns.length}
          countLabel="transactions"
          searchPlaceholder="Search transaction ID or party..."
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <Th>Transaction</Th>
                <Th>Buyer</Th>
                <Th>Seller</Th>
                <Th className="text-right">Amount</Th>
                <Th>State</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {escrowTxns.map((t) => (
                <tr key={t.id} className="transition-colors hover:bg-muted/40">
                  <Td>
                    <div className="flex items-center gap-3">
                      <img
                        src={t.image || '/placeholder.svg'}
                        alt={t.watch}
                        className="size-10 rounded-lg border border-border object-cover"
                      />
                      <div>
                        <p className="font-medium text-card-foreground">
                          {t.watch}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.id} · {t.updated}
                        </p>
                      </div>
                    </div>
                  </Td>
                  <Td className="text-card-foreground">{t.buyer}</Td>
                  <Td className="text-card-foreground">{t.seller}</Td>
                  <Td className="text-right font-medium text-card-foreground">
                    {formatCurrency(t.amount)}
                  </Td>
                  <Td>
                    <StatusBadge tone={escrowTone(t.state)} dot>
                      {t.state}
                    </StatusBadge>
                  </Td>
                  <Td className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gold/40 text-gold hover:bg-gold/10 hover:text-gold"
                      >
                        <Unlock className="size-3.5" />
                        Release
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <RotateCcw className="size-3.5" />
                        Refund
                      </Button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}

function SummaryCard({
  label,
  value,
  hint,
  danger,
}: {
  label: string
  value: string
  hint: string
  danger?: boolean
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Landmark
          className={`size-4 ${danger ? 'text-destructive' : 'text-gold'}`}
        />
        {label}
      </div>
      <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-card-foreground">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  )
}
