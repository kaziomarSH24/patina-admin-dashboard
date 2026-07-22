'use client'

import { useState } from 'react'
import {
  ShieldAlert,
  ArrowRight,
  Undo2,
  Clock,
  MessageSquare,
} from 'lucide-react'
import { toast } from 'sonner'
import { disputes, formatCurrency } from '@/lib/mock-data'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'

export function DisputesView() {
  const [disputesList, setDisputesList] = useState(
    disputes.map(d => ({ ...d, resolveState: 'open' as 'open' | 'seller' | 'buyer' }))
  )
  const [filter, setFilter] = useState<'open' | 'resolved'>('open')

  const handleResolve = (id: string, resolution: 'seller' | 'buyer') => {
    setDisputesList(prev => prev.map(d => d.id === id ? { ...d, resolveState: resolution } : d))
  }

  const filteredDisputes = disputesList.filter(d => 
    filter === 'open' ? d.resolveState === 'open' : d.resolveState !== 'open'
  )

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <button
          onClick={() => setFilter('open')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'open' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
          }`}
        >
          Open Disputes ({disputesList.filter(d=>d.resolveState==='open').length})
        </button>
        <button
          onClick={() => setFilter('resolved')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'resolved' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
          }`}
        >
          Resolved ({disputesList.filter(d=>d.resolveState!=='open').length})
        </button>
      </div>

      {filteredDisputes.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 text-muted-foreground">
          <ShieldAlert className="mb-2 size-6 opacity-50" />
          <p className="text-sm font-medium">No {filter} disputes</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredDisputes.map((d) => (
            <DisputeCard key={d.id} dispute={d} onResolve={handleResolve} />
          ))}
        </div>
      )}
    </div>
  )
}

function DisputeCard({ 
  dispute, 
  onResolve 
}: { 
  dispute: (typeof disputes)[number] & { resolveState?: 'open' | 'seller' | 'buyer' }
  onResolve: (id: string, resolution: 'seller' | 'buyer') => void
}) {
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
            {dispute.resolveState === 'open' ? (
              <StatusBadge tone="danger" dot>
                Disputed
              </StatusBadge>
            ) : (
              <StatusBadge tone="success">
                Resolved
              </StatusBadge>
            )}
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
        {dispute.resolveState === 'open' ? (
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button 
              className="bg-success text-success-foreground hover:bg-success/90"
              onClick={() => {
                toast.success(`Dispute ${dispute.id} resolved: Funds released to ${dispute.seller.name}`)
                onResolve(dispute.id, 'seller')
              }}
            >
              <ArrowRight className="size-4" />
              Resolve: Release to Seller
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                toast.info(`Dispute ${dispute.id} resolved: Refunded ${dispute.buyer.name}`)
                onResolve(dispute.id, 'buyer')
              }}
            >
              <Undo2 className="size-4" />
              Resolve: Refund Buyer
            </Button>
          </div>
        ) : (
          <div className="mt-3 flex items-center justify-end">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg border border-border">
              {dispute.resolveState === 'seller' ? (
                <>Funds released to <strong className="text-foreground">{dispute.seller.name}</strong></>
              ) : (
                <>Funds refunded to <strong className="text-foreground">{dispute.buyer.name}</strong></>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
