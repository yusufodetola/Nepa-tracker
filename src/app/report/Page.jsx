"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  X,
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

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  /*
   * Load reports from localStorage
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

      /*
       * First time opening the page:
       * save the default reports.
       */
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultReports));

      setReports(defaultReports);
    } catch (error) {
      console.error("Unable to load reports:", error);
      setReports(defaultReports);
    }
  }, []);

  /*
   * Listen for reports added from another page/component.
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

  const openDetails = (report) => {
    setSelectedReport(report);
  };

  const closeDetails = () => {
    setSelectedReport(null);
  };

  const outageCount = reports.filter(
    (report) => report.statusType === "outage",
  ).length;

  const restoredCount = reports.filter(
    (report) => report.statusType === "restored",
  ).length;

  const pendingCount = reports.filter(
    (report) => report.statusType === "pending",
  ).length;

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <p className="mb-1 text-sm font-medium text-purple-600">
            Community Monitoring
          </p>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Reports
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                View and manage electricity reports submitted by your community.
              </p>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <FileText className="h-4 w-4" />
              New Report
            </button>
          </div>
        </div>

        {/* ================= SUMMARY CARDS ================= */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>

              <span className="text-xs font-medium text-gray-400">
                This period
              </span>
            </div>

            <p className="text-sm text-gray-500">Total Reports</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {reports.length}
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Submitted by the community
            </p>
          </div>

          {/* Outages */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>

              <span className="text-xs font-medium text-gray-400">
                Currently
              </span>
            </div>

            <p className="text-sm text-gray-500">Active Outages</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {outageCount}
            </h2>

            <p className="mt-1 text-xs text-gray-400">Currently reported</p>
          </div>

          {/* Restored */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>

              <span className="text-xs font-medium text-gray-400">
                Completed
              </span>
            </div>

            <p className="text-sm text-gray-500">Restored</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {restoredCount}
            </h2>

            <p className="mt-1 text-xs text-gray-400">Power restored</p>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                <Clock3 className="h-5 w-5 text-amber-500" />
              </div>

              <span className="text-xs font-medium text-gray-400">Pending</span>
            </div>

            <p className="text-sm text-gray-500">Pending Reports</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {pendingCount}
            </h2>

            <p className="mt-1 text-xs text-gray-400">Awaiting confirmation</p>
          </div>
        </section>

        {/* ================= REPORT LIST ================= */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {/* List header */}
          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Recent Reports
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                {reports.length} reports found
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50"
              >
                Filter
              </button>

              <button
                type="button"
                className="rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white"
              >
                All
              </button>

              <button
                type="button"
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50"
              >
                Outage
              </button>

              <button
                type="button"
                className="hidden rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50 sm:block"
              >
                Restored
              </button>

              <button
                type="button"
                className="hidden rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 sm:block"
              >
                Pending
              </button>
            </div>
          </div>

          {/* Reports */}
          <div>
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col gap-5 border-b border-gray-100 p-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Left */}
                <div className="flex min-w-0 items-start gap-4">
                  {/* Status icon */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      report.statusType === "outage"
                        ? "bg-red-50"
                        : report.statusType === "restored"
                          ? "bg-green-50"
                          : "bg-amber-50"
                    }`}
                  >
                    {report.statusType === "outage" && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}

                    {report.statusType === "restored" && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}

                    {report.statusType === "pending" && (
                      <Clock3 className="h-5 w-5 text-amber-500" />
                    )}
                  </div>

                  {/* Information */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {report.title}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          report.statusType === "outage"
                            ? "bg-red-50 text-red-600"
                            : report.statusType === "restored"
                              ? "bg-green-50 text-green-600"
                              : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {report.location}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {report.date}
                      </span>

                      <span>{report.time}</span>
                    </div>

                    <p className="mt-3 text-sm text-gray-500">
                      {report.description}
                    </p>
                  </div>
                </div>

                {/* View Details */}
                <button
                  type="button"
                  onClick={() => openDetails(report)}
                  className="shrink-0 self-start rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-600 sm:self-center"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ===================================================== */}
      {/* DETAILS MODAL */}
      {/* ===================================================== */}

      {selectedReport && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDetails();
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <p className="text-xs font-medium text-purple-600">
                  Report Details
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  {selectedReport.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeDetails}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 p-6">
              {/* Status */}
              <div
                className={`flex items-center gap-4 rounded-2xl p-4 ${
                  selectedReport.statusType === "outage"
                    ? "bg-red-50"
                    : selectedReport.statusType === "restored"
                      ? "bg-green-50"
                      : "bg-amber-50"
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                  {selectedReport.statusType === "outage" && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}

                  {selectedReport.statusType === "restored" && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}

                  {selectedReport.statusType === "pending" && (
                    <Clock3 className="h-5 w-5 text-amber-500" />
                  )}
                </div>

                <div>
                  <p className="text-xs text-gray-500">Current status</p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {selectedReport.status}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                  <MapPin className="h-5 w-5 text-purple-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Location</p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {selectedReport.location}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                  <CalendarDays className="h-5 w-5 text-purple-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Date</p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {selectedReport.date}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                  <Clock3 className="h-5 w-5 text-purple-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Reported time</p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {selectedReport.time}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-400">Description</p>

                <p className="mt-2 text-sm leading-6 text-gray-700">
                  {selectedReport.description}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={closeDetails}
                className="w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
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
