import { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/useAppStore";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, MoreVertical, Send, Smile, Paperclip } from "lucide-react";

interface Message {
  text: string;
  sent: boolean;
  time: string;
}

export default function ChatScreen() {
  const { setScreen } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I saw we matched on study interests 📚", sent: false, time: "2:30 PM" },
    { text: "Hey! Yeah, I'd love to find a study partner!", sent: true, time: "2:31 PM" },
    { text: "Looking forward to study together!", sent: false, time: "2:32 PM" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { text: input, sent: true, time: now }]);
    setInput("");
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [
        ...prev,
        { text: "That sounds great! Let's discuss more details 😊", sent: false, time: replyTime },
      ]);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 glass border-b border-border/30 shrink-0">
        <button
          onClick={() => setScreen("chatList")}
          className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-foreground bg-transparent border border-border/50 cursor-pointer hover:border-primary/30 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="w-10 h-10 rounded-2xl gradient-avatar flex items-center justify-center text-lg shadow-glow-sm">
          👩
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-foreground font-bold text-sm">Lily</div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[10px] text-green-400 font-medium">Online</span>
          </div>
        </div>
        <div className="flex gap-1.5">
          <button className="w-9 h-9 rounded-xl bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center">
            <Phone size={16} />
          </button>
          <button className="w-9 h-9 rounded-xl bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`flex mb-3 ${msg.sent ? "justify-end" : "justify-start"}`}
          >
            <div className="flex flex-col gap-1">
              <div
                className={`max-w-[260px] px-4 py-3 text-sm leading-relaxed ${
                  msg.sent
                    ? "gradient-primary text-primary-foreground rounded-2xl rounded-br-md shadow-glow-sm"
                    : "glass-card text-foreground rounded-2xl rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
              <span className={`text-[10px] text-muted-foreground ${msg.sent ? "text-right" : "text-left"}`}>
                {msg.time}
              </span>
            </div>
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 glass border-t border-border/30 flex items-center gap-2.5 shrink-0">
        <button className="w-9 h-9 rounded-xl bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center shrink-0">
          <Smile size={20} />
        </button>
        <div className="flex-1 relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="w-full bg-secondary/60 border-none px-4 py-3 rounded-2xl text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/30 transition-all"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer transition-colors">
            <Paperclip size={16} />
          </button>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={sendMessage}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center border-none cursor-pointer shrink-0 transition-all ${
            input.trim()
              ? "gradient-primary text-primary-foreground shadow-glow-sm"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          <Send size={16} />
        </motion.button>
      </div>
    </div>
  );
}
