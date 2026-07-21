// Mock data for the Patina admin console.
// All data is illustrative and lives client-side for this demo.

export type ListingStatus = 'Live' | 'Under Review' | 'Rejected' | 'Sold'
export type KycStatus = 'Verified' | 'Pending' | 'Failed'
export type EscrowState =
  | 'Payment Received'
  | 'Shipped'
  | 'Confirmed'
  | 'Disputed'

export const watchImages = {
  submariner: '/watches/submariner.png',
  nautilus: '/watches/nautilus.png',
  royalOak: '/watches/royal-oak.png',
  speedmaster: '/watches/speedmaster.png',
  tank: '/watches/tank.png',
  datejust: '/watches/datejust.png',
}

export const photoDetailImages = [
  { label: 'Dial', src: '/watches/dial-macro.png' },
  { label: 'Case front', src: '/watches/submariner.png' },
  { label: 'Caseback', src: '/watches/caseback.png' },
  { label: 'Case side', src: '/watches/case-side.png' },
  { label: 'Bracelet', src: '/watches/nautilus.png' },
  { label: 'Clasp', src: '/watches/clasp.png' },
]

export interface Listing {
  id: string
  image: string
  brand: string
  model: string
  ref: string
  seller: string
  sellerType: 'Dealer' | 'Individual'
  status: ListingStatus
  verified: boolean
  price: number
  enquiries: number
  submitted: string
  conditionNotes: string
}

export const listings: Listing[] = [
  {
    id: 'PAT-10241',
    image: watchImages.nautilus,
    brand: 'Patek Philippe',
    model: 'Nautilus 5711/1A',
    ref: '5711/1A-010',
    seller: 'Geneva Time Co.',
    sellerType: 'Dealer',
    status: 'Under Review',
    verified: false,
    price: 142500,
    enquiries: 0,
    submitted: '3h ago',
    conditionNotes:
      'Unworn, full set with box and papers dated 2021. Factory stickers intact on caseback and clasp. Never polished.',
  },
  {
    id: 'PAT-10238',
    image: watchImages.royalOak,
    brand: 'Audemars Piguet',
    model: 'Royal Oak 15500ST',
    ref: '15500ST.OO.1220ST.03',
    seller: 'Mayfair Horology',
    sellerType: 'Dealer',
    status: 'Live',
    verified: true,
    price: 48900,
    enquiries: 27,
    submitted: '2d ago',
    conditionNotes:
      'Excellent condition, light wear on bracelet. Serviced by AP in 2023. Complete set.',
  },
  {
    id: 'PAT-10233',
    image: watchImages.submariner,
    brand: 'Rolex',
    model: 'Submariner Date',
    ref: '126610LN',
    seller: 'James Whitfield',
    sellerType: 'Individual',
    status: 'Under Review',
    verified: false,
    price: 15250,
    enquiries: 0,
    submitted: '6h ago',
    conditionNotes:
      'Purchased new in 2022, worn occasionally. Minor hairlines on clasp. Box and card included.',
  },
  {
    id: 'PAT-10229',
    image: watchImages.speedmaster,
    brand: 'Omega',
    model: 'Speedmaster Professional',
    ref: '310.30.42.50.01.001',
    seller: 'Elena Rossi',
    sellerType: 'Individual',
    status: 'Live',
    verified: true,
    price: 6800,
    enquiries: 12,
    submitted: '5d ago',
    conditionNotes:
      'Moonwatch, hesalite crystal. Excellent condition with full kit.',
  },
  {
    id: 'PAT-10221',
    image: watchImages.datejust,
    brand: 'Rolex',
    model: 'Datejust 36',
    ref: '126234',
    seller: 'Heritage Dials Ltd.',
    sellerType: 'Dealer',
    status: 'Sold',
    verified: true,
    price: 9450,
    enquiries: 41,
    submitted: '3w ago',
    conditionNotes: 'Sold via escrow. Jubilee bracelet, fluted bezel.',
  },
  {
    id: 'PAT-10218',
    image: watchImages.tank,
    brand: 'Cartier',
    model: 'Tank Louis Cartier',
    ref: 'WGTA0091',
    seller: 'Anonymous Seller',
    sellerType: 'Individual',
    status: 'Rejected',
    verified: false,
    price: 11200,
    enquiries: 0,
    submitted: '1d ago',
    conditionNotes:
      'Photos too low resolution, serial number not visible. Requested resubmission.',
  },
  {
    id: 'PAT-10215',
    image: watchImages.nautilus,
    brand: 'Patek Philippe',
    model: 'Aquanaut 5167A',
    ref: '5167A-001',
    seller: 'Geneva Time Co.',
    sellerType: 'Dealer',
    status: 'Live',
    verified: true,
    price: 62000,
    enquiries: 33,
    submitted: '1w ago',
    conditionNotes: 'Full set, unworn. Tropical strap included.',
  },
  {
    id: 'PAT-10209',
    image: watchImages.submariner,
    brand: 'Rolex',
    model: 'GMT-Master II Pepsi',
    ref: '126710BLRO',
    seller: 'Marcus Chen',
    sellerType: 'Individual',
    status: 'Under Review',
    verified: false,
    price: 21800,
    enquiries: 0,
    submitted: '9h ago',
    conditionNotes:
      'Jubilee bracelet. Worn twice. Complete set with warranty card.',
  },
]

