"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  BatteryCharging,
  Check,
  CheckCircle2,
  Clock3,
  Droplets,
  Lightbulb,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
  TrendingUp,
  Zap,
} from "lucide-react";

import AppShell from "../../components/AppShell";

const initialSuggestions = [
  {
    id: 1,
    type: "urgent",
    icon: AlertCircle,
    title: "Monitor outage activity in Akobo",
    description:
      "Recent community reports show repeated outage activity in Akobo. Consider checking the area before relying on electricity for important tasks.",
    location: "Akobo, Ibadan",
    priority: "High priority",
    category: "Power",
  },
  {
    id: 2,
    type: "power",
    icon: Zap,
    title: "Use high-power appliances strategically",
    description:
      "When electricity is available, consider running high-energy appliances together during stable supply periods to reduce unnecessary switching between power sources.",
    location: "Your area",
    priority: "Recommended",
    category: "Energy",
  },
  {
    id: 3,
    type: "community",
    icon: MapPin,
    title: "Community reports can improve accuracy",
    description:
      "Continue reporting outages and restorations in your area. Multiple reports help build a clearer picture of electricity conditions.",
    location: "Akobo, Ibadan",
    priority: "Recommended",
    category: "Community",
  },
  {
    id: 4,
    type: "savings",
    icon: Lightbulb,
    title: "Reduce unnecessary electricity usage",
    description:
      "Turn off lights, chargers, and appliances when they are not needed. Small changes can reduce overall electricity consumption.",
    location: "Your account",
    priority: "Energy saving",
    category: "Savings",
  },
  {
    id: 5,
    type: "backup",
    icon: BatteryCharging,
    title: "Prepare your backup power",
    description:
      "Recent outage activity suggests that keeping your backup battery, inverter, or other power source charged may be useful.",
    location: "Your area",
    priority: "Recommended",
    category: "Backup",
  },
  {
    id: 6,
    type: "tracking",
    icon: TrendingUp,
    title: "Check Analytics for outage patterns",
    description:
      "Your Analytics dashboard can help you identify areas with frequent reports and understand recent community reporting activity.",
    location: "NEPA Tracker",
    priority: "Explore",
    category: "Analytics",
  },
];

function suggestionBackground(type) {
  if (type === "urgent") {
    return "bg-red-50";
  }

  if (type === "power") {
    return "bg-purple-50";
  }

  if (type === "community") {
    return "bg-blue-50";
  }

  if (type === "savings") {
    return "bg-amber-50";
  }

  if (type === "backup") {
    return "bg-green-50";
  }

  return "bg-indigo-50";
}

