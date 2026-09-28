import {
  Bell,
  CalendarDays,
  Camera,
  Globe2,
  LayoutDashboard,
  LogOut,
  Megaphone,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Gallery",
    to: "/admin/gallery",
    icon: Camera,
  },
  {
    label: "Events",
    to: "/admin/events",
    icon: CalendarDays,
  },
  {
    label: "Notices",
    to: "/admin/notices",
    icon: Bell,
  },
  {
    label: "Top Bar",
    to: "/admin/top-bar",
    icon: Megaphone,
  },
];

function AdminSidebar({ isOpen, onClose, onLogout }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-brand-navy/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-100 bg-white shadow-floating transition-transform duration-300 lg:z-30 lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="border-b border-gray-100 px-5 py-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-white">
                <LayoutDashboard size={20} aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <p className="truncate font-body text-base font-extrabold leading-6 tracking-normal text-brand-navy">
                  Sakshi Admin
                </p>

                <p className="truncate font-body text-xs leading-5 tracking-normal text-text-secondary">
                  Management Panel
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-gray-100 hover:text-brand-navy lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-5"
          aria-label="Admin navigation"
        >
          <p className="px-3 font-body text-xs font-bold uppercase leading-5 tracking-wide text-text-secondary">
            Management
          </p>

          <div className="mt-3 space-y-1.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/admin/dashboard"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex min-h-11 items-center gap-3 rounded-xl px-3 font-body text-sm font-semibold leading-5 tracking-normal transition-colors duration-200 ${
                      isActive
                        ? "bg-brand-navy text-white shadow-button"
                        : "text-brand-navy hover:bg-sky-50"
                    }`
                  }
                >
                  <Icon size={19} aria-hidden="true" />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-gray-100 p-3">
          <NavLink
            to="/"
            onClick={onClose}
            className="flex min-h-11 items-center gap-3 rounded-xl px-3 font-body text-sm font-semibold leading-5 tracking-normal text-brand-navy transition-colors duration-200 hover:bg-sky-50"
          >
            <Globe2 size={19} aria-hidden="true" />
            View Website
          </NavLink>

          <button
            type="button"
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="mt-1.5 flex min-h-11 w-full items-center gap-3 rounded-xl px-3 font-body text-sm font-semibold leading-5 tracking-normal text-red-600 transition-colors duration-200 hover:bg-red-50"
          >
            <LogOut size={19} aria-hidden="true" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
