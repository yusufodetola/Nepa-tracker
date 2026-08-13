"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Clock3,
  MapPin,
  Power,
  Settings2,
  Trash2,
  Zap,
} from "lucide-react";

import AppShell from "../../components/AppShell";

const initialNotifications = [
  {
    id: 1,
    type: "outage",
    title: "Power outage reported",
    message:
      "A new outage has been reported in Akobo, Ibadan. Several users in the area have confirmed the issue.",
    location: "Akobo, Ibadan",
    time: "12 minutes ago",
    unread: true,
  },
  {
    id: 2,
    type: "restored",
    title: "Power has been restored",
    message:
      "Electricity supply has been restored in Bodija after a reported outage.",
    location: "Bodija, Ibadan",
    time: "48 minutes ago",
    unread: true,
  },
  {
    id: 3,
    type: "warning",
    title: "Multiple reports detected",
    message:
      "Nepa Tracker detected several reports from Mokola within the last hour.",
    location: "Mokola, Ibadan",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 4,
    type: "outage",
    title: "Outage update",
    message:
      "The outage affecting Challenge is still being monitored by the community.",
    location: "Challenge, Ibadan",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: 5,
    type: "system",
    title: "Weekly report is ready",
    message:
      "Your weekly electricity activity summary is now available in Analytics.",
    location: "Your account",
    time: "Yesterday",
    unread: false,
  },
];

const alertSettings = [
  {
    id: "outages",
    title: "Power outage alerts",
    description: "Get notified when an outage is reported in your area.",
    enabled: true,
  },
  {
    id: "restored",
    title: "Power restoration alerts",
    description: "Receive an alert when electricity is restored.",
    enabled: true,
  },
  {
    id: "community",
    title: "Community updates",
    description: "Receive updates when multiple users report an issue.",
    enabled: true,
  },
  {
    id: "weekly",
    title: "Weekly summary",
    description: "Get a weekly summary of electricity activity.",
    enabled: false,
  },
];

function NotificationIcon({ type }) {
  if (type === "restored") {
    return <Power className="h-5 w-5 text-green-600" />;
  }

  if (type === "warning") {
    return <AlertCircle className="h-5 w-5 text-amber-600" />;
  }

  if (type === "system") {
    return <Zap className="h-5 w-5 text-purple-600" />;
  }

  return <Bell className="h-5 w-5 text-red-500" />;
}

function notificationBackground(type) {
  if (type === "restored") {
    return "bg-green-50";
  }

  if (type === "warning") {
    return "bg-amber-50";
  }

  if (type === "system") {
    return "bg-purple-50";
  }

  return "bg-red-50";
}

export default function AlertsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const [settings, setSettings] = useState(alertSettings);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => notification.unread).length,
    [notifications],
  );

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  };

  const removeNotification = (id) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );
  };

  const toggleSetting = (id) => {
    setSettings((current) =>
      current.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting,
      ),
    );
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-1 text-sm font-medium text-purple-600">
                Stay Informed
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Alerts & Notifications
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
                Stay updated about outages, restorations, and important power
                activity around you.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <Bell className="h-5 w-5 text-purple-600" />

              <div>
                <p className="text-xs text-gray-400">Unread notifications</p>

                <p className="font-bold text-gray-900">{unreadCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notification summary */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>

              <span className="text-xs font-semibold text-red-500">Active</span>
            </div>

            <p className="mt-5 text-sm text-gray-500">Active outage alerts</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">2</h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <Power className="h-5 w-5 text-green-600" />
              </div>

              <span className="text-xs font-semibold text-green-600">
                Updated
              </span>
            </div>

            <p className="mt-5 text-sm text-gray-500">Recent restorations</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">1</h2>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                <Bell className="h-5 w-5 text-purple-600" />
              </div>

              <span className="text-xs font-semibold text-purple-600">
                Notifications
              </span>
            </div>

            <p className="mt-5 text-sm text-gray-500">Total notifications</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {notifications.length}
            </h2>
          </div>
        </section>

        {/* Main content */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Notifications list */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">
            {/* List header */}
            <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Notifications
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Your latest power activity updates
                </p>
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
                >
                  <CheckCheck className="h-4 w-4" />
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications */}
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                  <BellOff className="h-6 w-6 text-gray-400" />
                </div>

                <h3 className="font-semibold text-gray-900">
                  No notifications
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  You're all caught up.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-5 transition ${
                      notification.unread ? "bg-purple-50/30" : "bg-white"
                    } hover:bg-gray-50`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${notificationBackground(
                          notification.type,
                        )}`}
                      >
                        <NotificationIcon type={notification.type} />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">
                                {notification.title}
                              </h3>

                              {notification.unread && (
                                <span className="h-2 w-2 rounded-full bg-purple-600" />
                              )}
                            </div>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                              {notification.message}
                            </p>
                          </div>

                          <span className="shrink-0 text-xs text-gray-400">
                            {notification.time}
                          </span>
                        </div>

                        {/* Meta */}
                        <div className="mt-4 flex flex-wrap items-center gap-4">
                          <span className="flex items-center gap-1.5 text-xs text-gray-400">
                            <MapPin className="h-3.5 w-3.5" />
                            {notification.location}
                          </span>

                          <div className="ml-auto flex items-center gap-2">
                            {notification.unread && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-purple-600 hover:bg-purple-50"
                              >
                                <Check className="h-3.5 w-3.5" />
                                Mark read
                              </button>
                            )}

                            <button
                              onClick={() =>
                                removeNotification(notification.id)
                              }
                              className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                              aria-label="Delete notification"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notification settings */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                <Settings2 className="h-5 w-5 text-purple-600" />
              </div>

              <h2 className="text-lg font-bold text-gray-900">
                Notification Settings
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-400">
                Choose the alerts you want to receive.
              </p>
            </div>

            <div className="space-y-5">
              {settings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {setting.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      {setting.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSetting(setting.id)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      setting.enabled ? "bg-purple-600" : "bg-gray-200"
                    }`}
                    aria-label={`Toggle ${setting.title}`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                        setting.enabled ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Location alert */}
            <div className="mt-7 rounded-2xl bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                  <MapPin className="h-4 w-4 text-purple-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Alert location
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    You currently receive alerts for:
                  </p>

                  <p className="mt-2 text-sm font-semibold text-purple-600">
                    Akobo, Ibadan
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-green-500" />

              <p className="text-xs font-medium text-green-700">
                Notifications are active
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
