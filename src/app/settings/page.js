"use client";

import { useState } from "react";
import { Bell, MapPin, User, Save, Check, RotateCcw } from "lucide-react";

import AppShell from "../../components/AppShell";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    name: "Yusuf",
    location: "Ibadan",
    outageAlerts: true,
    restorationAlerts: true,
    reportAlerts: true,
    emailNotifications: false,
    darkMode: false,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleReset = () => {
    setSettings({
      name: "Yusuf",
      location: "Ibadan",
      outageAlerts: true,
      restorationAlerts: true,
      reportAlerts: true,
      emailNotifications: false,
      darkMode: false,
    });

    setSaved(false);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Settings
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage your profile, location and notification preferences.
          </p>
        </div>

        {/* PROFILE */}
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
              <User className="h-5 w-5 text-purple-600" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">Profile</h2>

              <p className="text-sm text-gray-500">
                Update your basic information.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* NAME */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                value={settings.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              />
            </div>

            {/* LOCATION */}
            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Location
              </label>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  id="location"
                  type="text"
                  value={settings.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />
              </div>
            </div>
          </div>
        </section>

        {/* NOTIFICATIONS */}
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
              <Bell className="h-5 w-5 text-purple-600" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">Notifications</h2>

              <p className="text-sm text-gray-500">
                Choose which power updates you want to receive.
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {/* OUTAGE ALERTS */}
            <ToggleRow
              title="Power outage alerts"
              description="Get notified when an outage is reported in your area."
              enabled={settings.outageAlerts}
              onChange={(value) => handleChange("outageAlerts", value)}
            />

            {/* RESTORATION ALERTS */}
            <ToggleRow
              title="Power restoration alerts"
              description="Get notified when power is restored in your area."
              enabled={settings.restorationAlerts}
              onChange={(value) => handleChange("restorationAlerts", value)}
            />

            {/* REPORT ALERTS */}
            <ToggleRow
              title="Report updates"
              description="Receive updates about reports you have submitted."
              enabled={settings.reportAlerts}
              onChange={(value) => handleChange("reportAlerts", value)}
            />

            {/* EMAIL */}
            <ToggleRow
              title="Email notifications"
              description="Receive important NEPA Tracker updates by email."
              enabled={settings.emailNotifications}
              onChange={(value) => handleChange("emailNotifications", value)}
            />
          </div>
        </section>

        {/* APPEARANCE */}
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="font-semibold text-gray-900">Appearance</h2>

            <p className="mt-1 text-sm text-gray-500">
              Customize how Nepa Tracker looks.
            </p>
          </div>

          <ToggleRow
            title="Dark mode"
            description="Use a darker appearance for the dashboard."
            enabled={settings.darkMode}
            onChange={(value) => handleChange("darkMode", value)}
          />
        </section>

        {/* ACTIONS */}
        <div className="flex flex-col-reverse gap-3 pb-8 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:from-purple-700 hover:to-indigo-600"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" />
                Changes Saved
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </div>

        {/* SAVE MESSAGE */}
        {saved && (
          <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-2xl">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
              <Check className="h-4 w-4" />
            </div>
            Settings saved successfully.
          </div>
        )}
      </div>
    </AppShell>
  );
}

/* ================================
   TOGGLE COMPONENT
================================ */

function ToggleRow({ title, description, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between gap-6 py-5">
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>

        <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
          enabled ? "bg-purple-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
