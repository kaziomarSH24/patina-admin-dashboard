'use client'

import { useState } from 'react'
import { Check, X, ChevronsUpDown } from 'lucide-react'
import { toast } from 'sonner'
import { dealers } from '@/lib/mock-data'
import { Panel, PanelToolbar, Th, Td } from '@/components/dashboard/panel'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'

function subTone(s: string) {
  if (s === 'Active') return 'success' as const
  if (s === 'Pending' || s === 'Application') return 'warning' as const
  return 'danger' as const
}

const tierTone: Record<string, 'gold' | 'neutral' | 'info'> = {
  Platinum: 'info',
  Gold: 'gold',
  Silver: 'neutral',
  Bronze: 'neutral',
}

export function DealersView() {
  const [dealersList, setDealersList] = useState(dealers)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)

  const handleApprove = (id: string, business: string) => {
    setDealersList(prev => prev.map(d => 
      d.id === id ? { ...d, subscription: 'Active', tier: d.requestedTier || d.tier, requestedTier: undefined } : d
    ))
    toast.success(`${business} dealer application approved`)
  }

  const handleReject = (id: string, business: string) => {
    setDealersList(prev => prev.filter(d => d.id !== id))
    toast.error(`${business} application rejected and removed`)
  }

  const handleTierChange = (id: string, business: string, newTier: string) => {
    setDealersList(prev => prev.map(d => 
      d.id === id ? { ...d, tier: newTier } : d
    ))
    setOpenDropdownId(null)
    toast.success(`${business} tier upgraded to ${newTier}`)
  }

  return (
    <Panel>
      <PanelToolbar
        count={dealers.length}
        countLabel="dealers"
        searchPlaceholder="Search business name..."
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <Th>Business</Th>
              <Th>Tier</Th>
              <Th>Listing Credit Usage</Th>
              <Th>Subscription</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {dealersList.map((d) => {
              const pct = Math.round((d.creditsUsed / d.creditsTotal) * 100)
              const isApp = d.subscription === 'Application'
              return (
                <tr key={d.id} className="transition-colors hover:bg-muted/40">
                  <Td>
                    <p className="font-medium text-card-foreground">
                      {d.business}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {d.contact} · Since {d.since}
                    </p>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <StatusBadge tone={tierTone[d.tier]}>
                        {d.tier}
                      </StatusBadge>
                      {d.requestedTier && (
                        <span className="text-xs text-muted-foreground">
                          → {d.requestedTier}
                        </span>
                      )}
                    </div>
                  </Td>
                  <Td>
                    <div className="w-40">
                      <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                        <span>
                          {d.creditsUsed}/{d.creditsTotal}
                        </span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${
                            pct > 85 ? 'bg-destructive' : 'bg-gold'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <StatusBadge tone={subTone(d.subscription)} dot>
                      {d.subscription}
                    </StatusBadge>
                  </Td>
                  <Td className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {isApp ? (
                        <>
                          <Button
                            size="sm"
                            className="bg-success text-success-foreground hover:bg-success/90"
                            onClick={() => handleApprove(d.id, d.business)}
                          >
                            <Check className="size-3.5" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleReject(d.id, d.business)}>
                            <X className="size-3.5" />
                            Reject
                          </Button>
                        </>
                      ) : (
                        <div className="relative">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setOpenDropdownId(openDropdownId === d.id ? null : d.id)}
                          >
                            <ChevronsUpDown className="size-3.5" />
                            Change tier
                          </Button>
                          
                          {openDropdownId === d.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setOpenDropdownId(null)} aria-hidden />
                              <div className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-lg border border-border bg-popover py-1 shadow-xl">
                                {['Platinum', 'Gold', 'Silver', 'Bronze'].map((tierOption) => (
                                  <button
                                    key={tierOption}
                                    onClick={() => handleTierChange(d.id, d.business, tierOption)}
                                    className={`w-full px-3 py-2 text-left text-sm hover:bg-muted ${
                                      d.tier === tierOption ? 'font-medium text-gold' : 'text-foreground'
                                    }`}
                                  >
                                    {tierOption}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
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
