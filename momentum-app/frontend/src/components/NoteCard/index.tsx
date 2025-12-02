import React from "react";
import { Clock, Tag } from "lucide-react";
import { Badge } from "@/components/Badge/Badge";

export interface Note {
  id: string;
  title: string;
  preview: string;
  tags: string[];
  createdAt: Date;
  type: "note" | "task";
}

interface NoteCardProps {
  note: Note;
  onClick: (note: Note) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onClick }) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const dateObj = new Date(date);
    const diffInMs = now.getTime() - dateObj.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      onClick={() => onClick(note)}
      className="group relative p-5 rounded-xl bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/10"
    >
      {/* Content */}
      <h3 className="text-white mb-2 group-hover:text-cyan-400 transition-colors">
        {note.title}
      </h3>

      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{note.preview}</p>

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {note.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center text-gray-500 text-sm">
        <Clock className="w-3.5 h-3.5 mr-1.5" />
        <span>{formatDate(note.createdAt)}</span>
      </div>

      {/* Glassmorphic highlight on hover */}
      <div className="absolute inset-0 rounded-xl bg-linear-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};
