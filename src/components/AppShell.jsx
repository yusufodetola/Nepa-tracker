"use client";

import { useState } from "react";
import { Menu, Bell, Search } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AppShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main area */}
      <div className="lg:pl-64">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div>
                <p className="hidden text-sm text-gray-400 sm:block">
                  Welcome back
                </p>

                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Nepa Tracker
                </h2>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search */}
              <button
                type="button"
                className="hidden rounded-xl p-2.5 text-gray-500 hover:bg-gray-100 sm:block"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Notification */}
              <button
                type="button"
                className="relative rounded-xl p-2.5 text-gray-500 hover:bg-gray-100"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 text-sm font-bold text-white">
                Y
              </div>
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="relative z-0 min-h-[calc(100vh-5rem)] px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
