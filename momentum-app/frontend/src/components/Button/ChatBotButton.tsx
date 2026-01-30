import React from "react";
import { MessageCircle, X } from "lucide-react";

interface ChatbotButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ChatbotButton: React.FC<ChatbotButtonProps> = ({
  isOpen,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 lg:bottom-24 cursor-pointer right-24 lg:right-6 w-14 h-14 rounded-full bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center group hover:scale-110 z-30"
      aria-label="Toggle AI Assistant"
    >
      {isOpen ? (
        <X className="w-6 h-6 transition-transform duration-300" />
      ) : (
        <MessageCircle className=" w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      )}

      {/* Notification dot (optional - can be used for new messages) */}
      {/* {!isOpen && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-950 animate-pulse" />
      )} */}
    </button>
  );
};
