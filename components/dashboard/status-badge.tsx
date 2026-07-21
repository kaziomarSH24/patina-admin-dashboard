import { cn } from '@/lib/utils'

type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'gold'

const toneStyles: Record<Tone, string> = {
  success:
    'bg-success/12 text-success ring-1 ring-inset ring-success/25',
  warning:
    'bg-warning/12 text-warning ring-1 ring-inset ring-warning/25',
  danger:
    'bg-destructive/12 text-destructive ring-1 ring-inset ring-destructive/25',
  info: 'bg-info/12 text-info ring-1 ring-inset ring-info/25',
  neutral:
    'bg-muted text-muted-foreground ring-1 ring-inset ring-border',
  gold: 'bg-gold/12 text-gold ring-1 ring-inset ring-gold/30',
}

export function StatusBadge({
  children,
  tone = 'neutral',
  dot = false,
  className,
}: {
  children: React.ReactNode
  tone?: Tone
  dot?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
        toneStyles[tone],
        className,
      )}
    >
      {dot && (
        <span
          className={cn('size-1.5 rounded-full', {
            'bg-success': tone === 'success',
            'bg-warning': tone === 'warning',
            'bg-destructive': tone === 'danger',
            'bg-info': tone === 'info',
            'bg-gold': tone === 'gold',
            'bg-muted-foreground': tone === 'neutral',
          })}
        />
      )}
      {children}
    </span>
  )
}

// Helpers mapping domain statuses to tones
export function listingTone(status: string): Tone {
  switch (status) {
    case 'Live':
      return 'success'
    case 'Under Review':
      return 'warning'
    case 'Rejected':
      return 'danger'
    case 'Sold':
      return 'info'
    default:
      return 'neutral'
  }
}

export function kycTone(status: string): Tone {
  switch (status) {
    case 'Verified':
      return 'success'
    case 'Pending':
      return 'warning'
    case 'Failed':
      return 'danger'
    default:
      return 'neutral'
  }
}

export function escrowTone(state: string): Tone {
  switch (state) {
    case 'Confirmed':
      return 'success'
    case 'Shipped':
      return 'info'
    case 'Payment Received':
      return 'gold'
    case 'Disputed':
      return 'danger'
    default:
      return 'neutral'
  }
}
