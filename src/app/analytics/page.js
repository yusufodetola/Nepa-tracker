"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  BarChart3,
  CheckCircle2,
  Clock3,
  MapPin,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

import AppShell from "../../components/AppShell";

const STORAGE_KEY = "nepaReports";

const defaultReports = [
  {
    id: 1,
    title: "Power Outage",
    status: "Outage",
    statusType: "outage",
    location: "Akobo, Ibadan",
    date: "Aug 13, 2026",
    time: "09:42 AM",
    description: "No electricity supply in the area.",
  },
  {
    id: 2,
    title: "Power Restored",
    status: "Restored",
    statusType: "restored",
    location: "Bodija, Ibadan",
    date: "Aug 13, 2026",
    time: "08:56 AM",
    description: "Electricity supply has been restored.",
  },
  {
    id: 3,
    title: "Power Outage",
    status: "Outage",
    statusType: "outage",
    location: "Mokola, Ibadan",
    date: "Aug 13, 2026",
    time: "08:15 AM",
    description: "Power has been unavailable since early morning.",
  },
  {
    id: 4,
    title: "Low Voltage",
    status: "Pending",
    statusType: "pending",
    location: "Oluyole, Ibadan",
    date: "Aug 12, 2026",
    time: "06:34 PM",
    description: "Electricity is available but voltage is very low.",
  },
  {
    id: 5,
    title: "Power Restored",
    status: "Restored",
    statusType: "restored",
    location: "Challenge, Ibadan",
    date: "Aug 12, 2026",
    time: "04:20 PM",
    description: "Power supply returned after an outage.",
  },
  {
    id: 6,
    title: "Power Outage",
    status: "Outage",
    statusType: "outage",
    location: "Ring Road, Ibadan",
    date: "Aug 12, 2026",
    time: "02:48 PM",
    description: "Area currently experiencing an outage.",
  },
];

const dailyData = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 58 },
  { day: "Wed", value: 49 },
  { day: "Thu", value: 72 },
  { day: "Fri", value: 64 },
  { day: "Sat", value: 81 },
  { day: "Sun", value: 68 },
];