function suggestionIconColor(type) {
  if (type === "urgent") {
    return "text-red-500";
  }

  if (type === "power") {
    return "text-purple-600";
  }

  if (type === "community") {
    return "text-blue-600";
  }

  if (type === "savings") {
    return "text-amber-600";
  }

  if (type === "backup") {
    return "text-green-600";
  }

  return "text-indigo-600";
}

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const [helpful, setHelpful] = useState([]);

  const [filter, setFilter] = useState("All");

  const categories = ["All", "Power", "Energy", "Community", "Savings"];

  const filteredSuggestions = useMemo(() => {
    if (filter === "All") {
      return suggestions;
    }

    return suggestions.filter((suggestion) => suggestion.category === filter);
  }, [filter, suggestions]);

  const handleHelpful = (id) => {
    setHelpful((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  };

  const dismissSuggestion = (id) => {
    setSuggestions((current) =>
      current.filter((suggestion) => suggestion.id !== id),
    );

    setHelpful((current) => current.filter((item) => item !== id));
  };

  const refreshSuggestions = () => {
    setSuggestions([...initialSuggestions]);
    setHelpful([]);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-1 flex items-center gap-2 text-sm font-medium text-purple-600">
                <Sparkles className="h-4 w-4" />
                Smart Recommendations
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Suggestions
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                Helpful recommendations based on electricity activity, community
                reports, and your current area.
              </p>
            </div>

            <button
              type="button"
              onClick={refreshSuggestions}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-600 shadow-sm transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh suggestions
            </button>
          </div>
        </div>

        {/* ================= SMART OVERVIEW ================= */}
        <section className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-500 p-6 text-white shadow-xl shadow-purple-200 sm:p-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <Sparkles className="h-5 w-5" />
                </span>

                <span className="text-sm font-medium text-purple-100">
                  NEPA Tracker Insights
                </span>
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Recommendations for your area
              </h2>

              <p className="mt-2 text-sm leading-6 text-purple-100 sm:text-base">
                These suggestions are designed to help you respond to outage
                activity, save energy, and make better use of community reports.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <ShieldCheck className="h-7 w-7" />
              </div>

              <div>
                <p className="text-xs text-purple-100">Current status</p>

                <p className="mt-1 text-lg font-bold">Monitoring Active</p>

                <p className="mt-1 text-xs text-purple-100">Akobo, Ibadan</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= QUICK STATS ================= */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>

              <span className="text-xs font-semibold text-purple-600">
                Available
              </span>
            </div>

            <p className="mt-5 text-sm text-gray-500">Active suggestions</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {suggestions.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>

              <span className="text-xs font-semibold text-red-500">
                Attention
              </span>
            </div>

            <p className="mt-5 text-sm text-gray-500">High priority</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">1</h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <ThumbsUp className="h-5 w-5 text-green-600" />
              </div>

              <span className="text-xs font-semibold text-green-600">
                Helpful
              </span>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Suggestions marked helpful
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {helpful.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                <Lightbulb className="h-5 w-5 text-amber-600" />
              </div>

              <span className="text-xs font-semibold text-amber-600">
                Energy
              </span>
            </div>

            <p className="mt-5 text-sm text-gray-500">Energy tips</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {
                suggestions.filter(
                  (suggestion) => suggestion.category === "Energy",
                ).length
              }
            </h2>
          </div>
        </section>

        {/* ================= FILTERS ================= */}
        <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                Recommended actions
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Choose a category to focus your recommendations.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                    filter === category
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-gray-50 text-gray-500 hover:bg-purple-50 hover:text-purple-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MAIN CONTENT ================= */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Suggestions */}
          <div className="space-y-4 xl:col-span-2">
            {filteredSuggestions.length === 0 ? (
              <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                  <CheckCircle2 className="h-6 w-6 text-gray-400" />
                </div>

                <h3 className="mt-4 font-semibold text-gray-900">
                  No suggestions here
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  You have reviewed all recommendations in this category.
                </p>

                <button
                  type="button"
                  onClick={refreshSuggestions}
                  className="mt-5 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  Show suggestions again
                </button>
              </div>
            ) : (
              filteredSuggestions.map((suggestion) => {
                const Icon = suggestion.icon;
                const isHelpful = helpful.includes(suggestion.id);

                return (
                  <div
                    key={suggestion.id}
                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${suggestionBackground(
                          suggestion.type,
                        )}`}
                      >
                        <Icon
                          className={`h-5 w-5 ${suggestionIconColor(
                            suggestion.type,
                          )}`}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-bold text-gray-900">
                                {suggestion.title}
                              </h3>

                              <span
                                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                  suggestion.type === "urgent"
                                    ? "bg-red-50 text-red-600"
                                    : "bg-purple-50 text-purple-600"
                                }`}
                              >
                                {suggestion.priority}
                              </span>
                            </div>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                              {suggestion.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex flex-wrap items-center gap-4">
                            <span className="flex items-center gap-1.5 text-xs text-gray-400">
                              <MapPin className="h-3.5 w-3.5" />
                              {suggestion.location}
                            </span>

                            <span className="flex items-center gap-1.5 text-xs text-gray-400">
                              <Clock3 className="h-3.5 w-3.5" />
                              Suggested now
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleHelpful(suggestion.id)}
                              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                                isHelpful
                                  ? "bg-green-50 text-green-600"
                                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                              }`}
                            >
                              {isHelpful ? (
                                <Check className="h-3.5 w-3.5" />
                              ) : (
                                <ThumbsUp className="h-3.5 w-3.5" />
                              )}

                              {isHelpful ? "Helpful" : "Helpful?"}
                            </button>

                            <button
                              type="button"
                              onClick={() => dismissSuggestion(suggestion.id)}
                              className="rounded-lg px-3 py-2 text-xs font-semibold text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                            >
                              Dismiss
                            </button>

                            <button
                              type="button"
                              className="flex items-center gap-1 rounded-lg bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-600 transition hover:bg-purple-100"
                            >
                              View
                              <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ================= SIDE PANEL ================= */}
          <div className="space-y-6">
            {/* Current area */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                  <MapPin className="h-5 w-5 text-purple-600" />
                </div>

                <h2 className="text-lg font-bold text-gray-900">
                  Your monitored area
                </h2>

                <p className="mt-1 text-sm leading-6 text-gray-400">
                  Suggestions are currently focused on your selected location.
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                    <MapPin className="h-4 w-4 text-purple-600" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Current location</p>

                    <p className="mt-1 text-sm font-bold text-gray-900">
                      Akobo, Ibadan
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
              >
                Change location
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Energy tip */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                <Lightbulb className="h-5 w-5 text-amber-600" />
              </div>

              <h2 className="text-lg font-bold text-gray-900">
                Energy Saving Tip
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Switch off appliances that are not being used, especially during
                periods of unstable electricity supply.
              </p>

              <div className="mt-5 flex items-start gap-3 rounded-xl bg-amber-50 p-3">
                <Droplets className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

                <p className="text-xs leading-5 text-amber-700">
                  Small energy-saving habits can help reduce unnecessary power
                  consumption.
                </p>
              </div>
            </div>

            {/* Community reminder */}
            <div className="rounded-2xl bg-purple-50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                  <MapPin className="h-5 w-5 text-purple-600" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Help your community
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Reporting outages and restorations helps other people know
                    what is happening around them.
                  </p>

                  <button
                    type="button"
                    className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-700"
                  >
                    Submit a report
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
