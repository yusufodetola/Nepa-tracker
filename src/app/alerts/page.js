"use client";

import { useEffect, useMemo, useState } from "react";
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

const REPORTS_STORAGE_KEY = "nepaReports";
const ALERTS_STORAGE_KEY = "nepaAlerts";
const SETTINGS_STORAGE_KEY = "nepaAlertSettings";

/* =========================================================
   DEFAULT ALERT SETTINGS
========================================================= */

const defaultSettings = [
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

/* =========================================================
   FALLBACK NOTIFICATIONS
   Used only when there are no report notifications yet.
========================================================= */

const defaultNotifications = [
  {
    id: "default-1",
    type: "outage",
    title: "Power outage reported",
    message:
      "A new outage has been reported in Akobo, Ibadan. Several users in the area have confirmed the issue.",
    location: "Akobo, Ibadan",
    time: "12 minutes ago",
    unread: true,
    source: "system",
  },
  {
    id: "default-2",
    type: "restored",
    title: "Power has been restored",
    message:
      "Electricity supply has been restored in Bodija after a reported outage.",
    location: "Bodija, Ibadan",
    time: "48 minutes ago",
    unread: true,
    source: "system",
  },
  {
    id: "default-3",
    type: "warning",
    title: "Multiple reports detected",
    message:
      "Nepa Tracker detected several reports from Mokola within the last hour.",
    location: "Mokola, Ibadan",
    time: "1 hour ago",
    unread: true,
    source: "system",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getNotificationType(report) {
  if (
    report.statusType === "restored" ||
    report.status === "Restored" ||
    report.status === "Power Restored"
  ) {
    return "restored";
  }

  if (
    report.statusType === "pending" ||
    report.status === "Pending" ||
    report.status === "Low Voltage"
  ) {
    return "warning";
  }

  if (
    report.statusType === "outage" ||
    report.status === "Outage" ||
    report.status === "Power Outage"
  ) {
    return "outage";
  }

  return "system";
}

function createNotificationFromReport(report) {
  const type = getNotificationType(report);

  let title = "Power activity reported";
  let message = "A new electricity report has been submitted.";

  if (type === "outage") {
    title = "Power outage reported";

    message = `A power outage has been reported in ${
      report.location || "your area"
    }. Community members can now see this update.`;
  }

  if (type === "restored") {
    title = "Power has been restored";

    message = `Electricity supply has been restored in ${
      report.location || "your area"
    }.`;
  }

  if (type === "warning") {
    title = "Power issue reported";

    message = `A power issue has been reported in ${
      report.location || "your area"
    } and is currently awaiting confirmation.`;
  }

  return {
    id: `report-${report.id}`,
    type,
    title,
    message,
    location: report.location || "Unknown location",
    time: report.time || "Recently",
    unread: true,
    source: "report",
    reportId: report.id,
  };
}

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

/* =========================================================
   ALERTS PAGE
========================================================= */

export default function AlertsPage() {
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState(defaultSettings);
  const [reports, setReports] = useState([]);

  /* =======================================================
     LOAD REPORTS + ALERTS + SETTINGS
  ======================================================= */

  useEffect(() => {
    try {
      /* ---------------- REPORTS ---------------- */

      const savedReports = localStorage.getItem(REPORTS_STORAGE_KEY);

      let parsedReports = [];

      if (savedReports) {
        const data = JSON.parse(savedReports);

        if (Array.isArray(data)) {
          parsedReports = data;
        }
      }

      setReports(parsedReports);

      /* ---------------- SETTINGS ---------------- */

      const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);

      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);

        if (Array.isArray(parsedSettings)) {
          setSettings(parsedSettings);
        } else {
          localStorage.setItem(
            SETTINGS_STORAGE_KEY,
            JSON.stringify(defaultSettings),
          );
        }
      } else {
        localStorage.setItem(
          SETTINGS_STORAGE_KEY,
          JSON.stringify(defaultSettings),
        );
      }

      /* ---------------- EXISTING ALERTS ---------------- */

      const savedAlerts = localStorage.getItem(ALERTS_STORAGE_KEY);

      let storedAlerts = [];

      if (savedAlerts) {
        const parsedAlerts = JSON.parse(savedAlerts);

        if (Array.isArray(parsedAlerts)) {
          storedAlerts = parsedAlerts;
        }
      }

      /* ---------------- CREATE ALERTS FROM REPORTS ---------------- */

      const reportNotifications = parsedReports.map(
        createNotificationFromReport,
      );

      /*
       * Preserve read/delete state from previously saved alerts.
       */
      const existingAlertMap = new Map(
        storedAlerts.map((alert) => [String(alert.id), alert]),
      );

      const mergedReportNotifications = reportNotifications.map(
        (notification) => {
          const existing = existingAlertMap.get(String(notification.id));

          if (existing) {
            return {
              ...notification,
              unread: existing.unread,
            };
          }

          return notification;
        },
      );

      /*
       * Keep non-report/system notifications.
       */
      const systemNotifications = storedAlerts.filter(
        (alert) => alert.source !== "report",
      );

      let finalNotifications = [
        ...mergedReportNotifications,
        ...systemNotifications,
      ];

      /*
       * If there is no report data and no saved alerts,
       * show the beautiful default alerts.
       */
      if (finalNotifications.length === 0) {
        finalNotifications = defaultNotifications;
      }

      setNotifications(finalNotifications);

      localStorage.setItem(
        ALERTS_STORAGE_KEY,
        JSON.stringify(finalNotifications),
      );
    } catch (error) {
      console.error("Unable to load alerts:", error);

      setNotifications(defaultNotifications);
      setSettings(defaultSettings);
    }
  }, []);

  /* =======================================================
     LISTEN FOR REPORT CHANGES
  ======================================================= */

  useEffect(() => {
    const handleStorageChange = (event) => {
      /*
       * REPORTS UPDATED
       */
      if (event.key === REPORTS_STORAGE_KEY) {
        try {
          const updatedReports = event.newValue
            ? JSON.parse(event.newValue)
            : [];

          if (!Array.isArray(updatedReports)) {
            return;
          }

          setReports(updatedReports);

          setNotifications((currentNotifications) => {
            const existingAlertMap = new Map(
              currentNotifications.map((alert) => [String(alert.id), alert]),
            );

            const newReportNotifications = updatedReports.map(
              createNotificationFromReport,
            );

            const mergedNotifications = newReportNotifications.map(
              (notification) => {
                const existing = existingAlertMap.get(String(notification.id));

                if (existing) {
                  return {
                    ...notification,
                    unread: existing.unread,
                  };
                }

                return notification;
              },
            );

            const systemNotifications = currentNotifications.filter(
              (alert) => alert.source !== "report",
            );

            const updatedNotifications = [
              ...mergedNotifications,
              ...systemNotifications,
            ];

            localStorage.setItem(
              ALERTS_STORAGE_KEY,
              JSON.stringify(updatedNotifications),
            );

            return updatedNotifications;
          });
        } catch (error) {
          console.error("Unable to update alerts from reports:", error);
        }
      }

      /*
       * ALERTS UPDATED
       */
      if (event.key === ALERTS_STORAGE_KEY) {
        try {
          const updatedAlerts = event.newValue
            ? JSON.parse(event.newValue)
            : [];

          if (Array.isArray(updatedAlerts)) {
            setNotifications(updatedAlerts);
          }
        } catch (error) {
          console.error("Unable to update notifications:", error);
        }
      }

      /*
       * SETTINGS UPDATED
       */
      if (event.key === SETTINGS_STORAGE_KEY) {
        try {
          const updatedSettings = event.newValue
            ? JSON.parse(event.newValue)
            : [];

          if (Array.isArray(updatedSettings)) {
            setSettings(updatedSettings);
          }
        } catch (error) {
          console.error("Unable to update alert settings:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  /* =======================================================
     UNREAD COUNT
  ======================================================= */

  const unreadCount = useMemo(
    () => notifications.filter((notification) => notification.unread).length,
    [notifications],
  );

  /* =======================================================
     OUTAGE ALERT COUNT
  ======================================================= */

  const outageAlertCount = useMemo(
    () =>
      notifications.filter(
        (notification) => notification.type === "outage" && notification.unread,
      ).length,
    [notifications],
  );

  /* =======================================================
     RESTORATION COUNT
  ======================================================= */

  const restorationCount = useMemo(
    () =>
      notifications.filter((notification) => notification.type === "restored")
        .length,
    [notifications],
  );

  /* =======================================================
     MARK ONE AS READ
  ======================================================= */

  const markAsRead = (id) => {
    setNotifications((current) => {
      const updatedNotifications = current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification,
      );

      localStorage.setItem(
        ALERTS_STORAGE_KEY,
        JSON.stringify(updatedNotifications),
      );

      return updatedNotifications;
    });
  };

  /* =======================================================
     MARK ALL AS READ
  ======================================================= */

  const markAllAsRead = () => {
    setNotifications((current) => {
      const updatedNotifications = current.map((notification) => ({
        ...notification,
        unread: false,
      }));

      localStorage.setItem(
        ALERTS_STORAGE_KEY,
        JSON.stringify(updatedNotifications),
      );

      return updatedNotifications;
    });
  };

  /* =======================================================
     DELETE NOTIFICATION
  ======================================================= */

  const removeNotification = (id) => {
    setNotifications((current) => {
      const updatedNotifications = current.filter(
        (notification) => notification.id !== id,
      );

      localStorage.setItem(
        ALERTS_STORAGE_KEY,
        JSON.stringify(updatedNotifications),
      );

      return updatedNotifications;
    });
  };

  /* =======================================================
     TOGGLE SETTING
  ======================================================= */

  const toggleSetting = (id) => {
    setSettings((current) => {
      const updatedSettings = current.map((setting) =>
        setting.id === id
          ? {
              ...setting,
              enabled: !setting.enabled,
            }
          : setting,
      );

      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(updatedSettings),
      );

      return updatedSettings;
    });
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        {/* =================================================
            HEADER
        ================================================= */}

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

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* ACTIVE OUTAGES */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>

              <span className="text-xs font-semibold text-red-500">Active</span>
            </div>

            <p className="mt-5 text-sm text-gray-500">Active outage alerts</p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {outageAlertCount}
            </h2>
          </div>

          {/* RESTORATIONS */}

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

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {restorationCount}
            </h2>
          </div>

          {/* TOTAL */}

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

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">
            {/* HEADER */}

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
                  type="button"
                  onClick={markAllAsRead}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
                >
                  <CheckCheck className="h-4 w-4" />
                  Mark all as read
                </button>
              )}
            </div>

            {/* EMPTY STATE */}

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
                      {/* ICON */}

                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${notificationBackground(
                          notification.type,
                        )}`}
                      >
                        <NotificationIcon type={notification.type} />
                      </div>

                      {/* CONTENT */}

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

                        {/* META */}

                        <div className="mt-4 flex flex-wrap items-center gap-4">
                          <span className="flex items-center gap-1.5 text-xs text-gray-400">
                            <MapPin className="h-3.5 w-3.5" />

                            {notification.location}
                          </span>

                          <div className="ml-auto flex items-center gap-2">
                            {notification.unread && (
                              <button
                                type="button"
                                onClick={() => markAsRead(notification.id)}
                                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-purple-600 hover:bg-purple-50"
                              >
                                <Check className="h-3.5 w-3.5" />
                                Mark read
                              </button>
                            )}

                            <button
                              type="button"
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

          {/* =================================================
              NOTIFICATION SETTINGS
          ================================================= */}

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

            {/* LOCATION */}

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

            {/* STATUS */}

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-green-500" />

              <p className="text-xs font-medium text-green-700">
                Notifications are active
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            DATA CONNECTION INFO
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
              <Clock3 className="h-5 w-5 text-purple-600" />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                Live report connection
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Alerts are connected to the community reports currently stored
                in your NEPA Tracker.
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {reports.length} report
                {reports.length === 1 ? "" : "s"} currently available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