export default function AnalyticsPage() {
  const [reports, setReports] = useState([]);

  /*
   * LOAD REPORTS FROM LOCAL STORAGE
   */
  useEffect(() => {
    try {
      const savedReports = localStorage.getItem(STORAGE_KEY);

      if (savedReports) {
        const parsedReports = JSON.parse(savedReports);

        if (Array.isArray(parsedReports)) {
          setReports(parsedReports);
          return;
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultReports));
      setReports(defaultReports);
    } catch (error) {
      console.error("Unable to load analytics reports:", error);
      setReports(defaultReports);
    }
  }, []);

  /*
   * KEEP ANALYTICS UPDATED WHEN REPORTS CHANGE
   */
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      try {
        const updatedReports = event.newValue ? JSON.parse(event.newValue) : [];

        if (Array.isArray(updatedReports)) {
          setReports(updatedReports);
        }
      } catch (error) {
        console.error("Unable to update analytics:", error);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  /*
   * REPORT COUNTS
   */
  const totalReports = reports.length;

  const outageCount = reports.filter(
    (report) =>
      report.statusType === "outage" ||
      report.status === "Outage" ||
      report.status === "Power Outage",
  ).length;

  const restoredCount = reports.filter(
    (report) =>
      report.statusType === "restored" ||
      report.status === "Restored" ||
      report.status === "Power Restored",
  ).length;

  const pendingCount = reports.filter(
    (report) =>
      report.statusType === "pending" ||
      report.status === "Pending" ||
      report.status === "Low Voltage",
  ).length;

  /*
   * AVAILABILITY
   */
  const availability = useMemo(() => {
    if (totalReports === 0) {
      return 0;
    }

    return Math.round((restoredCount / totalReports) * 100);
  }, [restoredCount, totalReports]);

  /*
   * MOST REPORTED LOCATION
   */
  const locationStats = useMemo(() => {
    const counts = {};

    reports.forEach((report) => {
      const location = report.location || "Unknown";

      counts[location] = (counts[location] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([location, count]) => ({
        location,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [reports]);

  const topLocation = locationStats[0];

  /*
   * MAX VALUE FOR BAR CHART
   */
  const maxDailyValue = Math.max(...dailyData.map((item) => item.value));

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <p className="mb-1 text-sm font-medium text-purple-600">
            Performance Overview
          </p>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Analytics
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                Understand electricity availability, outage activity, and
                community reporting trends.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 shadow-sm">
              <BarChart3 className="h-4 w-4 text-purple-600" />
              <span>Last 7 days</span>
            </div>
          </div>
        </div>

        {/* ================= TOP STAT CARDS ================= */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total Reports */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>

              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>

            <p className="text-sm text-gray-500">Total Reports</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {totalReports}
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Community reports received
            </p>
          </div>

          {/* Outages */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>

              <TrendingDown className="h-4 w-4 text-green-500" />
            </div>

            <p className="text-sm text-gray-500">Outage Reports</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {outageCount}
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Electricity interruptions
            </p>
          </div>

          {/* Restored */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>

              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>

            <p className="text-sm text-gray-500">Restored Reports</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {restoredCount}
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Power restoration reports
            </p>
          </div>

          {/* Availability */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                <Zap className="h-5 w-5 text-indigo-600" />
              </div>

              <span className="text-xs font-semibold text-green-600">
                Healthy
              </span>
            </div>

            <p className="text-sm text-gray-500">Power Availability</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {availability}%
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Based on current reports
            </p>
          </div>
        </section>

        {/* ================= CHART + SUMMARY ================= */}
        <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* BAR CHART */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Reporting Activity
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Community reports over the last 7 days
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
            </div>

            <div className="flex h-64 items-end justify-between gap-3 border-b border-gray-100 px-2">
              {dailyData.map((item) => {
                const height = `${(item.value / maxDailyValue) * 100}%`;

                return (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                  >
                    <div className="flex h-full w-full items-end justify-center">
                      <div
                        className="w-full max-w-10 rounded-t-xl bg-gradient-to-t from-purple-600 to-indigo-400 transition hover:opacity-80"
                        style={{ height }}
                        title={`${item.value} reports`}
                      />
                    </div>

                    <span className="text-xs font-medium text-gray-400">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
              <span>Low activity</span>

              <span>High activity</span>
            </div>
          </div>

          {/* REPORT SUMMARY */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Report Summary
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Breakdown of submitted reports
              </p>
            </div>

            {/* Outage */}
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                  <span className="text-sm font-medium text-gray-700">
                    Outages
                  </span>
                </div>

                <span className="text-sm font-semibold text-gray-900">
                  {outageCount}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-red-500"
                  style={{
                    width:
                      totalReports > 0
                        ? `${(outageCount / totalReports) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>

            {/* Restored */}
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                  <span className="text-sm font-medium text-gray-700">
                    Restored
                  </span>
                </div>

                <span className="text-sm font-semibold text-gray-900">
                  {restoredCount}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{
                    width:
                      totalReports > 0
                        ? `${(restoredCount / totalReports) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>

            {/* Pending */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />

                  <span className="text-sm font-medium text-gray-700">
                    Pending
                  </span>
                </div>

                <span className="text-sm font-semibold text-gray-900">
                  {pendingCount}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-amber-500"
                  style={{
                    width:
                      totalReports > 0
                        ? `${(pendingCount / totalReports) * 100}%`
                        : "0%",
                  }}
                />
              </div>
            </div>

            {/* Overall */}
            <div className="mt-8 rounded-2xl bg-purple-50 p-4">
              <p className="text-xs font-medium text-purple-600">
                Overall reporting status
              </p>

              <p className="mt-1 text-lg font-bold text-gray-900">
                {totalReports > 0 ? "Active" : "No Data"}
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Analytics are calculated from the reports currently saved in
                your NEPA Tracker.
              </p>
            </div>
          </div>
        </section>

        {/* ================= LOCATION ANALYSIS ================= */}
        <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* TOP LOCATIONS */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Most Reported Areas
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Locations receiving the most community reports
              </p>
            </div>

            {locationStats.length === 0 ? (
              <div className="rounded-2xl bg-gray-50 p-6 text-center">
                <MapPin className="mx-auto h-6 w-6 text-gray-300" />

                <p className="mt-2 text-sm text-gray-400">
                  No location data available yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {locationStats.slice(0, 5).map((item, index) => (
                  <div
                    key={item.location}
                    className="flex items-center gap-4 rounded-xl border border-gray-100 p-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                      <MapPin className="h-4 w-4 text-purple-600" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {item.location}
                        </p>

                        <span className="text-sm font-bold text-gray-900">
                          {item.count}
                        </span>
                      </div>

                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-purple-500"
                          style={{
                            width: `${Math.max(
                              10,
                              (item.count / locationStats[0].count) * 100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <span className="text-xs font-medium text-gray-400">
                      #{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* KEY INSIGHT */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">Key Insight</h2>

              <p className="mt-1 text-sm text-gray-400">
                What the current data tells us
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-red-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Outage activity
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {outageCount > 0
                        ? `${outageCount} outage report${
                            outageCount === 1 ? "" : "s"
                          } currently exist in the report data.`
                        : "No outage reports have been recorded yet."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Restoration activity
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {restoredCount > 0
                        ? `${restoredCount} restoration report${
                            restoredCount === 1 ? "" : "s"
                          } recorded by the community.`
                        : "No restoration reports have been recorded yet."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-purple-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Most reported location
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {topLocation
                        ? `${topLocation.location} currently has the highest number of reports.`
                        : "There is not enough location data yet."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-gray-400" />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Data source
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Analytics are connected to your local community reports.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
