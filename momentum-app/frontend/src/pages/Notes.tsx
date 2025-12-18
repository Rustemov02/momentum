import type { TaskPayloadType } from "@/components/Dialogs/CreateNoteDialog";
import CreateNoteDialog from "@/components/Dialogs/CreateNoteDialog";
import { NoteDetailDialog } from "@/components/Dialogs/NoteDetailDialog";
import Loader from "@/components/Loader";
import { NoteCard, type Note } from "@/components/NoteCard";
import SearchResult from "@/components/SearchResult";
import { apiRequest } from "@/utils/api";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "react-toastify";

const Notes = ({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
}: {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [taskData, setTaskData] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  // const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
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

  useEffect(() => {
    fetchTasks();
  }, []);

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
          description: response.description,
          title: response.title,
        },
        ...prev,
      ]);
      toast.success("Task added successfully");
    } catch (error) {
      console.log("Something went wrong : ", error);
      toast.error("Something went wrong.Please try again");
    }
  };

  // DELETE
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

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setIsDetailDialogOpen(true);
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
        // onUpdate={handleUpdateNote}
        onDelete={(noteId) => handleDeleteNote(noteId)}
      />
    </>
  );
};

export default Notes;
