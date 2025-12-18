import { useRef, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import CreateNoteDialog from "../components/Dialogs/CreateNoteDialog";
import { NoteDetailDialog } from "../components/Dialogs/NoteDetailDialog";
import Notes from "@/pages/Notes";
import { SIDEBAR_ITEMS } from "@/constants/sidebar";
import type { Note } from "@/components/NoteCard";
import Header from "@/components/Header/Header";
import CreateNoteButton from "@/components/CreateNoteButton/CreateNoteButton";
import Tags from "@/pages/Tags";

const Layout = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState("notes");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const getTabTitle = () => {
    const item = SIDEBAR_ITEMS.find((i) => i.id === activeTab);

    return item ? item?.label : "notes";
  };

  const notesRef = useRef<any>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setIsDetailDialogOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "notes":
        return <Notes ref={notesRef} onClick={handleNoteClick} />;
      case "tags":
        return <Tags />;
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
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          tabTitle={getTabTitle()}
        />

        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
          <div className="max-w-6xl mx-auto">{renderContent()}</div>
        </div>
      </main>

      <CreateNoteButton onClick={setIsCreateDialogOpen} />

      <CreateNoteDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={(payload) => {
          notesRef.current?.createNote(payload);
          setIsCreateDialogOpen(false);
        }}
      />
      <NoteDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        note={selectedNote || null}
        // onUpdate={handleUpdateNote}
        onDelete={(noteId) => notesRef.current?.deleteNote(noteId)}
      />
      {children}
    </div>
  );
};

export default Layout;
