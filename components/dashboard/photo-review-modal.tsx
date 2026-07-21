'use client'

import { useEffect, useState } from 'react'
import {
  X,
  Check,
  Ban,
  BadgeCheck,
  ShieldCheck,
  Clock,
  User,
} from 'lucide-react'
import type { Listing } from '@/lib/mock-data'
import { photoDetailImages, formatCurrency } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'

export function PhotoReviewModal({
  listing,
  onClose,
}: {
  listing: Listing | null
  onClose: () => void
}) {
  const [zoom, setZoom] = useState<string | null>(null)

  useEffect(() => {
    if (!listing) return
    setZoom(photoDetailImages[0].src)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [listing, onClose])

  if (!listing) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="animate-in slide-in-from-right relative flex h-full w-full max-w-2xl flex-col border-l border-border bg-background shadow-2xl duration-300">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-full bg-warning/12 px-2 py-0.5 text-xs font-medium text-warning ring-1 ring-inset ring-warning/25">
                Under Review
              </span>
              <span className="text-xs text-muted-foreground">
                {listing.id}
              </span>
            </div>
            <h2 className="font-display truncate text-lg font-semibold text-foreground">
              {listing.brand} {listing.model}
            </h2>
            <p className="text-xs text-muted-foreground">Ref. {listing.ref}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close review panel"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Main preview */}
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <img
              src={zoom ?? photoDetailImages[0].src}
              alt="Selected watch submission"
              className="aspect-video w-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          <p className="mt-4 mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Submitted photos ({photoDetailImages.length})
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {photoDetailImages.map((p) => (
              <button
                key={p.label}
                onClick={() => setZoom(p.src)}
                className={`group relative overflow-hidden rounded-lg border transition-all ${
                  zoom === p.src
                    ? 'border-gold ring-2 ring-gold/30'
                    : 'border-border hover:border-gold/50'
                }`}
                title={p.label}
              >
                <img
                  src={p.src || '/placeholder.svg'}
                  alt={p.label}
                  className="aspect-square w-full object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-black/60 px-1 py-0.5 text-[10px] text-white/90">
                  {p.label}
                </span>
              </button>
            ))}
          </div>

          {/* Meta */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <MetaCell
              icon={<User className="size-4" />}
              label="Seller"
              value={`${listing.seller} · ${listing.sellerType}`}
            />
            <MetaCell
              icon={<span className="text-sm font-semibold text-gold">$</span>}
              label="Asking price"
              value={formatCurrency(listing.price)}
            />
            <MetaCell
              icon={<Clock className="size-4" />}
              label="Submitted"
              value={listing.submitted}
            />
            <MetaCell
              icon={<ShieldCheck className="size-4" />}
              label="Brand certificate"
              value="Attached (PDF)"
            />
          </div>

          {/* Condition notes */}
          <div className="mt-5 rounded-xl border border-border bg-card p-4">
            <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Seller condition notes
            </p>
            <p className="text-sm leading-relaxed text-card-foreground">
              {listing.conditionNotes}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-border bg-card/40 px-6 py-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button
              size="lg"
              className="h-11 bg-success text-success-foreground hover:bg-success/90"
              onClick={onClose}
            >
              <Check className="size-4" />
              Approve &amp; Go Live
            </Button>
            <Button
              size="lg"
              variant="destructive"
              className="h-11"
              onClick={onClose}
            >
              <Ban className="size-4" />
              Reject with Reason
            </Button>
          </div>
          <Button
            size="lg"
            variant="outline"
            className="mt-2 h-11 w-full border-gold/40 text-gold hover:bg-gold/10 hover:text-gold"
            onClick={onClose}
          >
            <BadgeCheck className="size-4" />
            Award Verified Badge
          </Button>
        </div>
      </div>
    </div>
  )
}

function MetaCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-card-foreground">
          {value}
        </p>
      </div>
    </div>
  )
}
