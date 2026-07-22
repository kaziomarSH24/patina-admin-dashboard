'use client'

import { useState } from 'react'
import { History, ShieldCheck, UserX } from 'lucide-react'
import { toast } from 'sonner'
import { users, type User } from '@/lib/mock-data'
import { Panel, PanelToolbar, Th, Td } from '@/components/dashboard/panel'
import { StatusBadge, kycTone } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'
import { UserHistoryModal } from '@/components/dashboard/user-history-modal'
import { KycVerificationModal } from '@/components/dashboard/kyc-verification-modal'

function standingTone(s: string) {
  if (s === 'Good') return 'success' as const
  if (s === 'Watchlist') return 'warning' as const
  return 'danger' as const
}

export function UsersView() {
  const [historyUser, setHistoryUser] = useState<User | null>(null)
  const [kycUser, setKycUser] = useState<User | null>(null)

  return (
    <>
      <Panel>
      <PanelToolbar
        count={users.length}
        countLabel="users"
        searchPlaceholder="Search name or email..."
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <Th>Name</Th>
              <Th>Contact</Th>
              <Th>KYC Status</Th>
              <Th>Account Standing</Th>
              <Th className="text-center">Buys / Sells</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((u) => (
              <tr key={u.id} className="transition-colors hover:bg-muted/40">
                <Td>
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                      {u.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                    <div>
                      <p className="font-medium text-card-foreground">
                        {u.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {u.id} · Joined {u.joined}
                      </p>
                    </div>
                  </div>
                </Td>
                <Td>
                  <p className="text-card-foreground">{u.email}</p>
                  <p className="text-xs text-muted-foreground">{u.phone}</p>
                </Td>
                <Td>
                  <StatusBadge tone={kycTone(u.kyc)} dot>
                    {u.kyc}
                  </StatusBadge>
                </Td>
                <Td>
                  <StatusBadge tone={standingTone(u.standing)}>
                    {u.standing}
                  </StatusBadge>
                </Td>
                <Td className="text-center text-muted-foreground">
                  <span className="text-card-foreground">{u.purchases}</span> /{' '}
                  <span className="text-card-foreground">{u.sales}</span>
                </Td>
                <Td className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button 
                      size="icon-sm" 
                      variant="ghost" 
                      aria-label="View history"
                      onClick={() => setHistoryUser(u)}
                    >
                      <History className="size-4" />
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label="Trigger KYC check"
                      onClick={() => setKycUser(u)}
                    >
                      <ShieldCheck className="size-4" />
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Suspend account"
                      onClick={() => toast.error(`Account suspended for ${u.name}`)}
                    >
                      <UserX className="size-4" />
                    </Button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>

    <UserHistoryModal 
      user={historyUser} 
      onClose={() => setHistoryUser(null)} 
    />
    
    <KycVerificationModal 
      user={kycUser} 
      onClose={() => setKycUser(null)} 
    />
    </>
  )
}
