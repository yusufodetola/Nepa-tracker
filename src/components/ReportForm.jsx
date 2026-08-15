"use client";

import { useState } from "react";

const STORAGE_KEY = "nepaReports";

export default function ReportForm() {
  const [area, setArea] = useState("");

  const [status, setStatus] = useState("Power Outage");

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanArea = area.trim();

    if (!cleanArea) {
      return;
    }

    let statusType = "pending";

    let reportStatus = "Pending";

    let issue = status;

    let description =
      "A community electricity issue has been reported in this area.";

    if (status === "Power Outage") {
      statusType = "outage";

      reportStatus = "Outage";

      issue = "Power Outage";

      description = "No electricity supply reported in this area.";
    }

    if (status === "Power Restored") {
      statusType = "restored";

      reportStatus = "Restored";

      issue = "Power Restored";

      description = "Electricity supply has been restored in this area.";
    }

    if (status === "Low Voltage") {
      statusType = "pending";

      reportStatus = "Pending";

      issue = "Low Voltage";

      description = "Electricity is available but voltage is very low.";
    }

    if (status === "Other Issue") {
      statusType = "pending";

      reportStatus = "Pending";

      issue = "Other Issue";

      description = "Another electricity-related issue has been reported.";
    }

    const now = new Date();

    const newReport = {
      id: Date.now(),

      title: issue,

      status: reportStatus,

      statusType,

      location: cleanArea,

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

    try {
      const savedReports = localStorage.getItem(STORAGE_KEY);

      const existingReports = savedReports ? JSON.parse(savedReports) : [];

      const updatedReports = [
        newReport,
        ...(Array.isArray(existingReports) ? existingReports : []),
      ];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));

      setArea("");

      setStatus("Power Outage");

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Unable to save report:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl bg-white p-5 shadow-md"
    >
      {/* HEADER */}

      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Report Power Status
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Help your community stay informed.
        </p>
      </div>

      {/* LOCATION */}

      <div>
        <label
          htmlFor="report-area"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Location
        </label>

        <input
          id="report-area"
          type="text"
          placeholder="e.g. Bodija, Ibadan"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
          required
        />
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
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
        >
          <option value="Power Outage">⚡ Power Outage</option>

          <option value="Power Restored">✅ Power Restored</option>

          <option value="Low Voltage">⚠️ Low Voltage</option>

          <option value="Other Issue">Other Issue</option>
        </select>
      </div>

      {/* SUBMIT */}

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        {submitted ? "✓ Report Submitted" : "Submit Report"}
      </button>

      {/* SUCCESS MESSAGE */}

      {submitted && (
        <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          Your report has been added successfully.
        </div>
      )}
    </form>
  );
}
