import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Input } from "../Input/Input";
import CreateNoteDialog from "../Dialogs/CreateNoteDialog";
import { apiRequest } from "@/utils/api";

const Layout = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState("notes");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getTabTitle = () => {
    switch (activeTab) {
      case "notes":
        return "Notes";
      case "tasks":
        return "Tasks";
      case "inbox":
        return "Inbox";
      default:
        return "Notes";
    }
  };

  const handleCreateNote = () => {};

  const getTasks = async () => {
    try {
      const newTaskData = { title: "İlk task", description: "Text" };

      const task = await apiRequest("/tasks", {
        method: "POST",
        body: newTaskData,
      });
      console.log("RESPONSE TASK : ", task);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobileOpen={isMobileSidebarOpen}
        onMobileToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="shrink-0 px-6 lg:px-8 py-6 border-b border-gray-800/50 bg-gray-900/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white ml-12 lg:ml-0">{getTabTitle()}</h2>
              {/* <div className="text-gray-400 text-sm">
                {filteredNotes.length}{" "}
                {filteredNotes.length === 1 ? "item" : "items"}
              </div> */}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search notes, tags, or content..."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border border-gray-700/50 text-white placeholder:text-gray-500 
focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 focus:outline-none"
              />
            </div>
          </div>
        </header>

        {children}
      </main>

      <button
        onClick={() => setIsCreateDialogOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center group hover:scale-110 z-30"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      <CreateNoteDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleCreateNote}
      />
    </div>
  );
};

export default Layout;
