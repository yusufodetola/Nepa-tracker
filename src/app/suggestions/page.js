"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Clock3,
  Lightbulb,
  MapPin,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

import AppShell from "../../components/AppShell";

const initialSuggestions = [
  {
    id: 1,
    type: "warning",
    title: "Frequent outages in your area",
    description:
      "Akobo has recorded more outage reports than other nearby areas this week.",
    action: "View area analytics",
    icon: TrendingDown,
  },
  {
    id: 2,
    type: "recommendation",
    title: "Enable outage alerts",
    description:
      "Get notified immediately when a new outage is reported around your location.",
    action: "Enable alerts",
    icon: Bell,
  },
  {
    id: 3,
    type: "insight",
    title: "Power availability is improving",
    description:
      "Your area's availability has improved compared with the previous week.",
    action: "View analytics",
    icon: TrendingUp,
  },
  {
    id: 4,
    type: "tip",
    title: "Help improve community accuracy",
    description:
      "Confirm whether power is available after an outage report to help other users.",
    action: "Learn more",
    icon: CheckCircle2,
  },
];

const areaData = [
  {
    area: "Akobo",
    availability: "78%",
    status: "Moderate",
    trend: "down",
  },
  {
    area: "Bodija",
    availability: "84%",
    status: "Good",
    trend: "up",
  },
  {
    area: "Mokola",
    availability: "71%",
    status: "Low",
    trend: "down",
  },
  {
    area: "Oluyole",
    availability: "82%",
    status: "Good",
    trend: "up",
  },
];

function getSuggestionStyle(type) {
  if (type === "warning") {
    return {
      container: "bg-red-50 border-red-100",
      icon: "bg-white text-red-500",
      button: "text-red-600 hover:bg-red-100",
    };
  }

  if (type === "recommendation") {
    return {
      container: "bg-purple-50 border-purple-100",
      icon: "bg-white text-purple-600",
      button: "text-purple-600 hover:bg-purple-100",
    };
  }

  if (type === "insight") {
    return {
      container: "bg-green-50 border-green-100",
      icon: "bg-white text-green-600",
      button: "text-green-600 hover:bg-green-100",
    };
  }

  return {
    container: "bg-blue-50 border-blue-100",
    icon: "bg-white text-blue-600",
    button: "text-blue-600 hover:bg-blue-100",
  };
}

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const dismissSuggestion = (id) => {
    setSuggestions((current) =>
      current.filter((suggestion) => suggestion.id !== id),
    );
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-1 text-sm font-medium text-purple-600">
            Smart Recommendations
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Suggestions
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
            Personalized insights and recommendations based on power activity in
            your area.
          </p>
        </div>

        {/* Smart overview */}
        <section className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-500 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Lightbulb className="h-6 w-6" />
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Smart power insights
              </h2>

              <p className="mt-3 text-sm leading-6 text-purple-100 sm:text-base">
                Nepa Tracker analyzes reports, outage patterns, and power
                availability to help you understand what's happening around you.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm lg:min-w-[260px]">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-purple-100" />

                <div>
                  <p className="text-xs text-purple-100">Your current area</p>

                  <p className="mt-1 font-semibold">Akobo, Ibadan</p>
                </div>
              </div>

              <div className="mt-5 border-t border-white/15 pt-4">
                <p className="text-xs text-purple-100">Current availability</p>

                <div className="mt-1 flex items-end gap-2">
                  <span className="text-3xl font-bold">78%</span>
                  <span className="mb-1 text-sm text-green-200">+6.4%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Suggestions */}
        <section className="mb-6">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Recommended for you
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Actions that may help you stay informed
              </p>
            </div>

            <span className="hidden rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600 sm:block">
              {suggestions.length} suggestions
            </span>
          </div>

          {suggestions.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>

              <h3 className="font-semibold text-gray-900">
                You're all caught up
              </h3>

              <p className="mx-auto mt-1 max-w-md text-sm text-gray-400">
                There are no new recommendations for you right now.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {suggestions.map((suggestion) => {
                const Icon = suggestion.icon;
                const styles = getSuggestionStyle(suggestion.type);

                return (
                  <div
                    key={suggestion.id}
                    className={`rounded-2xl border p-5 ${styles.container}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {suggestion.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          {suggestion.description}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <button
                            className={`flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold transition ${styles.button}`}
                          >
                            {suggestion.action}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={() => dismissSuggestion(suggestion.id)}
                            className="rounded-lg px-3 py-2 text-xs font-medium text-gray-500 hover:bg-white/60"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Area comparison */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">
            <div className="border-b border-gray-100 p-5">
              <h2 className="text-lg font-bold text-gray-900">
                Nearby Area Insights
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Compare power availability around your location.
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              {areaData.map((area) => (
                <div
                  key={area.area}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                      <MapPin className="h-4 w-4 text-purple-600" />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">{area.area}</p>

                      <p className="text-xs text-gray-400">Ibadan</p>
                    </div>
                  </div>

                  <div className="flex flex-1 items-center gap-5 sm:justify-end">
                    <div className="w-full max-w-[180px]">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          Availability
                        </span>

                        <span className="text-xs font-semibold text-gray-700">
                          {area.availability}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-purple-500"
                          style={{
                            width: area.availability,
                          }}
                        />
                      </div>
                    </div>

                    <span
                      className={`hidden min-w-[65px] rounded-full px-3 py-1 text-center text-xs font-semibold sm:block ${
                        area.status === "Good"
                          ? "bg-green-50 text-green-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {area.status}
                    </span>

                    {area.trend === "up" ? (
                      <TrendingUp className="hidden h-5 w-5 text-green-500 sm:block" />
                    ) : (
                      <TrendingDown className="hidden h-5 w-5 text-red-500 sm:block" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick tips */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <ShieldCheck className="h-5 w-5 text-green-600" />
              </div>

              <h2 className="text-lg font-bold text-gray-900">Helpful Tips</h2>

              <p className="mt-1 text-sm leading-6 text-gray-400">
                Simple ways to get better results from Nepa Tracker.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-4 w-4 text-purple-600" />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Report quickly
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      Submit an outage as soon as you notice it so nearby users
                      can stay informed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Confirm restorations
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      When power returns, confirming it helps improve the
                      accuracy of community data.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <Bell className="mt-0.5 h-4 w-4 text-amber-600" />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Keep alerts enabled
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      Stay updated about important changes in your area.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer insight */}
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-purple-100 bg-purple-50 p-4">
          <Zap className="h-5 w-5 shrink-0 text-purple-600" />

          <p className="text-sm text-purple-800">
            <span className="font-semibold">Smart insight:</span> Nepa Tracker
            recommendations become more useful as more people report and confirm
            power conditions in their areas.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
