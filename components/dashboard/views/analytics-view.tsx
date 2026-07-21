'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Boxes,
  DollarSign,
  Timer,
  Landmark,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import {
  waitlistGrowth,
  sellerSplit,
  reviewTimes,
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const kpis = [
  {
    label: 'Total Live Listings',
    value: '4,281',
    delta: '+12.4%',
    up: true,
    icon: Boxes,
  },
  {
    label: 'GMV to Date',
    value: '$284.6M',
    delta: '+8.1%',
    up: true,
    icon: DollarSign,
  },
  {
    label: 'Avg Time to Sell',
    value: '18.3 days',
    delta: '-2.2 days',
    up: true,
    icon: Timer,
  },
  {
    label: 'Total Funds in Escrow',
    value: '$12.4M',
    delta: '+3.7%',
    up: true,
    icon: Landmark,
  },
  {
    label: 'KYC Pass Rate',
    value: '91.2%',
    delta: '-0.8%',
    up: false,
    icon: ShieldCheck,
  },
]

const donutColors = ['var(--color-gold)', 'var(--color-info)']

function ChartCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-5 shadow-sm',
        className,
      )}
    >
      <div className="mb-4">
        <h3 className="font-display text-base font-semibold text-card-foreground">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  )
}

export function AnalyticsView() {
  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.label}
              className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-gold/40"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-gold/15 group-hover:text-gold">
                  <Icon className="size-4.5" />
                </span>
                <span
                  className={cn(
                    'inline-flex items-center gap-0.5 text-xs font-medium',
                    kpi.up ? 'text-success' : 'text-destructive',
                  )}
                >
                  {kpi.up ? (
                    <ArrowUpRight className="size-3.5" />
                  ) : (
                    <ArrowDownRight className="size-3.5" />
                  )}
                  {kpi.delta}
                </span>
              </div>
              <p className="mt-4 font-display text-2xl font-semibold tracking-tight text-card-foreground">
                {kpi.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{kpi.label}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard
          title="Waitlist growth"
          subtitle="Cumulative sign-ups over time"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={waitlistGrowth}
              margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-gold)"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-gold)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v / 1000}k`}
              />
              <Tooltip content={<AreaTip />} cursor={{ stroke: 'var(--color-border)' }} />
              <Area
                type="monotone"
                dataKey="users"
                stroke="var(--color-gold)"
                strokeWidth={2}
                fill="url(#goldFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Seller split"
          subtitle="Dealer vs individual sellers"
        >
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={sellerSplit}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={82}
                  paddingAngle={3}
                  stroke="none"
                >
                  {sellerSplit.map((entry, i) => (
                    <Cell key={entry.name} fill={donutColors[i]} />
                  ))}
                </Pie>
                <Tooltip content={<DonutTip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 flex w-full flex-col gap-2">
              {sellerSplit.map((s, i) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: donutColors[i] }}
                    />
                    {s.name}
                  </span>
                  <span className="font-medium text-card-foreground">
                    {s.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      <ChartCard
        title="Photo check average review time"
        subtitle="Hours from submission to decision, last 7 days"
      >
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={reviewTimes}
            margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
          >
            <XAxis
              dataKey="day"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}h`}
            />
            <Tooltip content={<BarTip />} cursor={{ fill: 'var(--color-muted)', opacity: 0.4 }} />
            <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
              {reviewTimes.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={
                    entry.hours > 10
                      ? 'var(--color-destructive)'
                      : 'var(--color-gold)'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}

function TipShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-lg">
      {children}
    </div>
  )
}

function AreaTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <TipShell>
      <p className="mb-0.5 font-medium text-popover-foreground">{label}</p>
      <p className="text-muted-foreground">
        {payload[0].value.toLocaleString()} sign-ups
      </p>
    </TipShell>
  )
}

function DonutTip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  return (
    <TipShell>
      <p className="font-medium text-popover-foreground">
        {payload[0].name}: {payload[0].value}%
      </p>
    </TipShell>
  )
}

function BarTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <TipShell>
      <p className="mb-0.5 font-medium text-popover-foreground">{label}</p>
      <p className="text-muted-foreground">{payload[0].value}h avg review</p>
    </TipShell>
  )
}
