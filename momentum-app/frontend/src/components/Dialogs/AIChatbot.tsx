import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Sparkles, Trash2 } from "lucide-react";
import { Input } from "../Input/Input";
import { sendMessageToGemini, resetConversation } from "@/service/gemini";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const MESSAGES_KEY = "momentum_chat_messages";

export const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onClose }) => {
  const loadMessages = (): Message[] => {
    try {
      const saved = localStorage.getItem(MESSAGES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      }
    } catch (err) {
      console.error("Mesajlar yüklənmədi:", err);
    }
    return [
      {
        id: "1",
        text: "Salam! Mən sizin AI köməkçinizəm. Momentum tətbiqi haqqında suallarınıza cavab verə bilərəm. Sizə necə kömək edə bilərəm?",
        isUser: false,
        timestamp: new Date(),
      },
    ];
  };

  const [messages, setMessages] = useState<Message[]>(loadMessages());
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Mesajları localStorage-ə yaz
  useEffect(() => {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      const aiResponseText = await sendMessageToGemini(
        currentInput,
      );

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Üzr istəyirik, cavab əldə edərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    if (confirm("Bütün söhbəti silmək istədiyinizdən əminsiniz?")) {
      resetConversation();
      setMessages([
        {
          id: "1",
          text: "Salam! Mən sizin AI köməkçinizəm. Momentum tətbiqi haqqında suallarınıza cavab verə bilərəm. Sizə necə kömək edə bilərəm?",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
        onClick={onClose}
      />
      <div className="fixed bottom-24 lg:bottom-6 right-6 lg:right-24 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] z-50 animate-in slide-in-from-bottom-5 duration-300">
        <div className="h-full bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 rounded-2xl border border-gray-800/50 shadow-2xl shadow-cyan-500/10 flex flex-col overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-blue-600/5 rounded-2xl pointer-events-none" />

          {/* Header */}
          <div className="relative flex items-center justify-between px-5 py-4 border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white flex items-center gap-2">
                  AI Assistant
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h3>
                <p className="text-xs text-gray-500">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearChat}
                className="p-1.5 cursor-pointer rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800/50 transition-all duration-200"
                title="Söhbəti təmizlə"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 cursor-pointer rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="relative flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${message.isUser
                    ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white"
                    : "bg-gray-800/80 text-gray-100 border border-gray-700/50"
                    }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-gray-800/80 border border-gray-700/50 rounded-2xl px-4 py-2.5">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="relative px-4 py-4 border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Mənə sual verin..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-cyan-500/50 rounded-xl"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${inputValue.trim()
                  ? "bg-linear-to-r from-cyan-500 to-blue-600 cursor-pointer hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105"
                  : "bg-gray-800/50 text-gray-600 cursor-not-allowed"
                  }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
