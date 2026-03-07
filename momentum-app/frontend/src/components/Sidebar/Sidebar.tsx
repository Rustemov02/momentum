import { SIDEBAR_ITEMS } from "@/constants/sidebar";
import { Menu, X } from "lucide-react";
import type { FC } from "react";
import { BASE_URL } from "@/constants/variables";
import { UserProfile } from "../Profile/UserProfile";
import SidebarTags from "./SidebarTags";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
}
const Sidebar: FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isMobileOpen,
  onMobileToggle,
}) => {
  const handleLogout = () => {
    if (!navigator.onLine) return;
    window.location.href = `${BASE_URL}/auth/logout`;
  };

  const userData = localStorage.getItem("cachedUser");

  // Only show main nav items (e.g. Notes), Tags will have its own section
  const mainNavItems = SIDEBAR_ITEMS.filter((item) => item.id !== "tags");

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen z-50 lg:z-0
          w-64 bg-[#0D1117] backdrop-blur-xl border-r border-gray-800/50
          transition-transform duration-300 ease-in-out
          ${isMobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex flex-col h-full py-6 px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center p-0.5 shadow-lg shadow-cyan-500/10">
                <img src="/momentum.jpg" alt="Logo" className="w-full h-full rounded-[10px]" />
              </div>
              <h1 className="text-white font-black tracking-widest text-lg uppercase italic text-shadow-sm shadow-cyan-500/20">Momentum</h1>
            </div>
            <button
              onClick={onMobileToggle}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    if (isMobileOpen) onMobileToggle();
                  }}
                  className={`
                    w-full flex cursor-pointer items-center space-x-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${isActive
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 ring-1 ring-cyan-500/10"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }
                  `}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="font-semibold text-sm tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Expanded Tags Section */}
          <div className="flex-1 overflow-y-auto mt-6 hide-scrollbar">
            <SidebarTags />
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-gray-800/50">
            <div className="text-gray-500 text-sm">
              <UserProfile
                user={JSON.parse(userData || "{}")}
                onLogout={handleLogout}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={onMobileToggle}
        className="fixed top-4 left-4 z-30 lg:hidden p-2 rounded-lg bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-white shadow-lg shadow-black/20"
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
};

export default Sidebar;
