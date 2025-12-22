import type { TaskPayloadType } from "@/components/Dialogs/CreateNoteDialog";
import CreateNoteDialog from "@/components/Dialogs/CreateNoteDialog";
import { NoteDetailDialog } from "@/components/Dialogs/NoteDetailDialog";
import Loader from "@/components/Loader";
import { NoteCard, type Note } from "@/components/NoteCard";
import SearchResult from "@/components/SearchResult";
import { apiRequest } from "@/utils/api";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "react-toastify";

const PENDING_TASKS_KEY = "pendingTasks";

const Notes = ({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
}: {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [taskData, setTaskData] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // ! FETCH ALL TASKS FROM DB
  const fetchTasks = async () => {
    try {
      const tasks = await apiRequest("/tasks");
      setTaskData(tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ! SYNC PENDING TASKS
  const syncPendingTasks = async () => {
    const pending = localStorage.getItem(PENDING_TASKS_KEY);
    if (!pending) return;

    const pendingTasks = JSON.parse(pending);

    for (const task of pendingTasks) {
      try {
        if (task.action === "create") {
          await apiRequest("/tasks", {
            method: "POST",
            body: task.payload,
          });
        } else if (task.action === "delete") {
          await apiRequest(`/tasks/${task.id}`, {
            method: "DELETE",
          });
        }
      } catch (error) {
        console.error("Sync failed:", error);
      }
    }

    // Uğurlu sync-dən sonra təmizlə
    localStorage.removeItem(PENDING_TASKS_KEY);
    fetchTasks(); // Fresh data gətir
    toast.success("Offline əməliyyatlar sync edildi!");
  };

  useEffect(() => {
    fetchTasks();

    // Online olduqda pending taskları sync et
    const handleOnline = () => {
      syncPendingTasks();
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  //! CREATE TASK
  const handleCreateNote = async (payload: TaskPayloadType) => {
    const tempId = `temp-${Date.now()}`;
    const tempNote: Note = {
      _id: tempId,
      createdAt: new Date().toISOString(),
      tags: payload.tags,
      description: payload.description,
      title: payload.title,
    };

    // Dərhal UI-da göstər (Optimistic UI)
    setTaskData((prev) => [tempNote, ...prev]);

    try {
      const response = await apiRequest("/tasks", {
        method: "POST",
        body: payload,
      });

      // Real ID ilə yenilə
      setTaskData((prev) =>
        prev.map((task) =>
          task._id === tempId
            ? {
                _id: response._id,
                createdAt: response.createdAt,
                tags: response.tags,
                description: response.description,
                title: response.title,
              }
            : task
        )
      );
      toast.success("Task added successfully");
    } catch (error) {
      console.log("Offline mode - task queued", error);

      // Offline olarsa localStorage-ə yaz
      const pending = JSON.parse(
        localStorage.getItem(PENDING_TASKS_KEY) || "[]"
      );
      pending.push({ action: "create", payload, tempId });
      localStorage.setItem(PENDING_TASKS_KEY, JSON.stringify(pending));

      toast.warning(
        "Offline: Task yadda saxlanıldı, internet qayıdanda əlavə ediləcək"
      );
    }
  };

  // DELETE
  const handleDeleteNote = async (noteId: string) => {
    // Dərhal UI-dan sil (Optimistic UI)
    setTaskData((data) => data.filter((item) => item._id !== noteId));

    try {
      const response = await apiRequest(`/tasks/${noteId}`, {
        method: "DELETE",
      });
      toast.success(response.message);
    } catch (err) {
      console.log("Offline mode - delete queued", err);

      // Offline olarsa localStorage-ə yaz
      const pending = JSON.parse(
        localStorage.getItem(PENDING_TASKS_KEY) || "[]"
      );
      pending.push({ action: "delete", id: noteId });
      localStorage.setItem(PENDING_TASKS_KEY, JSON.stringify(pending));

      toast.warning("Offline: Silinmə əməliyyatı yadda saxlanıldı");
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setIsDetailDialogOpen(true);
  };

  const handleUpdateNote = (id: string, updatedData: Note[]) => {
    console.log(updatedData);
    setTaskData((prev) =>
      prev.map((task) => (task._id === id ? { ...task, ...updatedData } : task))
    );
  };

  if (loading) return <Loader />;

  return (
    <>
      {taskData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {taskData.map((task) => (
            <NoteCard
              key={task._id}
              note={task}
              onClick={() => handleNoteClick(task)}
            />
          ))}
        </div>
      ) : (
        <SearchResult />
      )}

      <CreateNoteDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSave={(payload) => {
          handleCreateNote(payload);
          setIsCreateDialogOpen(false);
        }}
      />
      <NoteDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        note={selectedNote || null}
        onUpdate={handleUpdateNote}
        onDelete={(noteId) => handleDeleteNote(noteId)}
      />
    </>
  );
};

export default Notes;
