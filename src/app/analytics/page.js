"use client";

import {
  Activity,
  CalendarDays,
  Clock3,
  MapPin,
  Power,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";

import AppShell from "../../components/AppShell";

const availabilityData = [
  { day: "Mon", availability: 72 },
  { day: "Tue", availability: 68 },
  { day: "Wed", availability: 81 },
  { day: "Thu", availability: 76 },
  { day: "Fri", availability: 84 },
  { day: "Sat", availability: 79 },
  { day: "Sun", availability: 88 },
];

const outageData = [
  { area: "Akobo", outages: 8 },
  { area: "Bodija", outages: 5 },
  { area: "Mokola", outages: 7 },
  { area: "Oluyole", outages: 4 },
  { area: "Challenge", outages: 6 },
];

const summaryCards = [
  {
    title: "Power Availability",
    value: "78%",
    change: "+6.4%",
    description: "Compared with last week",
    icon: Power,
    trend: "up",
  },
  {
    title: "Total Outages",
    value: "37",
    change: "-12%",
    description: "Compared with last week",
    icon: Activity,
    trend: "down",
  },
  {
    title: "Average Duration",
    value: "2h 18m",
    change: "-18%",
    description: "Compared with last month",
    icon: Clock3,
    trend: "down",
  },
  {
    title: "Reports",
    value: "148",
    change: "+18",
    description: "Submitted this month",
    icon: Zap,
    trend: "up",
  },
];

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-1 text-sm font-medium text-purple-600">
                Power Intelligence
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Analytics
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                Understand power availability, outage patterns, and community
                reports over time.
              </p>
            </div>

            {/* Date filter */}
            <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition hover:border-purple-200 hover:text-purple-600">
              <CalendarDays className="h-4 w-4" />
              Last 7 days
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                    <Icon className="h-5 w-5 text-purple-600" />
                  </div>

                  <span
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      card.trend === "up"
                        ? "bg-green-50 text-green-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {card.trend === "up" ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}

                    {card.change}
                  </span>
                </div>

                <p className="text-sm text-gray-500">{card.title}</p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  {card.value}
                </h2>

                <p className="mt-1 text-xs text-gray-400">{card.description}</p>
              </div>
            );
          })}
        </section>

        {/* Main charts */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Availability chart */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Power Availability
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Electricity availability over the last 7 days
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <span className="h-2.5 w-2.5 rounded-full bg-purple-600" />
                Availability
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={availabilityData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="availabilityGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#7c3aed"
                        stopOpacity={0.25}
                      />

                      <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f1f1"
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />

                  <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    tickFormatter={(value) => `${value}%`}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #f3f4f6",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                    }}
                    formatter={(value) => [`${value}%`, "Availability"]}
                  />

                  <Area
                    type="monotone"
                    dataKey="availability"
                    stroke="#7c3aed"
                    strokeWidth={3}
                    fill="url(#availabilityGradient)"
                    dot={{
                      r: 4,
                      fill: "#7c3aed",
                      strokeWidth: 2,
                      stroke: "#fff",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Current location */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">Your Area</h2>

              <p className="mt-1 text-sm text-gray-400">
                Current power situation
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-500 p-5 text-white">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-purple-100">Location</p>

                  <p className="font-semibold">Akobo, Ibadan</p>
                </div>
              </div>

              <p className="text-sm text-purple-100">Current status</p>

              <div className="mt-1 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

                <p className="text-xl font-bold">Power Available</p>
              </div>

              <div className="mt-6 border-t border-white/15 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-100">Availability</span>

                  <span className="font-bold">78%</span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: "78%" }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div>
                <p className="text-xs text-gray-400">Last outage</p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  Yesterday
                </p>
              </div>

              <Clock3 className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </section>

        {/* Outage chart + insights */}
        <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Outage chart */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Outages by Area
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Number of reported outages this week
              </p>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={outageData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f1f1"
                  />

                  <XAxis
                    dataKey="area"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />

                  <Tooltip
                    cursor={{ fill: "#fafafa" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #f3f4f6",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                    }}
                  />

                  <Bar
                    dataKey="outages"
                    fill="#7c3aed"
                    radius={[8, 8, 0, 0]}
                    barSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900">Key Insights</h2>

              <p className="mt-1 text-sm text-gray-400">
                What the data is telling you
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-green-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />

                  <span className="text-sm font-semibold text-green-700">
                    Improvement
                  </span>
                </div>

                <p className="text-sm leading-6 text-green-800">
                  Power availability improved by 6.4% compared with last week.
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-600" />

                  <span className="text-sm font-semibold text-purple-700">
                    Most Reports
                  </span>
                </div>

                <p className="text-sm leading-6 text-purple-800">
                  Akobo currently has the highest number of outage reports.
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-amber-600" />

                  <span className="text-sm font-semibold text-amber-700">
                    Duration
                  </span>
                </div>

                <p className="text-sm leading-6 text-amber-800">
                  Average outage duration has decreased by 18% this month.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
