"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Clock3,
  MapPin,
  Power,
  TrendingDown,
  TrendingUp,
  Zap,
  CheckCircle2,
} from "lucide-react";

import AppShell from "../components/AppShell";

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
];

/* =========================================================
   NORMALIZE REPORT
   Makes old and new report formats work together.
========================================================= */

function normalizeReport(report) {
  let statusType = report.statusType;

  if (!statusType) {
    if (report.status === "Outage" || report.status === "Power Outage") {
      statusType = "outage";
    } else if (
      report.status === "Restored" ||
      report.status === "Power Restored"
    ) {
      statusType = "restored";
    } else {
      statusType = "pending";
    }
  }

  return {
    ...report,
    statusType,
  };
}

export default function Home() {
  const [reports, setReports] = useState([]);

  const [location, setLocation] = useState("");

  const [status, setStatus] = useState("Power Outage");

  const [submitted, setSubmitted] = useState(false);

  /* =========================================================
     LOAD REPORTS
  ========================================================= */

  useEffect(() => {
    try {
      const savedReports = localStorage.getItem(STORAGE_KEY);

      if (savedReports) {
        const parsedReports = JSON.parse(savedReports);

        if (Array.isArray(parsedReports)) {
          setReports(parsedReports.map(normalizeReport));
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

  /* =========================================================
     LISTEN FOR LOCAL STORAGE CHANGES
  ========================================================= */

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      try {
        const updatedReports = event.newValue ? JSON.parse(event.newValue) : [];

        if (Array.isArray(updatedReports)) {
          setReports(updatedReports.map(normalizeReport));
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

  /* =========================================================
     CALCULATE DASHBOARD STATISTICS
  ========================================================= */

  const totalReports = reports.length;

  const outageCount = useMemo(() => {
    return reports.filter((report) => report.statusType === "outage").length;
  }, [reports]);

  const restoredCount = useMemo(() => {
    return reports.filter((report) => report.statusType === "restored").length;
  }, [reports]);

  const pendingCount = useMemo(() => {
    return reports.filter((report) => report.statusType === "pending").length;
  }, [reports]);

  /*
   * Simple availability calculation:
   *
   * Restored reports count as positive.
   * Outage reports count as negative.
   * Pending reports don't affect the calculation.
   *
   * We keep the dashboard between 0% and 100%.
   */

  const powerAvailability = useMemo(() => {
    if (totalReports === 0) {
      return 0;
    }

    const resolvedReports = outageCount + restoredCount;

    if (resolvedReports === 0) {
      return 0;
    }

    const value = Math.round((restoredCount / resolvedReports) * 100);

    return Math.max(0, Math.min(100, value));
  }, [totalReports, outageCount, restoredCount]);

  /*
   * Current power status
   */

  const currentPowerStatus = useMemo(() => {
    if (reports.length === 0) {
      return {
        title: "No Reports Yet",
        description: "Submit a report to start monitoring your area.",
      };
    }

    const latestReport = reports[0];

    if (latestReport.statusType === "outage") {
      return {
        title: "Power Outage Reported",
        description: `An outage was recently reported in ${latestReport.location}.`,
      };
    }

    if (latestReport.statusType === "restored") {
      return {
        title: "Power Restored",
        description: `Electricity has been restored in ${latestReport.location}.`,
      };
    }

    return {
      title: "Power Status Updated",
      description: `A new electricity report was submitted for ${latestReport.location}.`,
    };
  }, [reports]);

  /* =========================================================
     SUBMIT REPORT
  ========================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanLocation = location.trim();

    if (!cleanLocation) {
      return;
    }

    let statusType = "pending";

    let reportTitle = status;

    let description =
      "A community electricity issue has been reported in this area.";

    if (status === "Power Outage") {
      statusType = "outage";

      reportTitle = "Power Outage";

      description = "No electricity supply reported in this area.";
    }

    if (status === "Power Restored") {
      statusType = "restored";

      reportTitle = "Power Restored";

      description = "Electricity supply has been restored in this area.";
    }

    if (status === "Low Voltage") {
      statusType = "pending";

      reportTitle = "Low Voltage";

      description = "Electricity is available but voltage is very low.";
    }

    if (status === "Other Issue") {
      statusType = "pending";

      reportTitle = "Other Issue";

      description = "Another electricity-related issue has been reported.";
    }

    const now = new Date();

    const newReport = {
      id: Date.now(),

      title: reportTitle,

      status:
        statusType === "outage"
          ? "Outage"
          : statusType === "restored"
            ? "Restored"
            : "Pending",

      statusType,

      location: cleanLocation,

      date: now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),

      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),

      description,
    };

    /* =======================================================
       SAVE REPORT
    ======================================================= */

    setReports((previousReports) => {
      const updatedReports = [newReport, ...previousReports];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));

      return updatedReports;
    });

    /* =======================================================
       RESET FORM
    ======================================================= */

    setLocation("");

    setStatus("Power Outage");

    /* =======================================================
       SUCCESS MESSAGE
    ======================================================= */

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        {/* ================================================= */}
        {/* PAGE HEADING */}
        {/* ================================================= */}

        <div className="mb-8">
          <p className="mb-1 text-sm font-medium text-purple-600">
            Thursday, August 13, 2026
          </p>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Power Overview
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                Monitor electricity availability, outages, and reports in your
                area.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 shadow-sm">
              <MapPin className="h-4 w-4 text-purple-600" />

              <span>Akobo, Ibadan</span>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* MAIN STATUS CARD */}
        {/* ================================================= */}

        <section className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-500 p-6 text-white shadow-xl shadow-purple-200 sm:p-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                  <Power className="h-5 w-5" />
                </span>

                <span className="text-sm font-medium text-purple-100">
                  Current Power Status
                </span>
              </div>

              <h2 className="text-3xl font-bold sm:text-4xl">
                {currentPowerStatus.title}
              </h2>

              <p className="mt-2 text-sm text-purple-100">
                {currentPowerStatus.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/20 bg-white/10">
                <div className="text-center">
                  <p className="text-2xl font-bold">{powerAvailability}%</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-purple-100">Reports tracked</p>

                <p className="mt-1 font-semibold">{totalReports}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* STATS */}
        {/* ================================================= */}

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* POWER AVAILABILITY */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                <Power className="h-5 w-5 text-purple-600" />
              </div>

              <ArrowUpRight className="h-4 w-4 text-gray-300" />
            </div>

            <p className="text-sm text-gray-500">Power Availability</p>

            <div className="mt-1 flex items-end justify-between gap-2">
              <h3 className="text-2xl font-bold text-gray-900">
                {powerAvailability}%
              </h3>

              <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                <TrendingUp className="h-3.5 w-3.5" />
                Live
              </span>
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Based on current reports
            </p>
          </div>

          {/* ACTIVE OUTAGES */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>

              <ArrowUpRight className="h-4 w-4 text-gray-300" />
            </div>

            <p className="text-sm text-gray-500">Active Outages</p>

            <div className="mt-1 flex items-end justify-between gap-2">
              <h3 className="text-2xl font-bold text-gray-900">
                {outageCount}
              </h3>

              <span className="flex items-center gap-1 text-xs font-semibold text-red-500">
                <TrendingDown className="h-3.5 w-3.5" />
                Reports
              </span>
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Outage reports currently recorded
            </p>
          </div>

          {/* AVG OUTAGE TIME */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                <Clock3 className="h-5 w-5 text-purple-600" />
              </div>

              <ArrowUpRight className="h-4 w-4 text-gray-300" />
            </div>

            <p className="text-sm text-gray-500">Avg. Outage Time</p>

            <div className="mt-1 flex items-end justify-between gap-2">
              <h3 className="text-2xl font-bold text-gray-900">2h 18m</h3>

              <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                <TrendingDown className="h-3.5 w-3.5" />
                -12%
              </span>
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Based on tracked activity
            </p>
          </div>

          {/* REPORTS SUBMITTED */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>

              <ArrowUpRight className="h-4 w-4 text-gray-300" />
            </div>

            <p className="text-sm text-gray-500">Reports Submitted</p>

            <div className="mt-1 flex items-end justify-between gap-2">
              <h3 className="text-2xl font-bold text-gray-900">
                {totalReports}
              </h3>

              <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                <TrendingUp className="h-3.5 w-3.5" />
                Live
              </span>
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Total reports in your tracker
            </p>
          </div>
        </section>

        {/* ================================================= */}
        {/* LOWER SECTION */}
        {/* ================================================= */}

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* ================================================= */}
          {/* RECENT REPORTS */}
          {/* ================================================= */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Reports
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Latest community power reports
                </p>
              </div>

              <a
                href="/reports"
                className="text-sm font-semibold text-purple-600 hover:text-purple-700"
              >
                View all
              </a>
            </div>

            <div className="space-y-3">
              {reports.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center">
                  <p className="text-sm text-gray-400">No reports yet.</p>
                </div>
              ) : (
                reports.slice(0, 5).map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                        <MapPin className="h-4 w-4 text-purple-600" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {report.location}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {report.time}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
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
                ))
              )}
            </div>
          </div>

          {/* ================================================= */}
          {/* REPORT FORM */}
          {/* ================================================= */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                Report an Issue
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Help your community stay informed.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* LOCATION */}

              <div>
                <label
                  htmlFor="report-location"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Location
                </label>

                <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-3 focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100">
                  <MapPin className="h-4 w-4 shrink-0 text-gray-400" />

                  <input
                    id="report-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bodija, Ibadan"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* STATUS */}

              <div>
                <label
                  htmlFor="report-status"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Status
                </label>

                <select
                  id="report-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                >
                  <option value="Power Outage">Power Outage</option>

                  <option value="Power Restored">Power Restored</option>

                  <option value="Low Voltage">Low Voltage</option>

                  <option value="Other Issue">Other Issue</option>
                </select>
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Report Submitted
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Submit Report
                  </>
                )}
              </button>

              {/* SUCCESS */}

              {submitted && (
                <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  Your report has been added successfully.
                </div>
              )}
            </form>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
