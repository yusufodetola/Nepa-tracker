"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  ChevronRight,
  Database,
  MapPin,
  Moon,
  RefreshCw,
  ShieldCheck,
  Sun,
  Trash2,
  User,
  Zap,
  AlertTriangle,
} from "lucide-react";

import AppShell from "../../components/AppShell";

const SETTINGS_KEY = "nepaSettings";
const REPORTS_KEY = "nepaReports";

const defaultSettings = {
  name: "NEPA Tracker User",
  email: "user@example.com",
  location: "Akobo, Ibadan",

  outageAlerts: true,
  restorationAlerts: true,
  communityUpdates: true,
  weeklySummary: false,

  autoRefresh: true,
  communityReports: true,

  theme: "light",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  /*
   * LOAD SETTINGS
   */
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(SETTINGS_KEY);

      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);

        if (parsedSettings && typeof parsedSettings === "object") {
          setSettings({
            ...defaultSettings,
            ...parsedSettings,
          });
        }
      } else {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
      }
    } catch (error) {
      console.error("Unable to load settings:", error);
    }
  }, []);

  /*
   * UPDATE A SETTING
   */
  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  /*
   * SAVE SETTINGS
   */
  const saveSettings = () => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (error) {
      console.error("Unable to save settings:", error);
    }
  };

  /*
   * RESET SETTINGS
   */
  const resetSettings = () => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));

      setSettings(defaultSettings);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (error) {
      console.error("Unable to reset settings:", error);
    }
  };

  /*
   * CLEAR REPORT DATA
   */
  const clearReportData = () => {
    try {
      localStorage.removeItem(REPORTS_KEY);

      setShowDeleteConfirm(false);

      alert("All saved report data has been cleared.");
    } catch (error) {
      console.error("Unable to clear report data:", error);
    }
  };

  /*
   * TOGGLE COMPONENT
   */
  const Toggle = ({ enabled, onClick, label }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Toggle ${label}`}
        aria-pressed={enabled}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-purple-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    );
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-8">
          <p className="mb-1 text-sm font-medium text-purple-600">
            Personalize Your Experience
          </p>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Settings
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                Manage your account, monitoring preferences, notifications, and
                application settings.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-purple-600" />

              <span>Settings & Privacy</span>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* PROFILE */}
        {/* ================================================= */}

        <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50">
              <User className="h-5 w-5 text-purple-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Profile & Account
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Manage your basic account information.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* NAME */}
            <div>
              <label
                htmlFor="settings-name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Name
              </label>

              <input
                id="settings-name"
                type="text"
                value={settings.name}
                onChange={(e) => updateSetting("name", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                placeholder="Enter your name"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="settings-email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <input
                id="settings-email"
                type="email"
                value={settings.email}
                onChange={(e) => updateSetting("email", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                placeholder="you@example.com"
              />
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* POWER MONITORING */}
        {/* ================================================= */}

        <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
              <Zap className="h-5 w-5 text-indigo-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Power Monitoring
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Choose how NEPA Tracker monitors your area.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* LOCATION */}
            <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                  <MapPin className="h-4 w-4 text-purple-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Monitoring location
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    Your selected area for electricity monitoring.
                  </p>
                </div>
              </div>

              <div className="w-full sm:max-w-xs">
                <input
                  type="text"
                  value={settings.location}
                  onChange={(e) => updateSetting("location", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  placeholder="e.g. Akobo, Ibadan"
                />
              </div>
            </div>

            {/* AUTO REFRESH */}
            <div className="flex items-start justify-between gap-4 rounded-2xl border border-gray-100 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  <RefreshCw className="h-4 w-4 text-blue-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Auto-refresh data
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    Automatically refresh electricity information when
                    available.
                  </p>
                </div>
              </div>

              <Toggle
                enabled={settings.autoRefresh}
                onClick={() =>
                  updateSetting("autoRefresh", !settings.autoRefresh)
                }
                label="auto refresh data"
              />
            </div>

            {/* COMMUNITY REPORTS */}
            <div className="flex items-start justify-between gap-4 rounded-2xl border border-gray-100 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">
                  <Database className="h-4 w-4 text-green-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Community reports
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    Include reports submitted by other community members.
                  </p>
                </div>
              </div>

              <Toggle
                enabled={settings.communityReports}
                onClick={() =>
                  updateSetting("communityReports", !settings.communityReports)
                }
                label="community reports"
              />
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* NOTIFICATIONS */}
        {/* ================================================= */}

        <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50">
              <Bell className="h-5 w-5 text-purple-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">Notifications</h2>

              <p className="mt-1 text-sm text-gray-400">
                Choose which electricity alerts you want to receive.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* OUTAGE */}
            <div className="flex items-start justify-between gap-4 rounded-2xl border border-gray-100 p-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Power outage alerts
                </p>

                <p className="mt-1 max-w-xl text-xs leading-5 text-gray-400">
                  Get notified when an outage is reported in your monitoring
                  area.
                </p>
              </div>

              <Toggle
                enabled={settings.outageAlerts}
                onClick={() =>
                  updateSetting("outageAlerts", !settings.outageAlerts)
                }
                label="power outage alerts"
              />
            </div>

            {/* RESTORATION */}
            <div className="flex items-start justify-between gap-4 rounded-2xl border border-gray-100 p-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Power restoration alerts
                </p>

                <p className="mt-1 max-w-xl text-xs leading-5 text-gray-400">
                  Receive a notification when electricity is restored in your
                  area.
                </p>
              </div>

              <Toggle
                enabled={settings.restorationAlerts}
                onClick={() =>
                  updateSetting(
                    "restorationAlerts",
                    !settings.restorationAlerts,
                  )
                }
                label="power restoration alerts"
              />
            </div>

            {/* COMMUNITY */}
            <div className="flex items-start justify-between gap-4 rounded-2xl border border-gray-100 p-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Community updates
                </p>

                <p className="mt-1 max-w-xl text-xs leading-5 text-gray-400">
                  Get updates when several users report the same electricity
                  issue.
                </p>
              </div>

              <Toggle
                enabled={settings.communityUpdates}
                onClick={() =>
                  updateSetting("communityUpdates", !settings.communityUpdates)
                }
                label="community updates"
              />
            </div>

            {/* WEEKLY */}
            <div className="flex items-start justify-between gap-4 rounded-2xl border border-gray-100 p-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Weekly summary
                </p>

                <p className="mt-1 max-w-xl text-xs leading-5 text-gray-400">
                  Receive a weekly overview of outages, restorations, and
                  reporting activity.
                </p>
              </div>

              <Toggle
                enabled={settings.weeklySummary}
                onClick={() =>
                  updateSetting("weeklySummary", !settings.weeklySummary)
                }
                label="weekly summary"
              />
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* APPEARANCE */}
        {/* ================================================= */}

        <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50">
              {settings.theme === "dark" ? (
                <Moon className="h-5 w-5 text-amber-600" />
              ) : (
                <Sun className="h-5 w-5 text-amber-600" />
              )}
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">Appearance</h2>

              <p className="mt-1 text-sm text-gray-400">
                Choose how the application should look.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* LIGHT */}
            <button
              type="button"
              onClick={() => updateSetting("theme", "light")}
              className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                settings.theme === "light"
                  ? "border-purple-300 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                <Sun className="h-5 w-5 text-amber-500" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Light</p>

                <p className="mt-1 text-xs text-gray-400">
                  Use the light interface.
                </p>
              </div>

              {settings.theme === "light" && (
                <Check className="h-5 w-5 text-purple-600" />
              )}
            </button>

            {/* DARK */}
            <button
              type="button"
              onClick={() => updateSetting("theme", "dark")}
              className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                settings.theme === "dark"
                  ? "border-purple-300 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900">
                <Moon className="h-5 w-5 text-white" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Dark</p>

                <p className="mt-1 text-xs text-gray-400">
                  Use the dark interface.
                </p>
              </div>

              {settings.theme === "dark" && (
                <Check className="h-5 w-5 text-purple-600" />
              )}
            </button>
          </div>

          <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3">
            <p className="text-xs leading-5 text-amber-700">
              Theme selection is saved as a preference. The current NEPA Tracker
              interface remains in its existing visual style.
            </p>
          </div>
        </section>

        {/* ================================================= */}
        {/* PRIVACY & DATA */}
        {/* ================================================= */}

        <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
              <ShieldCheck className="h-5 w-5 text-green-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Privacy & Data
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Manage how your local application data is handled.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* LOCAL DATA */}
            <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4">
              <Database className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Local data storage
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Your current reports and settings are stored locally in your
                  browser using localStorage.
                </p>
              </div>
            </div>

            {/* CLEAR DATA */}
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-red-100 bg-red-50/50 p-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Clear report data
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Permanently remove reports currently saved in this browser.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Clear Data
              </button>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* DANGER ZONE */}
        {/* ================================================= */}

        <section className="mb-8 rounded-2xl border border-red-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">
                Reset Settings
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-400">
                Restore your NEPA Tracker preferences to their default values.
              </p>

              <button
                type="button"
                onClick={resetSettings}
                className="mt-4 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Reset Settings
              </button>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* SAVE BAR */}
        {/* ================================================= */}

        <div className="sticky bottom-4 z-30 rounded-2xl border border-gray-100 bg-white/95 p-4 shadow-xl backdrop-blur">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              {saved ? (
                <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                  <Check className="h-4 w-4" />
                  Settings saved successfully.
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  Changes are saved when you click Save Settings.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={saveSettings}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Check className="h-4 w-4" />
              Save Settings
            </button>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ================================================= */}

      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowDeleteConfirm(false);
            }
          }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                Clear report data?
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                This will remove all reports currently stored in this browser.
                This action cannot be undone.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={clearReportData}
                  className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-100 hover:bg-red-600"
                >
                  Yes, Clear Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
