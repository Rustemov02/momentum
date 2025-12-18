import type { TaskPayloadType } from "@/components/Dialogs/CreateNoteDialog";
import Loader from "@/components/Loader";
import { NoteCard, type Note } from "@/components/NoteCard";
import SearchResult from "@/components/SearchResult";
import { apiRequest } from "@/utils/api";
import { Search } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { toast } from "react-toastify";

const Notes = forwardRef((props: { onClick: (note: Note) => void }, ref) => {
  const [taskData, setTaskData] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

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
  useImperativeHandle(ref, () => ({
    createNote: handleCreateNote,
    deleteNote: handleDeleteNote,
  }));

  if (loading) return <Loader />;

  return (
    <>
      {taskData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {taskData.map((task) => (
            <NoteCard
              key={task._id}
              note={task}
              onClick={() => props.onClick(task)}
            />
          ))}
        </div>
      ) : (
        <SearchResult />
      )}
    </>
  );
});

export default Notes;