export const reviewQueue = listings.filter((l) => l.status === 'Under Review')

export interface User {
  id: string
  name: string
  email: string
  phone: string
  kyc: KycStatus
  standing: 'Good' | 'Watchlist' | 'Suspended'
  joined: string
  purchases: number
  sales: number
}

export const users: User[] = [
  {
    id: 'U-8841',
    name: 'James Whitfield',
    email: 'j.whitfield@email.com',
    phone: '+44 7700 900321',
    kyc: 'Verified',
    standing: 'Good',
    joined: 'Mar 2023',
    purchases: 4,
    sales: 2,
  },
  {
    id: 'U-8837',
    name: 'Elena Rossi',
    email: 'elena.rossi@email.com',
    phone: '+39 320 555 0198',
    kyc: 'Verified',
    standing: 'Good',
    joined: 'Jan 2023',
    purchases: 1,
    sales: 6,
  },
  {
    id: 'U-8829',
    name: 'Marcus Chen',
    email: 'm.chen@email.com',
    phone: '+65 8123 4567',
    kyc: 'Pending',
    standing: 'Watchlist',
    joined: 'Jul 2026',
    purchases: 0,
    sales: 1,
  },
  {
    id: 'U-8814',
    name: 'Sofia Alvarez',
    email: 's.alvarez@email.com',
    phone: '+34 612 345 678',
    kyc: 'Verified',
    standing: 'Good',
    joined: 'Nov 2022',
    purchases: 9,
    sales: 3,
  },
  {
    id: 'U-8802',
    name: 'Dmitri Volkov',
    email: 'd.volkov@email.com',
    phone: '+7 495 555 2210',
    kyc: 'Failed',
    standing: 'Suspended',
    joined: 'Jun 2026',
    purchases: 0,
    sales: 0,
  },
  {
    id: 'U-8790',
    name: 'Aisha Rahman',
    email: 'a.rahman@email.com',
    phone: '+971 50 123 4567',
    kyc: 'Pending',
    standing: 'Good',
    joined: 'Jul 2026',
    purchases: 2,
    sales: 0,
  },
]

export interface Dealer {
  id: string
  business: string
  contact: string
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
  requestedTier?: 'Silver' | 'Gold' | 'Platinum'
  creditsUsed: number
  creditsTotal: number
  subscription: 'Active' | 'Pending' | 'Past Due' | 'Application'
  since: string
}

export const dealers: Dealer[] = [
  {
    id: 'D-204',
    business: 'Geneva Time Co.',
    contact: 'Laurent Dubois',
    tier: 'Platinum',
    creditsUsed: 84,
    creditsTotal: 120,
    subscription: 'Active',
    since: '2021',
  },
  {
    id: 'D-198',
    business: 'Mayfair Horology',
    contact: 'Oliver Bennett',
    tier: 'Gold',
    requestedTier: 'Platinum',
    creditsUsed: 47,
    creditsTotal: 60,
    subscription: 'Active',
    since: '2022',
  },
  {
    id: 'D-187',
    business: 'Heritage Dials Ltd.',
    contact: 'Priya Nair',
    tier: 'Gold',
    creditsUsed: 52,
    creditsTotal: 60,
    subscription: 'Past Due',
    since: '2022',
  },
  {
    id: 'D-231',
    business: 'Nordic Chronometers',
    contact: 'Erik Lindqvist',
    tier: 'Bronze',
    requestedTier: 'Gold',
    creditsUsed: 8,
    creditsTotal: 20,
    subscription: 'Application',
    since: '2026',
  },
  {
    id: 'D-225',
    business: 'Kansai Watch House',
    contact: 'Hiroshi Tanaka',
    tier: 'Silver',
    creditsUsed: 19,
    creditsTotal: 40,
    subscription: 'Active',
    since: '2024',
  },
]

export interface EscrowTxn {
  id: string
  watch: string
  ref: string
  image: string
  buyer: string
  seller: string
  amount: number
  state: EscrowState
  updated: string
}

