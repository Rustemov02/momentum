import { SIDEBAR_ITEMS } from "@/constants/sidebar";
import { FileText, Menu, X } from "lucide-react";
import type { FC } from "react";
import { Button } from "../Button/Button";
import { BASE_URL } from "@/constants/variables";

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
          w-64 bg-gray-900/80 backdrop-blur-xl border-r border-gray-800/50
          transition-transform duration-300 ease-in-out
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-white">Momentum</h1>
            </div>
            <button
              onClick={onMobileToggle}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {SIDEBAR_ITEMS.map((item) => {
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
                    transition-all duration-200 border border-none
                    ${
                      isActive
                        ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-gray-800/50">
            <div className="text-gray-500 text-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-400 hover:text-white cursor-pointer hover:bg-gray-800 h-8 px-2 sm:px-3"
              >
                Log out
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={onMobileToggle}
        className="fixed top-4 left-4 z-30 lg:hidden p-2 rounded-lg bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 text-white"
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
};

export default Sidebar;
