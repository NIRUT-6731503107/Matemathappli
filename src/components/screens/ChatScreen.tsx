import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAppStore } from "@/lib/useAppStore";
import { getMessages, sendMessage, getProfile } from "@/lib/api";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Smile } from "lucide-react";

export default function ChatScreen() {
  const { user } = useAuth();
  const { chatPartnerId, setScreen } = useAppStore();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [partner, setPartner] = useState<any>(null);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user || !chatPartnerId) return;

    getProfile(chatPartnerId).then(setPartner);
    getMessages(user.id, chatPartnerId).then(setMessages);

    const channel = supabase
      .channel(`chat-${chatPartnerId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "messages",
      }, (payload) => {
        const msg = payload.new as any;
        if (
          (msg.sender_id === user.id && msg.receiver_id === chatPartnerId) ||
          (msg.sender_id === chatPartnerId && msg.receiver_id === user.id)
        ) {
          setMessages((prev) => {
            if (prev.find((m) => m.id === msg.id)) return prev;
            return [...prev, msg];
          });
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user, chatPartnerId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !user || !chatPartnerId || sending) return;
    const text = input.trim();
    const optimisticMsg = {
      id: `temp-${Date.now()}`,
      sender_id: user.id,
      receiver_id: chatPartnerId,
      content: text,
      created_at: new Date().toISOString(),
      read: false,
    };
    setMessages((prev) => [...prev, optimisticMsg]);
    setInput("");
    setSending(true);
    await sendMessage(chatPartnerId, text);
    setSending(false);
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 glass border-b border-border/30 shrink-0">
        <button
          onClick={() => setScreen("chatList")}
          className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-foreground bg-transparent border border-border/50 cursor-pointer"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="w-10 h-10 rounded-2xl gradient-avatar flex items-center justify-center text-lg shadow-glow-sm">
          {partner?.avatar_emoji || "👤"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-foreground font-bold text-sm">{partner?.display_name || "User"}</div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[10px] text-green-400 font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {messages.map((msg) => {
          const isSent = msg.sender_id === user?.id;
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex mb-3 ${isSent ? "justify-end" : "justify-start"}`}
            >
              <div className="flex flex-col gap-1">
                <div
                  className={`max-w-[260px] px-4 py-3 text-sm leading-relaxed ${
                    isSent
                      ? "gradient-primary text-primary-foreground rounded-2xl rounded-br-md shadow-glow-sm"
                      : "glass-card text-foreground rounded-2xl rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
                <span className={`text-[10px] text-muted-foreground ${isSent ? "text-right" : "text-left"}`}>
                  {formatTime(msg.created_at)}
                </span>
              </div>
            </motion.div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 glass border-t border-border/30 flex items-center gap-2.5 shrink-0">
        <button className="w-9 h-9 rounded-xl bg-transparent border-none cursor-pointer text-muted-foreground flex items-center justify-center shrink-0">
          <Smile size={20} />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-secondary/60 border-none px-4 py-3 rounded-2xl text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/30 transition-all"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          disabled={!input.trim() || sending}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center border-none cursor-pointer shrink-0 transition-all disabled:opacity-50 ${
            input.trim() ? "gradient-primary text-primary-foreground shadow-glow-sm" : "bg-secondary text-muted-foreground"
          }`}
        >
          <Send size={16} />
        </motion.button>
      </div>
    </div>
  );
}
