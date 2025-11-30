import { X } from "lucide-react";
import { useState, type FC } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";

interface CreateNoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: { title: string; content: string; tags: string[] }) => void;
}

const CreateNoteDialog: FC<CreateNoteDialogProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
          <h2 className="text-white">Create New Note</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <Input
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-cyan-500/50"
            />
          </div>

          {/* Content */}
          {/* <div>
            <Textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-cyan-500/50 resize-none"
            />
          </div> */}

          {/* Tags */}
          <div>
            <Input
              placeholder="Add tags (press Enter)..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-cyan-500/50"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-cyan-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-800/50">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-800/50"
          >
            Cancel
          </Button>
          <Button
            // onClick={handleSave}
            disabled={!title.trim()}
            className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
          >
            Save Note
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNoteDialog;
