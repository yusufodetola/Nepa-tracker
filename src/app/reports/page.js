"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  MapPin,
  Search,
  Trash2,
  X,
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

const filters = ["All", "Outage", "Restored", "Pending"];

function getStatusClasses(statusType) {
  if (statusType === "outage") {
    return "bg-red-50 text-red-600";
  }

  if (statusType === "restored") {
    return "bg-green-50 text-green-600";
  }

  return "bg-amber-50 text-amber-600";
}

function getStatusIcon(statusType) {
  if (statusType === "outage") {
    return <AlertCircle className="h-4 w-4" />;
  }

  if (statusType === "restored") {
    return <CheckCircle2 className="h-4 w-4" />;
  }

  return <Clock3 className="h-4 w-4" />;
}

export default function ReportsPage() {
  const [reports, setReports] = useState([]);

  const [search, setSearch] = useState("");

  const [activeFilter, setActiveFilter] = useState("All");

  const [selectedReport, setSelectedReport] = useState(null);

  /*
   * =========================================================
   * LOAD REPORTS
   * =========================================================
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
      console.error("Unable to load reports:", error);

      setReports(defaultReports);
    }
  }, []);

  /*
   * =========================================================
   * LISTEN FOR REPORT CHANGES
   * =========================================================
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
        console.error("Unable to update reports:", error);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  /*
   * =========================================================
   * DELETE REPORT
   * =========================================================
   */

  const deleteReport = (id) => {
    const updatedReports = reports.filter((report) => report.id !== id);

    setReports(updatedReports);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));

    if (selectedReport?.id === id) {
      setSelectedReport(null);
    }
  };

  /*
   * =========================================================
   * FILTER REPORTS
   * =========================================================
   */

  const filteredReports = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesFilter =
        activeFilter === "All" || report.status === activeFilter;

      const matchesSearch =
        !searchValue ||
        report.location?.toLowerCase().includes(searchValue) ||
        report.title?.toLowerCase().includes(searchValue) ||
        report.status?.toLowerCase().includes(searchValue) ||
        report.description?.toLowerCase().includes(searchValue);

      return matchesFilter && matchesSearch;
    });
  }, [reports, search, activeFilter]);

  /*
   * =========================================================
   * SUMMARY COUNTS
   * =========================================================
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

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-1 text-sm font-medium text-purple-600">
                Community Reports
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Reports
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                View, search, and manage electricity reports submitted by the
                community.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
              <FileText className="h-4 w-4 text-purple-600" />

              <span>{totalReports} total reports</span>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* SUMMARY CARDS */}
        {/* ================================================= */}

        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>

              <span className="text-xs font-semibold text-purple-600">All</span>
            </div>

            <p className="mt-5 text-sm text-gray-500">Total Reports</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {totalReports}
            </h2>
          </div>

          {/* Outages */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>

              <span className="text-xs font-semibold text-red-500">Outage</span>
            </div>

            <p className="mt-5 text-sm text-gray-500">Outage Reports</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {outageCount}
            </h2>
          </div>

          {/* Restored */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>

              <span className="text-xs font-semibold text-green-600">
                Restored
              </span>
            </div>

            <p className="mt-5 text-sm text-gray-500">Restored Reports</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {restoredCount}
            </h2>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                <Clock3 className="h-5 w-5 text-amber-600" />
              </div>

              <span className="text-xs font-semibold text-amber-600">
                Pending
              </span>
            </div>

            <p className="mt-5 text-sm text-gray-500">Pending Reports</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {pendingCount}
            </h2>
          </div>
        </section>

        {/* ================================================= */}
        {/* SEARCH + FILTER */}
        {/* ================================================= */}

        <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by location, issue, or status..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    activeFilter === filter
                      ? "bg-purple-600 text-white shadow-sm"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-600">
                {filteredReports.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-600">
                {totalReports}
              </span>{" "}
              reports
            </p>

            {(search || activeFilter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
                className="text-xs font-semibold text-purple-600 hover:text-purple-700"
              >
                Clear filters
              </button>
            )}
          </div>
        </section>

        {/* ================================================= */}
        {/* REPORTS */}
        {/* ================================================= */}

        <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          {/* Desktop header */}
          <div className="hidden border-b border-gray-100 px-5 py-4 lg:grid lg:grid-cols-[1.6fr_1.2fr_1fr_1fr_auto] lg:items-center lg:gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Report
            </p>

            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Location
            </p>

            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Status
            </p>

            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Date
            </p>

            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Actions
            </p>
          </div>

          {/* Empty state */}
          {filteredReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <Search className="h-6 w-6 text-gray-400" />
              </div>

              <h3 className="mt-4 font-semibold text-gray-900">
                No reports found
              </h3>

              <p className="mt-1 max-w-sm text-sm text-gray-400">
                Try changing your search or selecting a different report status.
              </p>

              {(search || activeFilter !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveFilter("All");
                  }}
                  className="mt-4 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="p-5 transition hover:bg-gray-50"
                >
                  {/* Desktop */}
                  <div className="hidden lg:grid lg:grid-cols-[1.6fr_1.2fr_1fr_1fr_auto] lg:items-center lg:gap-4">
                    {/* Report */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            report.statusType === "outage"
                              ? "bg-red-50"
                              : report.statusType === "restored"
                                ? "bg-green-50"
                                : "bg-amber-50"
                          }`}
                        >
                          {report.statusType === "outage" ? (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          ) : report.statusType === "restored" ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <Clock3 className="h-4 w-4 text-amber-600" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {report.title || report.status}
                          </p>

                          <p className="mt-1 truncate text-xs text-gray-400">
                            {report.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-gray-400" />

                      <span className="truncate text-sm text-gray-600">
                        {report.location}
                      </span>
                    </div>

                    {/* Status */}
                    <div>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                          report.statusType,
                        )}`}
                      >
                        {getStatusIcon(report.statusType)}

                        {report.status}
                      </span>
                    </div>

                    {/* Date */}
                    <div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-gray-400" />

                        <div>
                          <p className="text-sm text-gray-600">{report.date}</p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            {report.time}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setSelectedReport(report)}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-purple-50 hover:text-purple-600"
                        aria-label="View report details"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteReport(report.id)}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                        aria-label="Delete report"
                        title="Delete report"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile / Tablet */}
                  <div className="lg:hidden">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-start gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            report.statusType === "outage"
                              ? "bg-red-50"
                              : report.statusType === "restored"
                                ? "bg-green-50"
                                : "bg-amber-50"
                          }`}
                        >
                          {report.statusType === "outage" ? (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          ) : report.statusType === "restored" ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <Clock3 className="h-4 w-4 text-amber-600" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-gray-900">
                            {report.title || report.status}
                          </h3>

                          <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                            <MapPin className="h-3.5 w-3.5" />

                            <span>{report.location}</span>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                          report.statusType,
                        )}`}
                      >
                        {report.status}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-gray-500">
                      {report.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <CalendarDays className="h-3.5 w-3.5" />

                        <span>
                          {report.date} • {report.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setSelectedReport(report)}
                          className="rounded-lg p-2 text-gray-400 hover:bg-purple-50 hover:text-purple-600"
                          aria-label="View report details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteReport(report.id)}
                          className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                          aria-label="Delete report"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* ================================================= */}
      {/* DETAILS MODAL */}
      {/* ================================================= */}

      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedReport(null);
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* Modal header */}
            <div className="flex items-start justify-between border-b border-gray-100 p-6">
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    selectedReport.statusType === "outage"
                      ? "bg-red-50"
                      : selectedReport.statusType === "restored"
                        ? "bg-green-50"
                        : "bg-amber-50"
                  }`}
                >
                  {selectedReport.statusType === "outage" ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : selectedReport.statusType === "restored" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock3 className="h-5 w-5 text-amber-600" />
                  )}
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Report details
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900">
                    {selectedReport.title || selectedReport.status}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal content */}
            <div className="space-y-5 p-6">
              {/* Status */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Status
                </p>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                    selectedReport.statusType,
                  )}`}
                >
                  {getStatusIcon(selectedReport.statusType)}

                  {selectedReport.status}
                </span>
              </div>

              {/* Location */}
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-purple-600" />

                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {selectedReport.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-purple-600" />

                    <p className="text-xs font-medium text-gray-400">Date</p>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    {selectedReport.date}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-purple-600" />

                    <p className="text-xs font-medium text-gray-400">Time</p>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    {selectedReport.time}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Description
                </p>

                <div className="rounded-2xl border border-gray-100 bg-white p-4">
                  <p className="text-sm leading-6 text-gray-600">
                    {selectedReport.description ||
                      "No description was provided for this report."}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 p-5">
              <button
                type="button"
                onClick={() => {
                  deleteReport(selectedReport.id);
                }}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>

              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
