'use client'

import { useState } from 'react'
import {
  ShieldAlert,
  ArrowRight,
  Undo2,
  Clock,
  MessageSquare,
} from 'lucide-react'
import { disputes, formatCurrency } from '@/lib/mock-data'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'

export function DisputesView() {
  return (
    <div className="space-y-5">
      {disputes.map((d) => (
        <DisputeCard key={d.id} dispute={d} />
      ))}
    </div>
  )
}

function DisputeCard({ dispute }: { dispute: (typeof disputes)[number] }) {
  const [note, setNote] = useState('')
  const overdue = dispute.ageHours > 48

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
        <img
          src={dispute.image || '/placeholder.svg'}
          alt={dispute.watch}
          className="size-12 rounded-lg border border-border object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold text-card-foreground">
              {dispute.watch}
            </h3>
            <StatusBadge tone="danger" dot>
              Disputed
            </StatusBadge>
          </div>
          <p className="text-xs text-muted-foreground">
            {dispute.id} · Transaction {dispute.txnId} ·{' '}
            {formatCurrency(dispute.amount)}
          </p>
        </div>
        <StatusBadge tone={overdue ? 'danger' : 'warning'}>
          <Clock className="size-3" />
          Open {dispute.opened}
        </StatusBadge>
      </div>

      {/* Split view */}
      <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-destructive/15 text-destructive">
              <ShieldAlert className="size-3.5" />
            </span>
            <p className="text-sm font-semibold text-card-foreground">
              Buyer · {dispute.buyer.name}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {dispute.buyer.claim}
          </p>
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-full bg-info/15 text-info">
              <MessageSquare className="size-3.5" />
            </span>
            <p className="text-sm font-semibold text-card-foreground">
              Seller · {dispute.seller.name}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {dispute.seller.response}
          </p>
        </div>
      </div>

      {/* Internal notes */}
      <div className="border-t border-border bg-muted/20 p-4">
        <label className="mb-2 block text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Internal notes
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="Add a private note for the ops team..."
          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-gold/50 focus:ring-2 focus:ring-gold/20"
        />
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button className="bg-success text-success-foreground hover:bg-success/90">
            <ArrowRight className="size-4" />
            Resolve: Release to Seller
          </Button>
          <Button variant="destructive">
            <Undo2 className="size-4" />
            Resolve: Refund Buyer
          </Button>
        </div>
      </div>
    </div>
  )
}
