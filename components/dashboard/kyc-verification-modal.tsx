'use client'

import { useEffect } from 'react'
import {
  X,
  CheckCircle2,
  XCircle,
  FileCheck,
  Camera,
  AlertCircle
} from 'lucide-react'
import type { User } from '@/lib/mock-data'
import { StatusBadge, kycTone } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function KycVerificationModal({
  user,
  onClose,
}: {
  user: User | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!user) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [user, onClose])

  if (!user) return null

  const handleApprove = () => {
    toast.success(`KYC Approved for ${user.name}`)
    onClose()
  }

  const handleReject = () => {
    toast.error(`KYC Rejected for ${user.name}`)
    onClose()
  }

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
              <StatusBadge tone={kycTone(user.kyc)} dot>
                {user.kyc}
              </StatusBadge>
              <span className="text-xs text-muted-foreground">
                {user.id}
              </span>
            </div>
            <h2 className="font-display truncate text-lg font-semibold text-foreground">
              KYC Verification: {user.name}
            </h2>
            <p className="text-xs text-muted-foreground">{user.email} · {user.phone}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {user.kyc === 'Pending' && (
             <div className="mb-6 flex items-center gap-3 rounded-lg border border-warning/30 bg-warning/10 p-3 text-warning">
               <AlertCircle className="size-5" />
               <p className="text-sm">This user requires manual identity verification. Please review the documents below.</p>
             </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ID Document */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <FileCheck className="size-4 text-muted-foreground" /> Government ID
              </h3>
              
              <div className="space-y-3">
                <div className="rounded-xl border border-border overflow-hidden bg-muted">
                  {/* Mock ID Front Image */}
                  <div className="aspect-[1.6] w-full bg-[url('https://images.unsplash.com/photo-1621360841013-c76831f1628f?w=600&q=80')] bg-cover bg-center flex items-center justify-center opacity-80 mix-blend-luminosity">
                    <div className="bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-border">ID Front</div>
                  </div>
                </div>
                
                <div className="rounded-xl border border-border overflow-hidden bg-muted">
                  {/* Mock ID Back Image */}
                  <div className="aspect-[1.6] w-full bg-[url('https://images.unsplash.com/photo-1621360841013-c76831f1628f?w=600&q=80')] bg-cover bg-center flex items-center justify-center opacity-60 mix-blend-luminosity grayscale">
                    <div className="bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-border">ID Back</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Selfie */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Camera className="size-4 text-muted-foreground" /> Selfie with ID
              </h3>
              
              <div className="rounded-xl border border-border overflow-hidden bg-muted h-[calc(100%-2rem)]">
                {/* Mock Selfie Image */}
                <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80')] bg-cover bg-center flex items-center justify-center">
                   <div className="mt-auto mb-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-border">Facial Match: 98%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3 rounded-xl border border-border bg-card p-4">
             <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Extracted Information</h4>
             <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Full Name</p>
                  <p className="font-medium text-card-foreground">{user.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date of Birth</p>
                  <p className="font-medium text-card-foreground">12 Aug 1988</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Document No.</p>
                  <p className="font-medium text-card-foreground">ABC987654321</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Expiry Date</p>
                  <p className="font-medium text-card-foreground">01 Jan 2030</p>
                </div>
             </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-border bg-card/40 px-6 py-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              className="bg-success text-success-foreground hover:bg-success/90 h-11"
              onClick={handleApprove}
            >
              <CheckCircle2 className="size-4 mr-2" />
              Approve KYC
            </Button>
            <Button 
              variant="destructive" 
              className="h-11"
              onClick={handleReject}
            >
              <XCircle className="size-4 mr-2" />
              Reject & Request Resubmission
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
