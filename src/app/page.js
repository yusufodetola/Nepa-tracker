// "use client";

// import { useState } from "react";
// import dynamic from "next/dynamic";
// import Navbar from "../components/Navbar";
// import ReportForm from "../components/ReportForm";

// // Fix Leaflet SSR
// const MapView = dynamic(() => import("../components/MapView"), {
//   ssr: false,
// });

// export default function Home() {
//   const [reports, setReports] = useState([]);
//   const [activeTab, setActiveTab] = useState("home");

//   const addReport = (report) => {
//     setReports((prev) => [report, ...prev]); // ✅ correct way
//   };

//   return (
//     <div className="flex justify-center bg-gray-200 min-h-screen">
//       <div className="w-full max-w-sm bg-gray-50 min-h-screen relative pb-24 overflow-hidden">
//         {/* NAVBAR */}
//         <Navbar />

//         {/* ================= HOME ================= */}
//         {activeTab === "home" && (
//           <>
//             {/* HERO */}
//             <div className="px-4 mt-2">
//               <div className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white p-5 rounded-3xl shadow-lg">
//                 <h2 className="text-lg font-semibold">Report power issue</h2>
//                 <p className="text-sm opacity-90 mb-3">
//                   Submit outage in your area
//                 </p>

//                 <div className="bg-white rounded-xl flex items-center px-3 py-2">
//                   <input
//                     placeholder="Enter location"
//                     className="flex-1 outline-none text-black text-sm"
//                   />
//                   <span>⚡</span>
//                 </div>
//               </div>
//             </div>

//             {/* FORM */}
//             <div className="px-4 mt-4">
//               <ReportForm addReport={addReport} />
//             </div>

//             {/* RECENT REPORTS */}
//             <div className="px-4 mt-5">
//               <h3 className="font-semibold text-gray-800 mb-2">
//                 Recent Reports
//               </h3>

//               {reports.length === 0 && (
//                 <p className="text-gray-400 text-sm">No reports yet</p>
//               )}

//               {reports.map((r, i) => (
//                 <div
//                   key={i}
//                   className="bg-white p-4 rounded-2xl shadow-sm mb-3 flex justify-between items-center"
//                 >
//                   <div>
//                     <p className="font-medium text-gray-800">{r.area}</p>
//                     <p className="text-xs text-gray-400">{r.time}</p>
//                   </div>

//                   <span
//                     className={`text-xs px-3 py-1 rounded-full ${
//                       r.status === "out"
//                         ? "bg-red-100 text-red-600"
//                         : "bg-green-100 text-green-600"
//                     }`}
//                   >
//                     {r.status === "out" ? "Outage" : "Restored"}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* ================= MAP ================= */}
//         {activeTab === "map" && (
//           <div className="absolute inset-0 z-10">
//             <MapView />
//           </div>
//         )}

//         {/* ================= REPORTS ================= */}
//         {activeTab === "reports" && (
//           <div className="px-4 mt-4">
//             <h3 className="font-semibold text-gray-800 mb-3">All Reports</h3>

//             {reports.length === 0 && (
//               <p className="text-gray-400 text-sm">No reports yet</p>
//             )}

//             {reports.map((r, i) => (
//               <div
//                 key={i}
//                 className="bg-white p-4 rounded-2xl shadow-sm mb-3 flex justify-between items-center"
//               >
//                 <div>
//                   <p className="font-medium text-gray-800">{r.area}</p>
//                   <p className="text-xs text-gray-400">{r.time}</p>
//                 </div>

//                 <span
//                   className={`text-xs px-3 py-1 rounded-full ${
//                     r.status === "out"
//                       ? "bg-red-100 text-red-600"
//                       : "bg-green-100 text-green-600"
//                   }`}
//                 >
//                   {r.status === "out" ? "Outage" : "Restored"}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ================= BOTTOM NAV ================= */}
//         <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white shadow-xl rounded-2xl flex justify-around items-center py-3 z-20">
//           <span
//             onClick={() => setActiveTab("home")}
//             className={`text-2xl cursor-pointer ${
//               activeTab === "home" ? "text-indigo-600" : "text-gray-500"
//             }`}
//           >
//             🏠
//           </span>

//           <span
//             onClick={() => setActiveTab("map")}
//             className={`text-2xl cursor-pointer ${
//               activeTab === "map" ? "text-indigo-600" : "text-gray-500"
//             }`}
//           >
//             🗺️
//           </span>

//           <span
//             onClick={() => setActiveTab("reports")}
//             className={`text-2xl cursor-pointer ${
//               activeTab === "reports" ? "text-indigo-600" : "text-gray-500"
//             }`}
//           >
//             📄
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  Activity,
  ArrowUpRight,
  Clock3,
  MapPin,
  Power,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

import AppShell from "../components/AppShell";

const stats = [
  {
    title: "Power Availability",
    value: "78%",
    change: "+6.4%",
    description: "vs last week",
    icon: Power,
    trend: "up",
  },
  {
    title: "Active Outages",
    value: "12",
    change: "-3",
    description: "vs yesterday",
    icon: Activity,
    trend: "down",
  },
  {
    title: "Avg. Outage Time",
    value: "2h 18m",
    change: "-12%",
    description: "vs last month",
    icon: Clock3,
    trend: "down",
  },
  {
    title: "Reports Submitted",
    value: "148",
    change: "+18",
    description: "this month",
    icon: Zap,
    trend: "up",
  },
];

const recentReports = [
  {
    location: "Akobo, Ibadan",
    status: "Power Outage",
    time: "12 minutes ago",
  },
  {
    location: "Bodija, Ibadan",
    status: "Power Restored",
    time: "48 minutes ago",
  },
  {
    location: "Mokola, Ibadan",
    status: "Power Outage",
    time: "1 hour ago",
  },
];

export default function Home() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
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

        {/* Main status card */}
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
                Power Available
              </h2>

              <p className="mt-2 text-sm text-purple-100">
                Electricity is currently available in your area.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/20 bg-white/10">
                <div className="text-center">
                  <p className="text-2xl font-bold">78%</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-purple-100">Last updated</p>

                <p className="mt-1 font-semibold">4 minutes ago</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.trend === "up";

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                    <Icon className="h-5 w-5 text-purple-600" />
                  </div>

                  <ArrowUpRight className="h-4 w-4 text-gray-300" />
                </div>

                <p className="text-sm text-gray-500">{stat.title}</p>

                <div className="mt-1 flex items-end justify-between gap-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h3>

                  <span
                    className={`flex items-center gap-1 text-xs font-semibold ${
                      isPositive ? "text-green-600" : "text-green-600"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}

                    {stat.change}
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-400">{stat.description}</p>
              </div>
            );
          })}
        </section>

        {/* Lower section */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Recent reports */}
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

              <button className="text-sm font-semibold text-purple-600 hover:text-purple-700">
                View all
              </button>
            </div>

            <div className="space-y-3">
              {recentReports.map((report) => (
                <div
                  key={`${report.location}-${report.time}`}
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
                      report.status === "Power Outage"
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick report */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                Report an Issue
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Help your community stay informed.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Location
                </label>

                <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-3">
                  <MapPin className="h-4 w-4 text-gray-400" />

                  <input
                    type="text"
                    placeholder="e.g. Bodija, Ibadan"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Status
                </label>

                <select className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-purple-500">
                  <option>Power Outage</option>
                  <option>Power Restored</option>
                  <option>Low Voltage</option>
                  <option>Other Issue</option>
                </select>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl">
                <Zap className="h-4 w-4" />
                Submit Report
              </button>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
