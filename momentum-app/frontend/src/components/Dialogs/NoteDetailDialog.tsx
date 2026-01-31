import React, { useState, useEffect } from "react";
import { X, Edit2, Trash2, Save, Tag, Clock, Plus, Tags } from "lucide-react";
import { type Note } from "@/components/NoteCard/index";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Textarea } from "@/components/Textarea/Textarea";
import { Badge } from "@/components/Badge/Badge";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/Dialogs/AlertDialog";
import { formatDate } from "@/utils";
import { apiRequest } from "@/utils/api";
import { toast } from "react-toastify";

interface NoteDetailDialogProps {
  note: Note;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (id: string, updatedNote: Note[]) => void;
  onDelete?: (id: string) => void;
}

export const NoteDetailDialog: React.FC<NoteDetailDialogProps> = ({
  note,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const getInitialData = (note: Note) => ({
    title: note?.title || "",
    description: note?.description || "",
    tags: note?.tags ?? [],
  });

  const [noteData, setNoteData] = useState(() => getInitialData(note));

  useEffect(() => {
    if (note && !isEditing) {
      setNoteData(getInitialData(note));
    }
  }, [note, isEditing]);

  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
      setNoteData(getInitialData(note));
    }
  }, [isOpen]);

  const [fieldErrors, setFieldErrors] = useState<{
    title?: string;
  }>({});

  if (!isOpen || !note) return null;

  const handleSave = async () => {
    console.log("SAVED DATA : ", noteData);

    const tempErrors: { title?: string } = {};
    if (!noteData.title?.trim()) {
      tempErrors.title = "Title is required";
    }

    if (Object.keys(tempErrors).length > 0) {
      setFieldErrors(tempErrors);
      return;
    }

    try {
      const response = await apiRequest(`/tasks/${note._id}`, {
        method: "PUT",
        body: noteData,
      });

      if ((response as any).errors) {
        setFieldErrors((response as any).errors);
        return;
      }

      toast.success("Task edited successfully");
      onUpdate?.(note._id, response);
      onClose();
    } catch (err) {
      console.log("Something went wrong : ", err);
      toast.error("Something went wrong, please try again");
    }
  };

  const handleDelete = () => {
    if (note._id) onDelete?.(note._id);
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleEdit = () => {
    setNoteData(getInitialData(note));
    setIsEditing(true);
  };

  const handleCancel = () => {
    setNoteData(getInitialData(note));
    setIsEditing(false);
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !noteData.tags.includes(trimmedTag)) {
      setNoteData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
    }
    setTagInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && note && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          >
            {" "}
            <div
              className="w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl sm:rounded-2xl shadow-2xl shadow-cyan-500/10 flex flex-col pointer-events-auto animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start sm:items-center justify-between p-3 sm:p-6 border-b border-gray-800/50 gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      note.type === "task" ? "bg-blue-500" : "bg-cyan-500"
                    }`}
                  />
                  <h2 className="text-white text-sm sm:text-base truncate">
                    {isEditing ? "Edit Note" : "Note Details"}
                  </h2>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  {!isEditing ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleEdit}
                        className="text-gray-400 hover:text-white cursor-pointer hover:bg-gray-800 h-8 px-2 sm:px-3"
                      >
                        <Edit2 className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="text-red-400 hover:text-red-300 cursor-pointer hover:bg-red-500/10 h-8 px-2 sm:px-3"
                      >
                        <Trash2 className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancel}
                        className="text-gray-400 cursor-pointer hover:text-white hover:bg-gray-800 h-8 px-2 sm:px-3 text-xs sm:text-sm"
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="bg-linear-to-r cursor-pointer from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white h-8 px-2 sm:px-3"
                      >
                        <Save className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Save</span>
                      </Button>
                    </>
                  )}
                  <button
                    onClick={onClose}
                    className="p-1.5 sm:p-2 cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
                    Title
                  </label>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={noteData?.title}
                      onChange={(e) => {
                        setFieldErrors((prev) => ({ ...prev, title: "" }));
                        setNoteData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }));
                      }}
                      className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-cyan-500/50 text-sm sm:text-base h-9 sm:h-10"
                      placeholder="Enter note title..."
                      error={fieldErrors?.title || ""}
                    />
                  ) : (
                    <h3 className="text-white text-base sm:text-xl wrap-break-word">
                      {note.title}
                    </h3>
                  )}
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
                    Content
                  </label>
                  {isEditing ? (
                    <Textarea
                      value={noteData.description}
                      onChange={(e) =>
                        setNoteData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={8}
                      className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-cyan-500/50 resize-none text-sm sm:text-base"
                      placeholder="Write your note content..."
                    />
                  ) : (
                    <div className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm sm:text-base wrap-break-word">
                      {note.description}
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
                    <Tag className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-1.5" />
                    Tags
                  </label>

                  <div className="flex flex-col w-full gap-1.5 sm:gap-2">
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add tags..."
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          // onKeyDown={handleAddTag}
                          className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-cyan-500/50"
                        />
                        <button
                          onClick={() => handleAddTag()}
                          disabled={!tagInput.trim()}
                          className="px-4 py-2 cursor-pointer bg-cyan-500/20 hover:bg-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-cyan-400 rounded-lg border border-cyan-500/30 transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                    <div className="flex items-center justify-start gap-2">
                      {noteData.tags && noteData.tags.length > 0 ? (
                        noteData.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            isEdit={isEditing}
                            onDelete={() =>
                              setNoteData((prev) => ({
                                ...prev,
                                tags: prev.tags?.filter((i) => i !== tag),
                              }))
                            }
                            variant="outline"
                            className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-500 text-xs sm:text-sm">
                          No tags
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="pt-3 sm:pt-4 border-t border-gray-800/50">
                  <div className="flex flex-col gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                    <div className="flex items-center">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 shrink-0" />
                      <span className="wrap-break-word">
                        Created: {formatDate(note.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Delete Confirmation Dialog */}
          <AlertDialog
            open={showDeleteConfirm}
            onOpenChange={setShowDeleteConfirm}
          >
            <AlertDialogContent className="bg-gray-900 border-gray-800 text-white w-[calc(100%-2rem)] max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-base sm:text-lg">
                  Delete Note
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400 text-sm">
                  Are you sure you want to delete "{note.title}"? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                <AlertDialogCancel className="bg-gray-800 cursor-pointer text-white border-gray-700 hover:bg-gray-700 w-full sm:w-auto m-0">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 cursor-pointer text-white w-full sm:w-auto m-0"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </AnimatePresence>
  );
};
