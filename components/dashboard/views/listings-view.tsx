'use client'

import { useState } from 'react'
import { ChevronDown, BadgeCheck, Eye, MoreHorizontal } from 'lucide-react'
import { listings, formatCurrency, type Listing } from '@/lib/mock-data'
import { Panel, PanelToolbar, Th, Td } from '@/components/dashboard/panel'
import {
  StatusBadge,
  listingTone,
} from '@/components/dashboard/status-badge'
import { PhotoReviewModal } from '@/components/dashboard/photo-review-modal'
import { Button } from '@/components/ui/button'

const statusFilters = ['All', 'Live', 'Under Review', 'Rejected', 'Sold']

export function ListingsView({ reviewOnly = false }: { reviewOnly?: boolean }) {
  const [filter, setFilter] = useState(reviewOnly ? 'Under Review' : 'All')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState<Listing | null>(null)

  const rows = listings.filter((l) => {
    if (reviewOnly) return l.status === 'Under Review'
    return filter === 'All' ? true : l.status === filter
  })

  return (
    <>
      {reviewOnly && (
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-warning/25 bg-warning/8 p-4">
          <span className="flex size-10 items-center justify-center rounded-lg bg-warning/15 text-warning">
            <Eye className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">
              {rows.length} submissions awaiting authentication
            </p>
            <p className="text-xs text-muted-foreground">
              Approve, reject, or award a verified badge before listings go
              live. 2 are approaching the 24h SLA.
            </p>
          </div>
          <Button
            className="bg-gold text-primary-foreground hover:bg-gold/90"
            onClick={() => rows[0] && setSelected(rows[0])}
          >
            Start reviewing
          </Button>
        </div>
      )}

      <Panel>
        <PanelToolbar
          count={rows.length}
          countLabel={reviewOnly ? 'in queue' : 'listings'}
          searchPlaceholder="Search brand, model, or seller..."
        >
          {!reviewOnly && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground hover:bg-muted"
                aria-expanded={menuOpen}
              >
                Status: <span className="font-medium">{filter}</span>
                <ChevronDown className="size-4 text-muted-foreground" />
              </button>
              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setMenuOpen(false)}
                    aria-hidden
                  />
                  <div className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-lg border border-border bg-popover py-1 shadow-xl">
                    {statusFilters.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setFilter(s)
                          setMenuOpen(false)
                        }}
                        className={`flex w-full items-center px-3 py-2 text-left text-sm hover:bg-muted ${
                          filter === s
                            ? 'font-medium text-gold'
                            : 'text-foreground'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </PanelToolbar>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <Th>Watch</Th>
                <Th>Seller</Th>
                <Th>Status</Th>
                <Th className="text-center">Verified</Th>
                <Th className="text-right">Price</Th>
                <Th className="text-center">Enquiries</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((l) => (
                <tr
                  key={l.id}
                  className="group transition-colors hover:bg-muted/40"
                >
                  <Td>
                    <div className="flex items-center gap-3">
                      <img
                        src={l.image || '/placeholder.svg'}
                        alt={`${l.brand} ${l.model}`}
                        className="size-11 rounded-lg border border-border object-cover"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-card-foreground">
                          {l.brand}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {l.model}
                        </p>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <p className="text-card-foreground">{l.seller}</p>
                    <p className="text-xs text-muted-foreground">
                      {l.sellerType}
                    </p>
                  </Td>
                  <Td>
                    <StatusBadge tone={listingTone(l.status)} dot>
                      {l.status}
                    </StatusBadge>
                  </Td>
                  <Td className="text-center">
                    {l.verified ? (
                      <BadgeCheck
                        className="mx-auto size-5 text-gold"
                        aria-label="Verified"
                      />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </Td>
                  <Td className="text-right font-medium text-card-foreground">
                    {formatCurrency(l.price)}
                  </Td>
                  <Td className="text-center text-muted-foreground">
                    {l.enquiries}
                  </Td>
                  <Td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {l.status === 'Under Review' ? (
                        <Button
                          size="sm"
                          className="bg-gold text-primary-foreground hover:bg-gold/90"
                          onClick={() => setSelected(l)}
                        >
                          Review
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelected(l)}
                        >
                          View
                        </Button>
                      )}
                      <Button size="icon-sm" variant="ghost" aria-label="More">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted-foreground">
          <span>
            Showing 1–{rows.length} of {rows.length}
          </span>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="outline" disabled>
              Previous
            </Button>
            <Button size="sm" variant="outline" disabled>
              Next
            </Button>
          </div>
        </div>
      </Panel>

      <PhotoReviewModal listing={selected} onClose={() => setSelected(null)} />
    </>
  )
}
