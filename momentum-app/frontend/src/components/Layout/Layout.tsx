import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Input } from "../Input/Input";
import CreateNoteDialog, {
  type TaskPayloadType,
} from "../Dialogs/CreateNoteDialog";
import { apiRequest } from "@/utils/api";
import { toast } from "react-toastify";
import { NoteCard, type Note } from "../NoteCard";
import Loader from "../Loader";
import { NoteDetailDialog } from "../Dialogs/NoteDetailDialog";

const Layout = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState("notes");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [taskData, setTaskData] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
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

  //! CREATE TASK
  const handleCreateNote = async (payload: TaskPayloadType) => {
    try {
      const response = await apiRequest("/tasks", {
        method: "POST",
        body: payload,
      });
      setTaskData((prev) => [
        {
          _id: response._id,
          createdAt: response.createdAt,
          tags: response.tags,
          title: response.title,
        },
        ...prev,
      ]);
      setIsCreateDialogOpen(false);
      toast.success("Task added successfully");
    } catch (error) {
      console.log("Something went wrong : ", error);
      toast.error("Something went wrong.Please try again");
    }
  };

  // ! FETCH ALL TASKS FROM DB
  const fetchTasks = async () => {
    try {
      const tasks = await apiRequest("/tasks");

      console.log(tasks);
      console.log(tasks);
      setTaskData(tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setIsDetailDialogOpen(true);
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      const response = await apiRequest(`/tasks/${noteId}`, {
        method: "DELETE",
      });
      setTaskData((data) => data.filter((item) => item._id !== noteId));
      toast.success(response.message);
    } catch (err) {
      console.log("Something went wrong : ", err);
      toast.error("Something went wrong.Please try again later");
    }
  };
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
            <div className="relative ">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search notes, tags, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border border-gray-700/50 text-white placeholder:text-gray-500 
focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 focus:outline-none"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
          <div className="max-w-6xl mx-auto">
            {loading && <Loader />}
            {!loading &&
              (taskData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* {filteredNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onClick={handleNoteClick}
                  />
                ))} */}
                  {taskData.map((task) => (
                    <NoteCard
                      key={task._id}
                      note={task}
                      onClick={handleNoteClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-gray-400 mb-2">
                    {searchQuery ? "No results found" : `No ${activeTab} yet`}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {searchQuery
                      ? "Try a different search term"
                      : "Click the + button to create your first note"}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </main>
      <button
        onClick={() => setIsCreateDialogOpen(true)}
        className="fixed cursor-pointer bottom-6 right-6 w-14 h-14 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center group hover:scale-110 z-30"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>
      <CreateNoteDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={handleCreateNote}
      />
      <NoteDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        note={selectedNote || null}
        // onUpdate={handleUpdateNote}
        onDelete={handleDeleteNote}
      />
      {children}
    </div>
  );
};

export default Layout;
