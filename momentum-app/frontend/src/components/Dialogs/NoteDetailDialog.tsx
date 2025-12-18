import React, { useState, useEffect } from "react";
import { X, Edit2, Trash2, Save, Tag, Clock } from "lucide-react";
import { type Note } from "@/components/NoteCard/index";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Textarea } from "@/components/Textarea/Textarea";
import { Badge } from "@/components/Badge/Badge";
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

interface NoteDetailDialogProps {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (id: string, updatedNote: Partial<Note>) => void;
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
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTags, setEditTags] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (note) {
      setEditTitle(note.title);
      setEditContent(note.preview);
      setEditTags(note.tags.join(", "));
    }
  }, [note]);

  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
    }
  }, [isOpen]);

  if (!isOpen || !note) return null;

  const handleSave = () => {
    const tags = editTags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    onUpdate?.(note._id, {
      title: editTitle,
      preview: editContent,
      tags,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete?.(note._id);
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.preview);
    setEditTags(note.tags.join(", "));
    setIsEditing(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-none">
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
                    onClick={() => setIsEditing(true)}
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
                    className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white h-8 px-2 sm:px-3"
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
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-cyan-500/50 text-sm sm:text-base h-9 sm:h-10"
                  placeholder="Enter note title..."
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
                  value={note.description}
                  onChange={(e) => setEditContent(e.target.value)}
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
              {isEditing ? (
                <Input
                  type="text"
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                  className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-cyan-500/50 text-sm sm:text-base h-9 sm:h-10"
                  placeholder="work, meeting, urgent (comma separated)"
                />
              ) : (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {note.tags.length > 0 ? (
                    note.tags.map((tag, index) => (
                      <Badge
                        key={index}
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
              )}
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
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-gray-900 border-gray-800 text-white w-[calc(100%-2rem)] max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base sm:text-lg">
              Delete Note
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400 text-sm">
              Are you sure you want to delete "{note.title}"? This action cannot
              be undone.
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
  );
};
