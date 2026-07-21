import {
  LayoutDashboard,
  ImageUp,
  ListChecks,
  Users,
  Store,
  Landmark,
  ShieldAlert,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

export type ViewKey =
  | 'analytics'
  | 'review'
  | 'listings'
  | 'users'
  | 'dealers'
  | 'escrow'
  | 'disputes'
  | 'price'

export interface NavItem {
  key: ViewKey
  label: string
  icon: LucideIcon
  badge?: number
}

export const navItems: NavItem[] = [
  { key: 'analytics', label: 'Analytics', icon: LayoutDashboard },
  { key: 'review', label: 'Photo Review Queue', icon: ImageUp, badge: 3 },
  { key: 'listings', label: 'Listings', icon: ListChecks },
  { key: 'users', label: 'Users', icon: Users },
  { key: 'dealers', label: 'Dealers', icon: Store },
  { key: 'escrow', label: 'Escrow', icon: Landmark },
  { key: 'disputes', label: 'Disputes', icon: ShieldAlert, badge: 2 },
  { key: 'price', label: 'Price Index', icon: TrendingUp },
]

export const viewTitles: Record<ViewKey, { title: string; subtitle: string }> =
  {
    analytics: {
      title: 'Analytics',
      subtitle: 'Marketplace health at a glance',
    },
    review: {
      title: 'Photo Review Queue',
      subtitle: 'Authenticate submissions before they go live',
    },
    listings: {
      title: 'Listings',
      subtitle: 'Every watch across the marketplace',
    },
    users: { title: 'Users', subtitle: 'Collectors and individual sellers' },
    dealers: {
      title: 'Dealers',
      subtitle: 'Verified trade partners and subscriptions',
    },
    escrow: {
      title: 'Escrow',
      subtitle: 'Funds held against active transactions',
    },
    disputes: {
      title: 'Disputes',
      subtitle: 'Cases awaiting resolution',
    },
    price: {
      title: 'Price Index',
      subtitle: 'Fair market value and trade signals',
    },
  }
