import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  HelpCircle,
  Leaf,
  CornerDownLeft
} from "lucide-react";
import axios from "axios";
import { CHAT } from "@/constants/testIds";

const quickPrompts = [
  "How should I dispose of old paint and chemicals?",
  "Where does clean styrofoam packaging go?",
  "Can I recycle plastic bottle caps?",
  "Schedule bulk furniture pickup in South Sector",
];

const SupportChatDrawer = ({ isOpen, onClose, apiBaseUrl = "" }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "assistant",
      text: "Hello! I am your GreenRoute Eco Assistant. You can ask me anything about smart waste disposal, bin sorting rules, or municipal collection schedules.",
      time: "Just now",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Try hitting backend /api/chat
      const response = await axios.post(`${apiBaseUrl}/api/chat`, {
        message: query,
      }, { timeout: 4000 });

      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: response.data.reply || response.data.message || generateFallbackResponse(query),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      // Intelligent fallback logic
      const fallbackText = generateFallbackResponse(query);
      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: fallbackText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes("paint") || q.includes("chemical") || q.includes("hazardous")) {
      return "Liquid paints and toxic household chemicals must never go down drains or in general trash. Please drop them off at the Municipal Household Hazardous Waste Facility in the Industrial Park (Open Tue-Sat 8am-4pm).";
    }
    if (q.includes("styrofoam") || q.includes("foam")) {
      return "Expanded polystyrene (Styrofoam) is not accepted in curbside blue recycling bins as it easily breaks into microplastics. Check for local community EPS drop-off events or place in general waste.";
    }
    if (q.includes("bottle") || q.includes("cap") || q.includes("plastic")) {
      return "Plastic bottle caps should be left screwed onto clean, empty plastic bottles so they do not get lost in mechanical optical sorters at the recycling depot.";
    }
    if (q.includes("pickup") || q.includes("schedule") || q.includes("bulk")) {
      return "Municipal collection routes run daily between 06:00 AM and 04:30 PM. For oversized bulk items (furniture/appliances), you can queue a special pickup request directly from the Collection Routes tab.";
    }
    return "Thank you for asking! For optimal sorting: Organic food scraps go into the green compost bin, clean rigid plastics and paper into the blue recycling bin, and electronics into red hazardous drop-off points. Let me know if you need specific instructions for any other item.";
  };

  if (!isOpen) return null;

  return (
    <div
      data-testid={CHAT.drawer}
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in"
    >
      <div className="w-full sm:w-[440px] h-full bg-white border-l border-[#2C3E50]/15 shadow-2xl flex flex-col justify-between animate-slide-in">
        {/* Header with Curated Avatar */}
        <div className="p-4 border-b border-[#2C3E50]/10 flex items-center justify-between bg-gradient-to-r from-[#2E5A44]/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1766066014237-00645c74e9c6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwzfHxjdXN0b21lciUyMHN1cHBvcnQlMjBmcmllbmRseXxlbnwwfHx8fDE3ODU4MjYwNDZ8MA&ixlib=rb-4.1.0&q=85"
                alt="AI Support Assistant"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#2E5A44]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-sm text-[#2C3E50]">
                  Eco Assistant
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#2E5A44]/10 text-[#2E5A44] font-bold">
                  AI Live
                </span>
              </div>
              <p className="text-[11px] text-[#2C3E50]/60">
                GreenRoute Smart Waste Knowledge Base
              </p>
            </div>
          </div>

          <button
            data-testid={CHAT.closeBtn}
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div
          data-testid={CHAT.messageList}
          className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F8F9FA]/50"
        >
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-[#2E5A44] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? "bg-[#2E5A44] text-white rounded-tr-none shadow-sm"
                      : "bg-white text-[#2C3E50] border border-[#2C3E50]/10 rounded-tl-none shadow-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      isUser ? "text-white/70" : "text-slate-400"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-full bg-[#2C3E50] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2.5 items-center">
              <div className="w-7 h-7 rounded-full bg-[#2E5A44] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <div className="p-3 rounded-2xl bg-white border border-[#2C3E50]/10 text-xs text-slate-500 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#2E5A44] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#2E5A44] animate-bounce delay-100"></span>
                <span className="w-2 h-2 rounded-full bg-[#2E5A44] animate-bounce delay-200"></span>
                <span className="ml-1 text-[11px]">Consulting disposal guidelines...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#2E5A44]/10 hover:text-[#2E5A44] text-[#2C3E50]/80 whitespace-nowrap transition-colors border border-slate-200/60"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-[#2C3E50]/10 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputMessage);
            }}
            className="flex items-center gap-2"
          >
            <input
              data-testid={CHAT.input}
              type="text"
              placeholder="Ask how to sort or recycle any item..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs rounded-full bg-[#F8F9FA] border border-[#2C3E50]/15 focus:outline-none focus:ring-2 focus:ring-[#2E5A44]/50 text-[#2C3E50]"
            />
            <button
              data-testid={CHAT.sendBtn}
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 rounded-full bg-[#2E5A44] text-white hover:bg-[#264A38] disabled:opacity-40 transition-colors shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportChatDrawer;
