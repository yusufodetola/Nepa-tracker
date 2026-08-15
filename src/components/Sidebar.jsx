"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Bell,
  Lightbulb,
  Settings,
  Zap,
  X,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    name: "Alerts",
    href: "/alerts",
    icon: Bell,
  },
  {
    name: "Suggestions",
    href: "/suggestions",
    icon: Lightbulb,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-500 shadow-lg shadow-purple-200">
              <Zap className="h-5 w-5 text-white" fill="currentColor" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-gray-900">
                NEPA
              </h1>
              <p className="text-xs font-medium text-gray-400">Power Tracker</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-purple-50 text-purple-600 shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-purple-600" : "text-gray-400"
                  }`}
                />

                <span>{item.name}</span>
                {item.name === "Alerts" && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-100 px-1.5 text-[10px] font-bold text-red-600">
                    3
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Power status */}
        <div className="mx-4 mb-4 rounded-2xl bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="text-xs font-semibold text-gray-700">
              System Status
            </span>
          </div>

          <p className="text-sm font-semibold text-gray-900">
            Monitoring Active
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-400">
            Power updates are being monitored in your area.
          </p>
        </div>

        {/* User */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3 rounded-xl p-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 font-semibold text-purple-600">
              Y
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">
                Yusuf
              </p>

              <p className="truncate text-xs text-gray-400">User account</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
