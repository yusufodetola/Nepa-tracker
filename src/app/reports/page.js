"use client";

import { useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Filter,
  MapPin,
  Search,
  XCircle,
} from "lucide-react";

import AppShell from "../../components/AppShell";

const initialReports = [
  {
    id: 1,
    location: "Akobo, Ibadan",
    issue: "Power Outage",
    description: "No electricity supply in the area.",
    status: "Outage",
    date: "Aug 13, 2026",
    time: "09:42 AM",
    reporter: "Community report",
  },
  {
    id: 2,
    location: "Bodija, Ibadan",
    issue: "Power Restored",
    description: "Electricity supply has been restored.",
    status: "Restored",
    date: "Aug 13, 2026",
    time: "08:56 AM",
    reporter: "Community report",
  },
  {
    id: 3,
    location: "Mokola, Ibadan",
    issue: "Power Outage",
    description: "Power has been unavailable since early morning.",
    status: "Outage",
    date: "Aug 13, 2026",
    time: "08:15 AM",
    reporter: "Community report",
  },
  {
    id: 4,
    location: "Oluyole, Ibadan",
    issue: "Low Voltage",
    description: "Electricity is available but voltage is very low.",
    status: "Pending",
    date: "Aug 12, 2026",
    time: "06:34 PM",
    reporter: "Community report",
  },
  {
    id: 5,
    location: "Challenge, Ibadan",
    issue: "Power Restored",
    description: "Power supply returned after an outage.",
    status: "Restored",
    date: "Aug 12, 2026",
    time: "04:20 PM",
    reporter: "Community report",
  },
  {
    id: 6,
    location: "Ring Road, Ibadan",
    issue: "Power Outage",
    description: "Area currently experiencing an outage.",
    status: "Outage",
    date: "Aug 12, 2026",
    time: "02:48 PM",
    reporter: "Community report",
  },
];

const statusFilters = ["All", "Outage", "Restored", "Pending"];

export default function ReportsPage() {
  const [reports] = useState(initialReports);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = reports.filter((report) => {
    const matchesStatus =
      activeFilter === "All" || report.status === activeFilter;

    const search = searchQuery.toLowerCase();

    const matchesSearch =
      report.location.toLowerCase().includes(search) ||
      report.issue.toLowerCase().includes(search) ||
      report.description.toLowerCase().includes(search);

    return matchesStatus && matchesSearch;
  });

  const totalReports = reports.length;
  const outageReports = reports.filter(
    (report) => report.status === "Outage",
  ).length;
  const restoredReports = reports.filter(
    (report) => report.status === "Restored",
  ).length;
  const pendingReports = reports.filter(
    (report) => report.status === "Pending",
  ).length;

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-1 text-sm font-medium text-purple-600">
                Community Monitoring
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Reports
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                View and manage electricity reports submitted by your community.
              </p>
            </div>

            <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl">
              <FileText className="h-4 w-4" />
              New Report
            </button>
          </div>
        </div>

        {/* Summary */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>

            <p className="text-sm text-gray-500">Total Reports</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {totalReports}
            </h2>

            <p className="mt-1 text-xs text-gray-400">This reporting period</p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
              <XCircle className="h-5 w-5 text-red-500" />
            </div>

            <p className="text-sm text-gray-500">Active Outages</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {outageReports}
            </h2>

            <p className="mt-1 text-xs text-gray-400">Currently reported</p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>

            <p className="text-sm text-gray-500">Restored</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {restoredReports}
            </h2>

            <p className="mt-1 text-xs text-gray-400">Power restored</p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
              <Clock3 className="h-5 w-5 text-amber-600" />
            </div>

            <p className="text-sm text-gray-500">Pending</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {pendingReports}
            </h2>

            <p className="mt-1 text-xs text-gray-400">Awaiting confirmation</p>
          </div>
        </section>

        {/* Filters */}
        <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by location or report type..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-purple-400 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="mr-1 flex items-center gap-2 text-sm text-gray-400">
                <Filter className="h-4 w-4" />
                Filter
              </div>

              {statusFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    activeFilter === filter
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-gray-50 text-gray-500 hover:bg-purple-50 hover:text-purple-600"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Reports */}
        <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Reports
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  {filteredReports.length} reports found
                </p>
              </div>

              <button className="hidden items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 sm:flex">
                <CalendarDays className="h-4 w-4" />
                Date
              </button>
            </div>
          </div>

          {filteredReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <Search className="h-6 w-6 text-gray-400" />
              </div>

              <h3 className="font-semibold text-gray-900">No reports found</h3>

              <p className="mt-1 max-w-sm text-sm text-gray-400">
                Try changing your search or selecting a different filter.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="p-5 transition hover:bg-gray-50/70"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Report info */}
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                          report.status === "Outage"
                            ? "bg-red-50"
                            : report.status === "Restored"
                              ? "bg-green-50"
                              : "bg-amber-50"
                        }`}
                      >
                        {report.status === "Outage" ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : report.status === "Restored" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <Clock3 className="h-5 w-5 text-amber-600" />
                        )}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-gray-900">
                            {report.issue}
                          </h3>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                              report.status === "Outage"
                                ? "bg-red-50 text-red-600"
                                : report.status === "Restored"
                                  ? "bg-green-50 text-green-600"
                                  : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {report.status}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {report.location}
                          </span>

                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {report.date}
                          </span>

                          <span>{report.time}</span>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                          {report.description}
                        </p>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center gap-2 lg:ml-6">
                      <button className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