export const escrowTxns: EscrowTxn[] = [
  {
    id: 'ESC-5521',
    watch: 'Rolex Datejust 36',
    ref: '126234',
    image: watchImages.datejust,
    buyer: 'Sofia Alvarez',
    seller: 'Heritage Dials Ltd.',
    amount: 9450,
    state: 'Confirmed',
    updated: '1h ago',
  },
  {
    id: 'ESC-5518',
    watch: 'AP Royal Oak 15500ST',
    ref: '15500ST',
    image: watchImages.royalOak,
    buyer: 'Marcus Chen',
    seller: 'Mayfair Horology',
    amount: 48900,
    state: 'Shipped',
    updated: '5h ago',
  },
  {
    id: 'ESC-5514',
    watch: 'Omega Speedmaster Pro',
    ref: '310.30',
    image: watchImages.speedmaster,
    buyer: 'James Whitfield',
    seller: 'Elena Rossi',
    amount: 6800,
    state: 'Payment Received',
    updated: '12h ago',
  },
  {
    id: 'ESC-5509',
    watch: 'Patek Aquanaut 5167A',
    ref: '5167A',
    image: watchImages.nautilus,
    buyer: 'Aisha Rahman',
    seller: 'Geneva Time Co.',
    amount: 62000,
    state: 'Disputed',
    updated: '2d ago',
  },
  {
    id: 'ESC-5501',
    watch: 'Rolex Submariner Date',
    ref: '126610LN',
    image: watchImages.submariner,
    buyer: 'Dmitri Volkov',
    seller: 'James Whitfield',
    amount: 15250,
    state: 'Payment Received',
    updated: '3d ago',
  },
]

export interface Dispute {
  id: string
  txnId: string
  watch: string
  image: string
  amount: number
  opened: string
  ageHours: number
  buyer: { name: string; claim: string }
  seller: { name: string; response: string }
}

export const disputes: Dispute[] = [
  {
    id: 'DSP-118',
    txnId: 'ESC-5509',
    watch: 'Patek Aquanaut 5167A',
    image: watchImages.nautilus,
    amount: 62000,
    opened: '2 days ago',
    ageHours: 52,
    buyer: {
      name: 'Aisha Rahman',
      claim:
        'The watch arrived with visible scratches on the caseback that were not shown in the listing photos. The condition does not match the "unworn" description. Requesting a full refund.',
    },
    seller: {
      name: 'Geneva Time Co.',
      response:
        'The watch was shipped unworn in original packaging. Any marks may have occurred during buyer handling. We have insured shipping photos taken before dispatch.',
    },
  },
  {
    id: 'DSP-115',
    txnId: 'ESC-5482',
    watch: 'Tudor Black Bay 58',
    image: watchImages.submariner,
    amount: 3900,
    opened: '4 days ago',
    ageHours: 96,
    buyer: {
      name: 'Marcus Chen',
      claim:
        'Item was never delivered. Tracking shows "delivered" but nothing arrived at my address. Courier investigation is inconclusive.',
    },
    seller: {
      name: 'Kansai Watch House',
      response:
        'Package was dispatched with signature-on-delivery and shows as signed for. We have provided the courier proof of delivery.',
    },
  },
]

export interface PriceIndexRow {
  model: string
  ref: string
  fmv: number
  change30d: number
  liveCount: number
  signal: 'Buy' | 'Hold' | 'Sell'
}

export const priceIndex: PriceIndexRow[] = [
  {
    model: 'Rolex Submariner Date',
    ref: '126610LN',
    fmv: 14800,
    change30d: -2.4,
    liveCount: 218,
    signal: 'Buy',
  },
  {
    model: 'Patek Philippe Nautilus',
    ref: '5711/1A',
    fmv: 138900,
    change30d: 1.8,
    liveCount: 42,
    signal: 'Hold',
  },
  {
    model: 'AP Royal Oak 15500ST',
    ref: '15500ST',
    fmv: 47200,
    change30d: -5.1,
    liveCount: 87,
    signal: 'Buy',
  },
  {
    model: 'Omega Speedmaster Pro',
    ref: '310.30',
    fmv: 6650,
    change30d: 0.3,
    liveCount: 156,
    signal: 'Hold',
  },
  {
    model: 'Rolex Daytona',
    ref: '126500LN',
    fmv: 31500,
    change30d: 6.7,
    liveCount: 61,
    signal: 'Sell',
  },
  {
    model: 'Cartier Tank Louis',
    ref: 'WGTA0091',
    fmv: 10900,
    change30d: 2.1,
    liveCount: 74,
    signal: 'Hold',
  },
  {
    model: 'Rolex GMT-Master II',
    ref: '126710BLRO',
    fmv: 20400,
    change30d: -3.8,
    liveCount: 103,
    signal: 'Buy',
  },
]

// Chart data
export const waitlistGrowth = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1850 },
  { month: 'Mar', users: 2600 },
  { month: 'Apr', users: 3400 },
  { month: 'May', users: 4900 },
  { month: 'Jun', users: 6800 },
  { month: 'Jul', users: 9200 },
]

export const sellerSplit = [
  { name: 'Dealers', value: 62 },
  { name: 'Individuals', value: 38 },
]

export const reviewTimes = [
  { day: 'Mon', hours: 8.2 },
  { day: 'Tue', hours: 6.5 },
  { day: 'Wed', hours: 9.1 },
  { day: 'Thu', hours: 5.4 },
  { day: 'Fri', hours: 7.8 },
  { day: 'Sat', hours: 11.3 },
  { day: 'Sun', hours: 10.6 },
]

export const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
