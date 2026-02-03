import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";
import { SIDEBAR_ITEMS } from "@/constants/sidebar";
import Header from "@/components/Header/Header";
import CreateNoteButton from "@/components/CreateNoteButton/CreateNoteButton";
import { AIChatbot } from "@/components/Dialogs/AIChatbot";
import { ChatbotButton } from "@/components/Button/ChatBotButton";
import { LayoutProvider, useLayout } from "@/contexts/LayoutContext";

const LayoutContent = () => {
  // const [activeTab, setActiveTab] = useState("notes");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const location = useLocation();
  const activeTab = location.pathname.split("/")[1] || "notes";
  const navigate = useNavigate();
  const getTabTitle = () => {
    const item = SIDEBAR_ITEMS.find((i) => i.id === activeTab);

    return item ? item?.label : "notes";
  };

  const {
    searchQuery,
    setSearchQuery,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
  } = useLayout();

  const handleTabChange = (tabId: string) => {
    navigate(`/${tabId}`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isMobileOpen={isMobileSidebarOpen}
        onMobileToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          tabTitle={getTabTitle()}
        />

        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

      <AIChatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
      <div className="flex flex-col gap-4 border-4">
        <ChatbotButton
          isOpen={isChatbotOpen}
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        />

        <CreateNoteButton onClick={setIsCreateDialogOpen} />
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <LayoutProvider>
      <LayoutContent />
    </LayoutProvider>
  );
};

export default Layout;
