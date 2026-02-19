import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAppStore } from "@/lib/useAppStore";
import { getConversations } from "@/lib/api";
import { supabase } from "@/integrations/supabase/client";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { Edit, MessageCircle } from "lucide-react";

export default function ChatListScreen() {
  const { user } = useAuth();
  const { openChat } = useAppStore();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadConversations = async () => {
    if (!user) return;
    const data = await getConversations(user.id);
    setConversations(data);
    setLoading(false);
  };

  useEffect(() => {
    loadConversations();

    // Listen for new messages
    const channel = supabase
      .channel("chat-list")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, () => {
        loadConversations();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "now";
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-6 pt-5 pb-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Messages</h1>
        <button className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center border border-border/50 bg-transparent cursor-pointer">
          <Edit size={16} className="text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-muted-foreground text-sm">Loading...</div>
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <MessageCircle size={32} className="text-muted-foreground" />
            </div>
            <p className="text-foreground font-semibold">No messages yet</p>
            <p className="text-muted-foreground text-sm mt-1">Match with someone to start chatting!</p>
          </div>
        ) : (
          conversations.map((conv, index) => (
            <motion.div
              key={conv.partnerId}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-2xl p-4 mb-3 cursor-pointer hover:border-primary/20 transition-all active:scale-[0.98]"
              onClick={() => openChat(conv.partnerId)}
            >
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl gradient-avatar flex items-center justify-center text-xl shadow-glow-sm">
                    {conv.profile?.avatar_emoji || "👤"}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground text-sm font-bold">{conv.profile?.display_name || "User"}</span>
                    <span className="text-muted-foreground text-[10px]">{timeAgo(conv.lastMessageTime)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground truncate pr-2">{conv.lastMessage}</span>
                    {conv.unreadCount > 0 && (
                      <span className="w-5 h-5 rounded-full gradient-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center shrink-0">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
      <BottomNav />
    </div>
  );
}
